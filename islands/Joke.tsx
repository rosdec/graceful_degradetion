import { useEffect, useState } from "preact/hooks";


export const Joke = () => {
  const [joke, setJoke] = useState("");

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
      <p class="text-lg">{joke}</p>
      <button
        onClick={fetchNewJoke}
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Get New Joke
      </button>
    </div>
  );
};
