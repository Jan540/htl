import { MDXRemote } from "next-mdx-remote/rsc";
import { Counter } from "~/components/counter";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getMdxFileContents } from "~/lib/mdx";

export default async function Fortnite() {
  const guideContent = await getMdxFileContents("test");

  return (
    <ScrollArea className="!block min-h-0 min-w-0">
      <article className="prose">
        <MDXRemote
          source={guideContent}
          components={{
            Counter: (props) => <Counter {...props} />,
          }}
        />
      </article>
    </ScrollArea>
  );
}
