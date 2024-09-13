"use client";

import { type InferSelectModel } from "drizzle-orm";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { type checkAnswerState } from "~/server/actions";
import { type questions } from "~/server/db/schema";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const initialState: checkAnswerState = {
  error: "",
  done: false,
};

export default function QuestionForm(params: {
  question: InferSelectModel<typeof questions>;
  boxId: string;
  questionId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any;
  answered: boolean;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [formState, formAction] = useFormState(params.action, initialState);

  useEffect(() => {
    if (formState?.done) {
      toast.success("Correct answer 🤠", {
        dismissible: true,
      });
    }
  });

  if (formState?.done) {
    return <p className="font-bold text-green-600">{params.question.answer}</p>;
  }

  return (
    <>
      {params.answered ? (
        <p className="font-bold text-green-600">{params.question.answer}</p>
      ) : (
        <form action={formAction} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="text"
              name="answer"
              disabled={params.answered}
              placeholder="answer..."
              required
            />

            <input type="hidden" name="questionId" value={params.questionId} />

            <Button type="submit" disabled={params.answered}>
              Submit
            </Button>
          </div>

          <p className="text-destructive">{formState?.error}</p>
        </form>
      )}
    </>
  );
}
