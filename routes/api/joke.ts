import { FreshContext } from "$fresh/server.ts";

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
  const res = await fetch(
    "https://official-joke-api.appspot.com/random_joke",
  );
  const newJoke = await res.json();

  const body = JSON.stringify(newJoke.setup + " " + newJoke.punchline);

  return new Response(body);
};
