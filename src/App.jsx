import React from "react";
import Card from "./Card";
import useRedditFeed from "./useRedditFeed";

const App = () => {
  const { items } = useRedditFeed();

  return (
    <div className="min-h-screen grid place-items-start p-4">
      <main className="w-full max-w-[1280px] min-h-[720px] mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Contenterra Reddit feed</h1>
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
