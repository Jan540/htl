"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea } from "./ui/scroll-area";

export default function Editor({
  guide,
  children,
}: {
  guide: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup direction="horizontal" className="">
      <ResizablePanel defaultSize={50}>
        <ScrollArea className="h-full overflow-y-auto">
          <article className="prose prose-green mx-auto min-w-0 max-w-3xl py-4 pr-4 dark:prose-invert">
            {guide}
          </article>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
