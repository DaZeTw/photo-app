"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Upload() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [base64Photo, setBase64Photo] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setPhoto(file);
      convertImageToBase64(file, (base64) => {
        setBase64Photo(base64);
        console.log(base64); // Optional: Log or use the Base64 string
      });
    }
  };

  const uploadPhoto = async () => {
    if (!base64Photo) {
      setError("Please select a photo to upload");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Photo }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Photo uploaded successfully:", result);
        router.push("/");
      } else {
        setError(result.message || "Failed to upload photo.");
      }
    } catch (error) {
      setError("An error occurred during upload.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Upload Photo
        </h2>
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}
        <input
          type="file"
          onChange={onChange}
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          onClick={uploadPhoto}
          disabled={isUploading}
          className={`mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
            isUploading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors duration-150`}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}

const convertImageToBase64 = (
  file: File,
  callback: (base64: string) => void
) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    if (typeof reader.result === "string") {
      callback(reader.result);
    }
  };
  reader.onerror = (error) => {
    console.error("Error converting image to Base64:", error);
  };
  reader.readAsDataURL(file);
};
