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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1d1d1d]">

      <div
        id="photoGrid"
        className="flex gap-4"
      >
        {/* Photos will be rendered here dynamically */}
        <img src="" alt="" className='w-[200px] h-[300px] bg-[#fff]/40 rounded-2xl' />
        
      </div>

      {/* Floating Bar */}
      <div 
        className='
          flex items-center justify-center absolute h-[80px] bottom-2
          rounded-2xl gap-8 p-4 shadow-xl
        '
      >
        <Link
          to="/"
          className="
            bg-[#fff] text-[#000] py-2 px-6 rounded-md cursor-pointer
            transition-colors
            hover:bg-[#fff]/80
          "
        >
          Return Home
        </Link>
        <div className='flex flex-col items-center'>
          <h1 className="text-xl font-bold text-[#fff] italic">Ala Test Gallery</h1>
          <h3 className="text-sm text-[#fff]">Gallery Code: {galleryData?.code}</h3>
          {galleryData && (
            <>
              {galleryData.expirationDate ? (
                <p className="text-red-500 text-xs">
                  Expires on{' '}
                  {new Date(galleryData.expirationDate).toLocaleDateString()}
                </p>
              ) : (
                <p className="text-yellow-600">
                  Please set your event date to activate expiration.
                </p>
              )}
            </>
          )}
        </div>
        <button
          onClick={() => document.getElementById('photoInput')?.click()}
          className="
            bg-[#ff6b6b] text-white py-2 px-6 rounded-md cursor-pointer
            transition-colors
            hover:bg-[#e55555]
          "
        >
          Upload Photo
        </button>
      </div>
      
  </div>
  );
}