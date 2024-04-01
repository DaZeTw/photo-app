import React from "react";
import { useRouter } from "next/navigation";

const UploadButton: React.FC = () => {
  const router = useRouter();

  const handleUploadClick = () => {
    router.push("/upload");
  };

  return (
    <button
      onClick={handleUploadClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
    >
      Upload Photo
    </button>
  );
};

export default UploadButton;
