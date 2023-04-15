import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}
/* 基本上是在为下一个 JS Hot Wheel 加载做修复或破解，
因为发生的是 Nexus 可以热重新加载并创建一堆新的 Prisma 客户端实例。 
然后东西就停止工作了，因为它只是在破坏东西。 因为有太多实例处于活动状态，
所以通过将其保存在全局中来防止它基于变量，不受热重载的影响。
*/ 
const client = globalThis.prisma || new PrismaClient();

// 环境 判断不是生产环境
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client