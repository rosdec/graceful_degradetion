import { FreshContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  // Simulate a timeout by setting a timeout promise
  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve(null), 300) // 2 seconds timeout
  );

  // Fetch the joke from the external API
  const fetchPromise = fetch(
    "https://official-joke-api.appspot.com/random_joke",
  );

  try {
    // Race the fetch promise against the timeout
    const res = await Promise.race([fetchPromise, timeoutPromise]);

    if (res === null) {
      // If the timeout wins, return a fallback response
      const fallbackJoke = {
        setup: "Why did the developer go broke?",
        punchline: "Because they used up all their cache!",
      };
      const body = JSON.stringify(
        fallbackJoke.setup + " " + fallbackJoke.punchline,
      );
      return new Response(body);
    }

    // If the fetch completes in time, proceed as usual
    if (res instanceof Response) {
      const newJoke = await res.json();
      const body = JSON.stringify(newJoke.setup + " " + newJoke.punchline);
      return new Response(body);
    } else {
      throw new Error("Failed to fetch joke");
    }
  } catch (_error) {
    // Handle any other errors (e.g., network issues)
    const errorJoke = {
      setup: "[cached] Why did the API call fail?",
      punchline: "Because it couldn't handle the request!",
    };
    const body = JSON.stringify(errorJoke.setup + " " + errorJoke.punchline);
    return new Response(body, { status: 500 });
  }
};
