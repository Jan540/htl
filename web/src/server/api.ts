import { and, eq, sql, type InferSelectModel } from "drizzle-orm";
import { type Session } from "next-auth";
import "server-only";
import { env } from "~/env.mjs";
import { fetchWithAuth } from "~/lib/fetch";
import { type SpawnBoxResponse } from "~/lib/types";
import { db } from "./db";
import { boxes, questions, userQuestions } from "./db/schema";

export async function getAllBoxes() {
  return await db.select().from(boxes);
}

export async function getBoxBySlug(slug: string) {
  return await db.query.boxes.findFirst({
    where: eq(boxes.slug, slug),
  });
}

export type BoxWithProgress = InferSelectModel<typeof boxes> & {
  progress: number;
};

export async function getAllBoxesWithProgress(
  userId: string,
): Promise<BoxWithProgress[]> {
  return await db.execute(sql`
    SELECT ${boxes.id},
       ${boxes.name},
       ${boxes.description},
       ${boxes.slug},
       (SELECT count(*)
        FROM ${userQuestions}
                 join ${questions} on ${questions.id} = ${userQuestions.questionId}
        WHERE ${userQuestions.userId} = ${userId}
          AND ${questions.boxId} = ${boxes.id})::DOUBLE PRECISION /
       (SELECT count(*)
        FROM ${questions}
        WHERE ${questions.boxId} = ${boxes.id})::DOUBLE PRECISION * 100 as "progress"
    FROM ${boxes};
  `);
}

export async function getQuestion(
  boxId: string,
  questionNr: number,
): Promise<InferSelectModel<typeof questions> | undefined> {
  const question = await db.query.questions.findFirst({
    where: and(eq(questions.boxId, boxId), eq(questions.number, questionNr)),
  });

  return question;
}

export async function userHasQuestion(
  userId: string,
  questionId: string,
): Promise<boolean> {
  const result = await db.query.userQuestions.findFirst({
    where: and(
      eq(userQuestions.userId, userId),
      eq(userQuestions.questionId, questionId),
    ),
  });

  return result !== undefined;
}

export async function spawnBox(
  slug: string,
  session: Session,
): Promise<SpawnBoxResponse> {
  try {
    return await fetchWithAuth<SpawnBoxResponse>(
      env.BASE_API_URL + "/spawn/" + slug,
      session,
      {
        method: "POST",
      },
    );
  } catch (e) {
    console.error(e);
    return { message: "Failed to fetch spawn endpoint 😰" };
  }
}
