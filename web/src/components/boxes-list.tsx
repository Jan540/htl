import { type Session } from "next-auth";
import Link from "next/link";
import { getAllBoxesWithProgress, type BoxWithProgress } from "~/server/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";

export default async function BoxesList({ user }: { user: Session["user"] }) {
  const boxes = await getAllBoxesWithProgress(user.id);

  return (
    <div className="flex flex-col gap-2">
      {boxes.map((box) => (
        <BoxListItem key={box.id} box={box} />
      ))}
    </div>
  );
}

function BoxListItem({ box }: { box: BoxWithProgress }) {
  return (
    <Link href={"/box/" + box.slug}>
      <Card>
        <CardHeader>
          <CardTitle>{box.name}</CardTitle>
          <CardDescription>{box.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={box.progress} aria-label={box.name + "progress"} />
        </CardContent>
      </Card>
    </Link>
  );
}
