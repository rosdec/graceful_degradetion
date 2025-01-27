import { FreshContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  // Simulate a timeout by setting a timeout promise
  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve(null), 200) 
  );

  // Fetch the joke from the external API
  const fetchPromise = fetch(
    "https://official-joke-api.appspot.com/random_joke",
  );

  // Race the fetch promise against the timeout
  const res = await Promise.race([fetchPromise, timeoutPromise]);

  if (res instanceof Response) {
    const newJoke = await res.json();
    const body = JSON.stringify(newJoke.setup + " " + newJoke.punchline);
    return new Response(body);
  } else {
    return new Response("Failed to fetch joke", { status: 500 });
  }
};
