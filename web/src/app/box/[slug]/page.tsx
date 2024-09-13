import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import BoxFrame, { BoxFrameLoading } from "~/components/box-frame";
import Editor from "~/components/editor";
import Question from "~/components/question";
import { getMdxFileContents } from "~/lib/mdx";
import { getBoxBySlug } from "~/server/api";
import { getServerAuthSession } from "~/server/auth";

export const dynamic = "force-dynamic";
// export const revalidate = 0;

type BoxPageProps = {
  params: {
    slug: string;
  };
};

export default async function BoxPage({ params }: BoxPageProps) {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  const box = await getBoxBySlug(params.slug);

  if (!box) {
    return notFound();
  }

  const guide = await getMdxFileContents(box.slug);

  return (
    <div className="flex min-h-0 grow flex-col px-4">
      <Editor
        guide={
          <MDXRemote
            source={guide}
            components={{
              Question: (props) => <Question boxId={box.id} {...props} />,
            }}
          />
        }
      >
        <Suspense fallback={<BoxFrameLoading />}>
          <BoxFrame box={box} />
        </Suspense>
      </Editor>
    </div>
  );
}
