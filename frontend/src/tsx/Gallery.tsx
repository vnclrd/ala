import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface GalleryData {
  galleryId: string;
  code: string;
  plan: string;
  storage: string;
  quality: string;
  expirationDate: string | null;
  photos: any[];
  isActive: boolean;
  eventDate: string | null;
}

export default function Gallery() {
  const { galleryId } = useParams();
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGalleryData() {
      try {
        const response = await fetch(`http://localhost:4000/gallery/${galleryId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch gallery data.');
        }
        const data = await response.json();
        setGalleryData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    }

    if (galleryId) {
      fetchGalleryData();
    }
  }, [galleryId]);

  if (loading) {
    return <div>Loading gallery...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5f5] p-5">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-md p-5 mb-5">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Ala Photo Gallery</h1>
          {galleryData && (
            <>
              <p className="text-gray-600">
                Plan: {galleryData.plan} | Storage: {galleryData.storage} | Quality: {galleryData.quality}
              </p>
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h3 className="text-xl font-semibold mb-2">Gallery Code: {galleryData.code}</h3>
                {galleryData.expirationDate ? (
                  <p className="text-red-500">
                    ⚠️ Expires on{' '}
                    {new Date(galleryData.expirationDate).toLocaleDateString()}
                  </p>
                ) : (
                  <p className="text-yellow-600">
                    ⚠️ Please set your event date to activate expiration.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center border-2 border-dashed border-gray-400 rounded-lg p-8 bg-white text-center mb-5">
          <h3 className="text-2xl font-semibold mb-4">Upload Photos</h3>
          <input
            type="file"
            id="photoInput"
            multiple
            accept="image/*"
            className="hidden"
          />
          <button
            className="bg-[#ff6b6b] text-white py-2 px-6 rounded-md cursor-pointer hover:bg-[#e55555] transition-colors"
            onClick={() => document.getElementById('photoInput')?.click()}
          >
            Choose Photos
          </button>
          <p className="mt-2 text-gray-500">Drag and drop photos here or click to browse</p>
        </div>

        <div id="photoGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Photos will be rendered here dynamically */}
        </div>

        
      </div>
      <Link
        to="/"
        className="
          bg-[#ff6b6b] text-white py-2 px-6 rounded-md cursor-pointer
          transition-colors absolute bottom-2 left-2
          hover:bg-[#e55555] 
        "
      >
        Return Home
      </Link>
  </div>
  );
}