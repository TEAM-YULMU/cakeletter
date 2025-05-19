import { prisma } from "@/lib/prisma";

export const getMemberByEmail = async (email: string) => {
  return await prisma.member.findUnique({ where: { email } });
};
