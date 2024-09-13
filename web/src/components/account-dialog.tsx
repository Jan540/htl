"use client";

import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function AccountDialog({ user }: { user: Session["user"] }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className="h-8 w-8 border">
          <AvatarImage
            src={user.image ?? undefined}
            alt={user.name ?? "username not found"}
          />
          <AvatarFallback>
            {user.name
              ?.split(" ")
              .map((namePart) => namePart[0]?.toUpperCase())}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="items-center">
          <DialogTitle>Account Information</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            className="h-24 w-24 rounded-full"
            src={user.image ?? ""}
            alt={user.name ?? "not found"}
            width={50}
            height={50}
          />
          <div className="text-center">
            <h1>{user.name}</h1>
            <p className="flex flex-wrap text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <DialogFooter className="!justify-center">
          <Button variant="destructive" onClick={() => signOut()}>
            Sign Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
