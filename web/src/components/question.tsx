import { checkAnswer } from "~/server/actions";
import { getQuestion, userHasQuestion } from "~/server/api";
import { getServerAuthSession } from "~/server/auth";
import QuestionForm from "./question-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default async function Question(props: {
  boxId: string;
  questionNr: number;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }

  const question = await getQuestion(props.boxId, props.questionNr);

  if (!question) {
    return (
      <p className="font-bold text-destructive">
        Something went wrong :( There should be a question here: {props.boxId}
      </p>
    );
  }

  const answered = await userHasQuestion(session.user.id, question.id);

  // if (answered) {
  //   return (
  //     <div>
  //       <p>{question.question}</p>

  //       <p className="font-bold text-green-600">{question.answer}</p>
  //     </div>
  //   );
  // }

  return (
    <Card className="not-prose min-w-0">
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>

      <CardContent>
        <QuestionForm
          question={question}
          boxId={props.boxId}
          questionId={question.id}
          action={checkAnswer}
          answered={answered}
        />
      </CardContent>
    </Card>
  );
}
