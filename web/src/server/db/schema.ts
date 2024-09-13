import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const boxes = pgTable("box", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
});

export const questions = pgTable(
  "question",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    number: integer("questionNumber").notNull(),
    boxId: text("boxId")
      .notNull()
      .references(() => boxes.id, {
        onDelete: "cascade",
      }),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
  },
  (q) => ({
    uniqueBoxQuestionNumber: unique("question_boxId_questionNumber_unique").on(
      q.number,
      q.boxId,
    ),
  }),
);

// questions the user has answered
export const userQuestions = pgTable(
  "user_question",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    questionId: text("questionId")
      .notNull()
      .references(() => questions.id, {
        onDelete: "cascade",
      }),
  },
  (ubq) => ({
    compoundKey: primaryKey({
      columns: [ubq.userId, ubq.questionId],
    }),
  }),
);

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const sessions = pgTable(
  "session",
  {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
