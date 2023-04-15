import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    // this body is equal body in prisma
    const { body } = req.body;
    const { postId } = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId
      }
    });

    // NOTIFICATION PART START
    /* 为什么要在这里设置通知？
      因为没有理由我们的通知创建失败
      应该打破整个API，调用这就是我要封装的原因
      这在我们的大尝试缓存块中它自己的 try 和 catch 块中
    */ 
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        }
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: '某用户回复了你的tweet!',
            userId: post.userId
          }
        });

        await prisma.user.update({
          where: {
            id: post.userId
          },
          data: {
            hasNotification: true
          }
        });
      }
    }
    catch (error) {
      console.log(error);
    }
    // NOTIFICATION PART END

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}