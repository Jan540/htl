import type { Session } from "next-auth";

export async function fetchWithAuth<T>(
  url: string,
  session: Session,
  options: RequestInit = {},
): Promise<T> {
  const headers = {
    Authorization: `Bearer ${session.id_token}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  const data = (await response.json()) as T;
  return data;
}
