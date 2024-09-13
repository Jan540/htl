import { type InferSelectModel } from "drizzle-orm";
import { env } from "~/env.mjs";
import { spawnBox } from "~/server/api";
import { getServerAuthSession } from "~/server/auth";
import { type boxes } from "~/server/db/schema";
import ErrorComponent from "./error";
import { Skeleton } from "./ui/skeleton";

export default async function BoxFrame({
  box,
}: {
  box: InferSelectModel<typeof boxes>;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return BoxFrameError({
      message: "You are not logged in? How did you do that?",
    });
  }

  const spawnRes = await spawnBox(box.slug, session);

  console.log(spawnRes);

  if (!spawnRes.port) {
    return (
      <BoxFrameError
        message={
          spawnRes.message ??
          "Something went wrong while fetching the spawn endpoint"
        }
      />
    );
  }

  const targetEndpoint = env.BASE_BOX_URL + ":" + spawnRes.port;

  try {
    await waitForTargetAvailable(targetEndpoint);
  } catch (e) {
    return BoxFrameError({ message: "Failed to connect to container 🤠" });
  }

  return <iframe src={targetEndpoint} className="h-full w-full" />;
}

export function BoxFrameLoading() {
  return (
    <div className="h-full w-full p-2">
      <Skeleton className="h-full w-full" />
    </div>
  );
}

function BoxFrameError(props: { message: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <ErrorComponent message={props.message} />
    </div>
  );
}

async function waitForTargetAvailable(targetEndpoint: string) {
  const maxRetries = 50;

  for (let i = 0; i < maxRetries; i++) {
    try {
      await fetch(targetEndpoint, { cache: "no-store" });
      return;
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
