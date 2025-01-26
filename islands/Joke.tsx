import { useEffect, useState } from "preact/hooks";

interface Joke {
  setup: string;
  punchline: string;
}

export const Joke = () => {
  const [joke, setJoke] = useState<Joke>({ setup: "", punchline: "" });

  const fetchNewJoke = async () => {
    const res = await fetch(
      "https://official-joke-api.appspot.com/random_joke",
    );
    const newJoke = await res.json();
    setJoke(newJoke);
  };

  useEffect(() => {
    fetchNewJoke();
  }, []);

  return (
    <div class="p-4">
      <h1 class="text-xl font-bold">Random Joke</h1>
      <p class="text-lg">{joke.setup}</p>
      <p class="text-lg font-semibold mt-2">{joke.punchline}</p>
      <button
        onClick={fetchNewJoke}
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Get New Joke
      </button>
    </div>
  );
};
