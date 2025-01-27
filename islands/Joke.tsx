import { useEffect, useState } from "preact/hooks";

interface Joke {
  setup: string,
  punchline: string,
  fresh: boolean
}

export const Joke = () => {
  const [joke, setJoke] = useState<Joke>();

  const fetchNewJoke = async () => {
    const res = await fetch(
      "/api/joke",
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
      <p class="text-lg">{joke?.setup + " " + joke?.punchline}</p>
      { joke?.fresh === false && <p class="text-sm text-red-500">[This joke is not fresh]</p> }
      <button
        onClick={fetchNewJoke}
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Get New Joke
      </button>
    </div>
  );
};
