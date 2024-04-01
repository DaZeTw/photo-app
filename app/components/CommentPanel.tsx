"use client";

import React, { useEffect, useState } from "react";
import { useCommentsStore } from "@/app/stores/comments";

interface CommentPanelProps {
  postId: string;
}

const CommentPanel: React.FC<CommentPanelProps> = ({ postId }) => {
  const [commentText, setCommentText] = useState<string>("");
  const { commentsByPostId, fetchAndSetCommentsByPost, addComment } =
    useCommentsStore();

  useEffect(() => {
    fetchAndSetCommentsByPost(postId);
  }, [postId, fetchAndSetCommentsByPost]);

  const comments = commentsByPostId[postId] || [];

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentText.trim()) {
      
      await addComment(postId, { text: commentText });
      setCommentText(""); 
      await fetchAndSetCommentsByPost(postId); 
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Post Comment
        </button>
      </form>
      <div className="mt-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="mt-2">
              {comment.text}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentPanel;
