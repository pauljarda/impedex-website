import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/*
 * "Remember me" support.
 *
 * @supabase/ssr always writes the auth cookies with the default 400-day
 * maxAge (it overrides any maxAge we pass through cookieOptions). To let the
 * user choose NOT to stay logged in, we provide our own cookie adapter: when
 * the preference cookie says "0", auth cookies are written WITHOUT
 * maxAge/expires, so the browser drops them when the browsing session ends.
 *
 * The preference is stored in a readable, long-lived cookie so the server
 * (proxy.ts) can apply the same rule when it refreshes the session.
 */
const REMEMBER_COOKIE = "impedex-remember";

type CookieOptions = {
  maxAge?: number;
  expires?: Date | string | number;
  domain?: string;
  path?: string;
  sameSite?: boolean | "lax" | "strict" | "none";
  secure?: boolean;
};

function parseCookies(): { name: string; value: string }[] {
  if (typeof document === "undefined") return [];
  return document.cookie
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean)
    .map((c) => {
      const eq = c.indexOf("=");
      const name = eq === -1 ? c : c.slice(0, eq);
      const value = eq === -1 ? "" : c.slice(eq + 1);
      return {
        name: decodeURIComponent(name),
        value: decodeURIComponent(value),
      };
    });
}

function rememberEnabled(): boolean {
  // Default behaviour is to remember; only an explicit "0" disables it.
  return parseCookies().find((c) => c.name === REMEMBER_COOKIE)?.value !== "0";
}

function serializeCookie(name: string, value: string, options: CookieOptions = {}): string {
  const opts: CookieOptions = { ...options };

  // Only downgrade *writes* (maxAge > 0) to session cookies — never touch
  // deletions (maxAge === 0), otherwise signOut would fail to clear cookies.
  if (!rememberEnabled() && opts.maxAge && opts.maxAge > 0) {
    delete opts.maxAge;
    delete opts.expires;
  }

  let str = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  if (opts.maxAge != null) str += `; Max-Age=${Math.floor(opts.maxAge)}`;
  if (opts.expires) str += `; Expires=${new Date(opts.expires).toUTCString()}`;
  if (opts.domain) str += `; Domain=${opts.domain}`;
  str += `; Path=${opts.path ?? "/"}`;
  if (opts.sameSite) {
    const ss = typeof opts.sameSite === "string" ? opts.sameSite : "Lax";
    str += `; SameSite=${ss.charAt(0).toUpperCase()}${ss.slice(1)}`;
  }
  if (opts.secure) str += "; Secure";
  return str;
}

// Browser client (session stored in cookies so the server / proxy can read it).
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  cookies: {
    getAll() {
      return parseCookies();
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value, options }) => {
        document.cookie = serializeCookie(name, value, options as CookieOptions);
      });
    },
  },
});

/**
 * Persist the user's "remember me" choice. Call this right before
 * signInWithPassword so the cookie adapter (and proxy) pick it up.
 */
export function setRememberPreference(remember: boolean) {
  if (typeof document === "undefined") return;
  // The preference cookie is long-lived so the choice survives and the server
  // can read it; storing "0" persistently just means "use session cookies".
  document.cookie =
    `${REMEMBER_COOKIE}=${remember ? "1" : "0"}; Path=/; Max-Age=${400 * 24 * 60 * 60}; SameSite=Lax`;
}
