import Link from "next/link";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Done() {
  await delay(5000);

  return (
    <div className="flex grow flex-col items-center justify-center">
      <p className="animate-spin text-7xl">✅ DONE!? ✅</p>
      <Link href="/" className="hover:underline">
        go back home
      </Link>
    </div>
  );
}
