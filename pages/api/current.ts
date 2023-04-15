import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 将此方法限制为"GET"
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    // 从 libs 中提取 currentUser
    const { currentUser } = await serverAuth(req, res);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
