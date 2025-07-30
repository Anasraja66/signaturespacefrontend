// app/property-details/components/ImageGallery.jsx
"use client"; // Keep this if you're using Next.js App Router
import { useState } from "react";
import { renderIcon } from "../../utils/renderIcon"; // Adjusted path
import AllPhotosModal from "./AllPhotosModal"; // We'll create this component

export default function ImageGallery({ images }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  const mainImage = images[0];
  // Get up to 4 thumbnails, ensuring we don't go out of bounds if less than 5 images total
  const thumbnails = images.slice(1, 5); 

  return (
    <>
      <div className="image-gallery">
        <div className="main-image-container">
          {/* Use array[0] for src, provide a fallback */}
          <img src={mainImage || "/placeholder.svg"} alt="Main property view" />
          <button className="more-photos-overlay" onClick={() => setShowAllPhotos(true)}>
            {renderIcon("Expand", 16)} {/* Assuming "Expand" icon exists and accepts size */}
            <span>{`+${images.length} photos`}</span>
          </button>
        </div>
        {thumbnails.length > 0 && (
          <div className="thumbnail-grid">
            {thumbnails.map((img, index) => (
              <img
                key={index}
                src={img || "/placeholder.svg"}
                alt={`Property thumbnail ${index + 1}`}
                // Optional: add onClick to open modal from thumbnail too
                onClick={() => setShowAllPhotos(true)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Render the modal conditionally */}
      {showAllPhotos && (
        <AllPhotosModal images={images} onClose={() => setShowAllPhotos(false)} />
      )}
    </>
  );
}