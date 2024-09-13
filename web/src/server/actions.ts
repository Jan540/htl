"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { questions, userQuestions } from "~/server/db/schema";

const AnswerSchema = z.object({
  questionId: z.string(),
  answer: z.string(),
});

export type checkAnswerState = {
  error: string | undefined;
  done: boolean | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function checkAnswer(prevState: any, formData: FormData) {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("You must be signed in to perform this action.");
  }

  const validatedFields = AnswerSchema.safeParse({
    questionId: formData.get("questionId"),
    answer: formData.get("answer"),
  });

  if (!validatedFields.success) {
    return {
      error: "bad request: invalid formData",
    };
  }

  const { questionId, answer } = validatedFields.data;

  const question = await db.query.questions.findFirst({
    where: eq(questions.id, questionId),
  });

  if (!question) {
    return {
      error: "Question not found.",
    };
  }

  if (
    question.answer.toLocaleLowerCase() !== answer.trim().toLocaleLowerCase()
  ) {
    return {
      error: "WRONG, try again❗❗❗",
    };
  }

  await db.insert(userQuestions).values({
    userId: session.user.id,
    questionId,
  });

  return {
    done: true,
  };
}
