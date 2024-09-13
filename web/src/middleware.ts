import { withAuth } from "next-auth/middleware";
import { env } from "./env.mjs";

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/login",
  },
  secret: env.NEXTAUTH_SECRET!,
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
