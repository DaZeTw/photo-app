"use client";

import React from "react";
import Post from "@/app/components/Post";
import UploadButton from "@/app/components/UploadButton";
import { useFetchPhotos } from "@/app/hooks/useFetchPhotos";
const Home: React.FC = () => {
  const { photos, loading, error } = useFetchPhotos();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-20 w-full max-w-2xl mx-auto">
      <UploadButton />
      <div className="space-y-4">
        {photos.map((photo) => {
          console.log(photo._id); // Log the photo_id here
          return <Post key={photo._id} photoId={photo._id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
