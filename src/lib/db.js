import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;

// const prismaClientSingleton = () => {
// 	return new PrismaClient();
// };

// const globalThis = typeof window !== "undefined" ? window : global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;
