import BoxesList from "~/components/boxes-list";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) return null;

  return (
    <main className="flex grow flex-col gap-4 p-4">
      <h2>Rooms</h2>
      <BoxesList user={session.user} />
    </main>
  );
}
