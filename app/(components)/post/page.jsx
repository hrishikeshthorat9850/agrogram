import Image from "next/image";
import { FaRegHeart, FaRegComment } from "react-icons/fa";

export default function PostCard({ post, comment, idx }) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full min-h-[350px] w-full mb-4">
      <div className="flex items-center gap-3 px-4 py-3">
        <Image
          src={post.avatar}
          alt={post.user}
          width={36}
          height={36}
          className="rounded-full border"
        />
        <span className="font-semibold text-green-800">{post.user}</span>
      </div>
      {post.image && (
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src={post.image}
            alt="Farm post"
            fill
            style={{ objectFit: "cover" }}
            className="w-full"
            sizes="(max-width: 600px) 100vw, 600px"
            priority={idx < 3}
          />
        </div>
      )}
      <div className="px-4 py-3 text-gray-800 text-base border-t flex-1">
        {post.text}
      </div>
      {/* Like and Comment Buttons */}
      <div className="flex gap-6 px-4 py-2 border-t items-center">
        <button className="flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold focus:outline-none" disabled>
          <FaRegHeart className="text-lg" /> Like
        </button>
        <button className="flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold focus:outline-none" disabled>
          <FaRegComment className="text-lg" /> Comment
        </button>
      </div>
      {/* Comments List */}
      <div className="px-4 pb-2">
        <div className="bg-green-50 rounded-lg p-3 mb-2">
          <span className="font-semibold text-green-700 mr-2">{comment.user}:</span>
          <span className="text-green-900">{comment.text}</span>
        </div>
      </div>
      {/* Comment Input Box */}
      <div className="px-4 pb-4">
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full mt-1 px-4 py-2 rounded-full border border-green-200 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300 text-green-900 placeholder-green-400 shadow-sm"
          disabled
        />
      </div>
    </article>
  );
} 