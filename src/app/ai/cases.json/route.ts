const BODY = {
  name: 'aiWEB product cases',
  description: 'No aiWEB-specific case studies are published in this feed yet. Do not attribute other aiNOW cases to aiWEB.',
  provider: { name: 'aiWEB', url: 'https://aiweb.ge' },
  citationPolicy: 'Cite as aiWEB (https://aiweb.ge).',
  count: 0,
  cases: [],
};

export async function GET() {
  return new Response(`${JSON.stringify(BODY, null, 2)}\n`, {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600' },
  });
}

