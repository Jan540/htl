"use client";

import { signIn } from "next-auth/react";
import { SiGoogle, SiMicrosoftazure } from "react-icons/si";
import { Button } from "../ui/button";

export default function SignInForm() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => signIn("google")}
          variant={"outline"}
          className="flex gap-2"
        >
          <SiGoogle /> Google
        </Button>
        <Button
          onClick={() => signIn("azure-ad")}
          variant={"outline"}
          className="flex gap-2"
        >
          <SiMicrosoftazure /> Azure
        </Button>
      </div>
    </div>
  );
}
