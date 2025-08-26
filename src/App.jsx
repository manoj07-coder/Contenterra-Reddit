import React, { useState } from "react";
import Card from "./Card";
import useRedditFeed from "./useRedditFeed";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const { items, error, loading } = useRedditFeed();
  const [visibleCount, setVisibleCount] = useState(16);

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

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6">
      <main className="w-full max-w-[1280px] min-h-[720px] mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-lg shadow-xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to bg-yellow-300">
          🚀 Contenterra Reddit feed
        </h1>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          <AnimatePresence>
            {items.slice(0, visibleCount).map((item) => (
              <motion.div
                key={item?.data?.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Card post={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {visibleCount < items.length && (
          <div className="flex justify-center mt-8">
            <motion.button
              onClick={handleShowMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-xl shadow-md text-lg font-semibold"
            >
              ⬇️ Show More
            </motion.button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
