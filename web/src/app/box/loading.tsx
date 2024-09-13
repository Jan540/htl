import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex grow px-4">
      <div className="flex w-1/2 justify-center border-r-2">
        <div className="flex w-full min-w-0 max-w-2xl flex-col gap-2 py-4 pr-4">
          <Skeleton className="mb-8 h-8 w-full" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <div className="w-1/2 p-2">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}
