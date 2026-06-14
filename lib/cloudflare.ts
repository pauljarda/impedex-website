// Cloudflare Web Analytics (RUM) stats via the GraphQL Analytics API.
// Returns null if not configured or on any error, so callers can render a
// graceful "needs setup" state without ever crashing the page.
//
// Only needs CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID. With a single site
// on the account, the RUM dataset aggregates it without a site tag.

export type VisitorStats = {
  last24h: { visits: number; pageViews: number };
  last7d: { visits: number; pageViews: number };
};

export async function getVisitorStats(): Promise<VisitorStats | null> {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const accountTag = process.env.CLOUDFLARE_ACCOUNT_ID;

  if (!token || !accountTag) return null;

  const now = new Date();
  const iso = (ms: number) => new Date(now.getTime() - ms).toISOString();
  const since24 = iso(24 * 3600 * 1000);
  const since7d = iso(7 * 24 * 3600 * 1000);
  const until = now.toISOString();

  const query = `
    query Stats($accountTag: string!, $since24: Time!, $since7d: Time!, $until: Time!) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          last24h: rumPageloadEventsAdaptiveGroups(
            filter: { datetime_geq: $since24, datetime_leq: $until }
            limit: 1
          ) { count sum { visits } }
          last7d: rumPageloadEventsAdaptiveGroups(
            filter: { datetime_geq: $since7d, datetime_leq: $until }
            limit: 1
          ) { count sum { visits } }
        }
      }
    }`;

  try {
    const res = await fetch("https://api.cloudflare.com/client/v4/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { accountTag, since24, since7d, until },
      }),
      // Cache for 5 minutes so we don't hammer the API on every render.
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const account = json?.data?.viewer?.accounts?.[0];
    if (!account) return null;

    const pick = (group: { count?: number; sum?: { visits?: number } }[] | undefined) => ({
      pageViews: group?.[0]?.count ?? 0,
      visits: group?.[0]?.sum?.visits ?? 0,
    });

    return {
      last24h: pick(account.last24h),
      last7d: pick(account.last7d),
    };
  } catch {
    return null;
  }
}
