import React from "react";
import Card from "./Card";
import useRedditFeed from "./useRedditFeed";

const App = () => {
  const { items, error, loading } = useRedditFeed();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        ⏳ Loading reddit posts...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen  text-xl text-red-500">
        🚫 Failed to load posts: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6">
      <main className="w-full max-w-[1280px] min-h-[720px] mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-lg shadow-xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to bg-yellow-300">
          Contenterra Reddit feed
        </h1>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {items.map((item) => (
            <Card key={item?.data?.title} post={item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
