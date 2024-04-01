"use client";

import React, { useState, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import CommentPanel from "./CommentPanel";

interface PostProps {
  photoId: string;
}

const Post: React.FC<PostProps> = ({ photoId }) => {
  const [imgError, setImgError] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/photos/${photoId}`
        );
        const data = await response.json();
        if (data.photo && data.photo.length > 0) {
          const photo = data.photo[0];
          console.log(photo.image);
          setImageBase64(photo.image);
        } else {
          console.log("No photo data found");
        }
      } catch (error) {
        console.error("Failed to load image:", error);
        setImgError(true);
      }
    };

    fetchImage();
  }, [photoId]);

  return (
    <div className="flex flex-col justify-center items-center h-auto py-4">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-2">
        <div className="md:flex md:items-center">
          {imgError || !imageBase64 ? (
            <div className="h-48 w-full md:w-48 bg-gray-200 flex justify-center items-center">
              <span className="text-lg text-gray-500">No Image Available</span>
            </div>
          ) : (
            <img
              className="w-full h-auto md:h-48 object-contain"
              src={imageBase64}
              alt="Post image"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className="flex justify-end p-4">
          <FiMessageCircle
            className="text-2xl cursor-pointer"
            onClick={() => setShowComments(!showComments)}
          />
        </div>
        {showComments && <CommentPanel postId={photoId} />}
      </div>
    </div>
  );
};

export default Post;
