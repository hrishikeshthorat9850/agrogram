"use client";
import Image from "next/image";
import { FaRegHeart, FaRegComment ,FaPaperPlane,FaHeart } from "react-icons/fa";
import { useState,useRef } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useLogin } from "@/app/(context)/logincontext";
export default function PostCard({ post, comment, idx }) {
  const {user} = useLogin();
  const [showAllComments, setShowAllComments] = useState(false);
  const [error,setError] = useState(null);
  const [com,setCom] = useState("");
  const [isLike,setisLike] = useState(false);
  const [isComment,setisComment] = useState(false);
  const visibleComments = showAllComments ? comment : comment.slice(0, 2);
  const commentIconRef = useRef(null);
  const [likeCount,setlikeCount] = useState(0);

  const handleComment = (e)=>{
    setCom(e.target.value);
  }

  const saveComment = async ()=>{
    const { data: { user } } = await supabase.auth.getUser();
    console.log("Auth UID:", user?.id);
    const {data,error} = await supabase
      .from("post_comments")
      .insert({
        post_id : post.id,
        comment : com,
        user_id : user.id
      })
      .select()
    if(error){
      setError(error.message);
      console.log(error);
    }else{
      console.log(data);
    }
  }

  const handleCommentClick = ()=>{
    console.log("Comment Icon is Clicked");
    if(commentIconRef.current){
      commentIconRef.current.focus();
    }
  }
  const handleLikeClick = () => {
    if (isLike) {
      // if already liked → unlike
      setlikeCount((c) => c - 1);
    } else {
      // if not liked → like
      setlikeCount((c) => c + 1);
    }
    setisLike((prev) => !prev); // toggle separately
  };

  
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full min-h-[350px] w-full mb-4">
      {/* User Info */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Image
          src={post.post_image_url}
          alt={post.id}
          width={36}
          height={36}
          className="rounded-full border"
        />
        <span className="font-semibold text-green-800">{post.user}</span>
      </div>

      {/* Post Image */}
      {post.post_image_url && (
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src={post.post_image_url}
            alt="Farm post"
            fill
            style={{ objectFit: "cover" }}
            className="w-full"
            sizes="(max-width: 600px) 100vw, 600px"
            priority={idx < 3}
          />
        </div>
      )}

      {/* Post Text */}
      <div className="px-4 py-3 text-gray-800 text-base border-t flex-1">
        {post.text}
      </div>

      {/* Like and Comment Buttons */}
      <div className="flex gap-6 px-4 py-2 border-t items-center">
        <button
          className="flex items-center gap-2 text-green-600  hover:text-green-800 font-semibold focus:outline-none"
          onClick={handleLikeClick}
        >
          {!isLike ? <><FaRegHeart className="text-lg" /> </> :  <FaHeart className="text-red-500 text-lg" />}{likeCount}
        </button>
        <button
          className="flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold focus:outline-none"
          onClick={handleCommentClick}
        >
          <FaRegComment className="text-lg" /> Comment
        </button>
      </div>

      {/* Comments */}
{/* Comments */}
{/* Comments */}
    <div className="px-4 pb-3">
      {comment.length > 0 ? (
        <>
          {/* Scrollable container */}
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 hide-scrollbar">
            {[...comment].sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).map((c) => (
              <div
                key={c.id}
                className="bg-green-50 rounded-lg p-2 shadow-sm border border-green-100"
              >
                <span className="text-green-900 text-sm">{c.comment}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <span className="text-gray-500 text-sm">No comments yet</span>
      )}
    </div>


      {/* Comment Input */}
      { user && 
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 rounded-full border border-green-200 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300 text-green-900 placeholder-green-400 shadow-sm"
              value={com}
              onChange={handleComment}
              ref={commentIconRef}
            />
            <button
              onClick={saveComment}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
          </div>
        </div>
      }
    </article>
  );
}
