import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env.mjs";
import * as schema from "./schema";

// idk why:
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient, { schema });
