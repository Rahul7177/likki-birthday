export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return res.status(503).json({ error: 'Global visit counter is not configured' });
  }

  try {
    const response = await fetch(
      `${redisUrl.replace(/\/$/, '')}/incr/likki-birthday:global-visits`,
      { method: 'POST', headers: { Authorization: `Bearer ${redisToken}` } }
    );

    if (!response.ok) {
      return res.status(502).json({ error: 'Shared counter service failed' });
    }

    const payload = await response.json();
    const totalVisits = Number(payload.result);

    if (!Number.isSafeInteger(totalVisits) || totalVisits < 1) {
      return res.status(502).json({ error: 'Invalid counter response' });
    }

    return res.status(200).json({ totalVisits });
  } catch {
    return res.status(502).json({ error: 'Unable to update the shared visit counter' });
  }
}
