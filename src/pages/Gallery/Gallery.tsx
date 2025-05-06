import { useState, useEffect } from "react";

interface PexelsPhoto {
  id: number;
  src: {
    medium: string;
    large: string;
  };
  width: number;
  height: number;
}

export default function Gallery() {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          "https://api.pexels.com/v1/search?query=bike&per_page=30",
          {
            headers: {
              Authorization: "JVbK3xrDekEEmHoyVeEVyuoF2m5Hv3sEWvS708RxGvDq5nCKXoxUQsSr",
            },
          }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setPhotos(data.photos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-error">
        Error loading photos: {error}
      </div>
    );
  }

  return (
    <div className="w-[91%] mx-auto py-5">
        <h3 className="text-3xl font-mono font-semibold mb-4 border-b-4 border-primary w-fit">Bike Images</h3>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 space-y-2">
        {photos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid">
            <img
              src={photo.src.large}
              alt=""
              className="w-full shadow-sm hover:shadow-md transition-shadow duration-200"
              loading="lazy"
              style={{
                height: 'auto',
                aspectRatio: `${photo.width}/${photo.height}`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}