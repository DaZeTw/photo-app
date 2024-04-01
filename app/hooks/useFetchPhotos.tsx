import { useState, useEffect } from "react";

interface Photo {
  _id: string;
  image: string;
}

export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/photos");
        if (!response.ok) throw new Error("Failed to fetch photos");
        const data = await response.json();
        setPhotos(data.photos); // Adjust based on your API response structure
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
};
