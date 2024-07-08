import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  time: string;
};

export const getTime = () => new Date().toISOString();

// https://nextjs.org/docs/pages/building-your-application/routing/api-routes#parameters
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  res.status(200).json({ time: getTime() });
}

// https://nextjs.org/docs/pages/building-your-application/routing/api-routes#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
};
