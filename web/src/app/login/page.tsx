import { redirect } from "next/navigation";
import SignInForm from "~/components/auth/sign-in-form";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { getServerAuthSession } from "~/server/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: {
    callbackUrl?: string;
    error?: string;
  };
}) {
  const session = await getServerAuthSession();
  const callbackUrl = searchParams.callbackUrl;

  if (session) {
    redirect(callbackUrl ?? "/");
  }

  return (
    <div className="flex grow flex-col items-center justify-center">
      <Card>
        <CardHeader className="w-64 text-center">
          <span className="text-2xl font-bold">Sign in</span>
        </CardHeader>
        <CardContent>
          {searchParams.error && (
            <div className="text-red-500">{searchParams.error}</div>
          )}
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
