import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=3600'
  );
  res.send(`
    User-agent: *
    Allow: /

    Sitemap: https://bethere.cyrildegraeve.dev/sitemap.xml
  `);
};
