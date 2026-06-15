import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Respect the user's "remember me" choice: when disabled, refresh the
          // auth cookies as session cookies (no maxAge/expires) so they vanish
          // when the browser closes. Deletions (maxAge === 0) are left intact.
          const remember =
            request.cookies.get("impedex-remember")?.value !== "0";
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            const opts = { ...options };
            if (!remember && opts.maxAge && opts.maxAge > 0) {
              delete opts.maxAge;
              delete opts.expires;
            }
            response.cookies.set(name, value, opts);
          });
        },
      },
    }
  );

  // IMPORTANT: refreshes the session and revalidates the user on every request.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Guard the admin area: only authenticated users with role "admin".
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      const url = new URL("/login", request.url);
      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      const url = new URL("/login", request.url);
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
