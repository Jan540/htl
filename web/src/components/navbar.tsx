import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import AccountDialog from "./account-dialog";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";

export default async function NavBar() {
  const session = await getServerAuthSession();

  return (
    <nav className="sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between p-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-lg font-bold hover:underline hover:decoration-green-500 hover:decoration-2"
          >
            HackToLearn
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <ThemeToggle />

          {session ? (
            <AccountDialog user={session.user} />
          ) : (
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
