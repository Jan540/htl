import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import Question from "~/components/question";

export async function getMdxGuide(slug: string) {
  const filePath = "./src/guides/" + slug + ".mdx";
  const fileContents = await fs.readFile(filePath, "utf8");

  const result = await compileMDX({
    source: fileContents,
    components: { QuestionForm: Question },
  });

  return result;
}

export async function getMdxFileContents(slug: string) {
  const filePath = "./src/guides/" + slug + ".mdx";
  const fileContents = await fs.readFile(filePath, "utf8");

  return fileContents;
}
