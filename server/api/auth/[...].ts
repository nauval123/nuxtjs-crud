import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import prisma from "~/lib/prisma";

export default NuxtAuthHandler({
  secret: process.env.NUXT_AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  // settings umur buat nanti <---
  // session: {
  //   maxAge: 1 * 24 * 60 * 60,
  //   updateAge: 24 * 60 * 60,
  // },
  // fungsi yang bakal dipanggil abis authorize
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id.toString();
      }
      return token;
    },
    // Fungsi ini dipanggil saat sesi diakses dari frontend
    session: async ({ session, token }) => {
      // `token` berisi data yang sudah kita tambahkan di callback `jwt`
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
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
    // @ts-ignore
    // GithubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID || "",
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    // }),
  ],
});
