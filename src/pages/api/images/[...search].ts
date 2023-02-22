// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const [query, page] = req.query.search || (['', '1'] as any);

  const request = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${page}`,
    {
      headers: {
        Authorization: serverRuntimeConfig.PEXELS_KEY,
      },
    }
  );
  const response = await request.json();

  res.status(200).json(response);
}
