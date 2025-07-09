// auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  // setting output kalo manggil useseason nuxt auth
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string | bigint;
    name: string;
    email: string;
  }
}
// isinya jwt
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
