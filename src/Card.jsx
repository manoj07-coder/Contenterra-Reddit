import React, { useMemo } from "react";
import he from "he";
import DOMPurify from "dompurify";

const Card = ({ post }) => {
  const { title, score } = post?.data || undefined;

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
    <article className="bg-white/5 rounded-xl p-4 border border-white/10 shadow hover:shadow-lg transition  hover:-translate-y-0.5">
      <a
        href={`https://reddit.com${post.data.permalink}`}
        target="_blank"
        rel="noreferrer"
        className="text-lg font-semibold line-clamp-2 hover:text-sky-300"
      >
        {title}
      </a>
      {safeHtml ? (
        <div
          className="prose prose-invert prose-sm max-w-none mt-2"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      ) : (
        <p className="text-slate-300 mt-2 italic">No description</p>
      )}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-sky-300"
        >
          open link
        </a>
        <span>
          ⭐ <b>{score}</b>
        </span>
      </div>
    </article>
  );
};

export default Card;
