// file: server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "~/lib/prisma";

export default NuxtAuthHandler({
  secret: process.env.NUXT_AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    // @ts-ignore
    // menggunakan username&password untu login (credential)
    CredentialsProvider.default({
      name: "Credentials",
      async authorize(credentials: any) {
        try {
          const user = await prisma.users.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("User tidak ditemukan.");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Password salah.");
          }
          return {
            id: user.id,
            name: user.username,
            email: user.email,
          };
        } catch (error: any) {
          console.error("Login error:", error);
          throw new Error(error.message ?? "CredentialsSignin");
        }
      },
    }),
  ],
});
