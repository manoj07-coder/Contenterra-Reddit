import React, { useMemo, useState } from "react";
import he from "he";
import DOMPurify from "dompurify";

const Card = ({ post }) => {
  const { title, score } = post?.data || undefined;
  const [expanded, setExpanded] = useState(false);

  const url =
    post.data.url_overridden_by_dest ??
    post.data.url ??
    `https://reddit.com${post.data.permalink}`;

  const safeHtml = useMemo(() => {
    if (!post.data.selftext_html) return "";
    const decoded = he.decode(post.data.selftext_html);
    return DOMPurify.sanitize(decoded);
  }, [post.data.selftext_html]);

  return (
    <div
      className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-2xl shadow-lg p-6
     w-full transform transition-transform duration-300 hover:scale-105  hover:shadow-2xl relative overflow-hidden flex flex-col h-[380px] "
    >
      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-2xl"></div>
      <div className="relative z-10 flex flex-col flex-1">
        <h2 className="text-xl  font-bold mb-2  flex items-center gap-2">
          {title}
        </h2>
        <p className="mb-2 font-semibold">🔥 Score: {score}</p>
        {safeHtml ? (
          <div
            className={`prose prose-invert text-sm max-w-none mb-2  ${
              expanded ? "line-clamp-none" : "line-clamp-3"
            }`}
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        ) : (
          <p className="text-slate-300 mt-2 italic">No description</p>
        )}

        {safeHtml && (
          <button
            className="text-yellow-300 font-bold hover:text-yellow-100 transition-colors mb-4"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "⬆️ Show Less" : " ⬇️ Show More"}
          </button>
        )}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-auto block  px-4 py-2 bg-black/30 hover:bg-black/50 rounded-lg text-center font-semibold"
        >
          🌐 Visit Post
        </a>
      </div>
    </div>
  );
};

export default Card;
