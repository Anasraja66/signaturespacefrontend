// app/property-details/components/AllPhotosModal.jsx
"use client";
import React from "react";
// Import the X icon from lucide-react
import { X } from "lucide-react"; 

// You might not need renderIcon anymore if you only use Lucide icons here
// import { renderIcon } from "../../utils/renderIcon"; 

export default function AllPhotosModal({ images, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Define inline styles as JavaScript objects
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Darker, slightly transparent background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure it's on top of other content
    backdropFilter: "blur(5px)", // Optional: Adds a subtle blur effect
  };

  const contentStyle = {
    backgroundColor: "#ffffff", // Clean white background
    borderRadius: "12px", // More rounded corners
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", // Enhanced shadow for depth
    padding: "2rem",
    width: "800px", // Fixed width for the popup content
    height: "600px", // Fixed height for the popup content
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem", // Spacing between sections
    position: "relative", // For absolute positioning of close button
    overflow: "hidden", // Hide overflow if content exceeds fixed size
  };

  const closeBtnStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "#cba135", // New color for the close button
    border: "none",
    borderRadius: "50%", // Circular button
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out, transform 0.1s ease-in-out",
    zIndex: 1001, // Ensure it's above other content in the modal
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  };

  // Lucide icons accept 'color' and 'size' props directly
  const lucideIconProps = {
    color: "#fff", // White icon for contrast
    size: 24, // Size in pixels
    strokeWidth: 2.5, // Make the icon slightly bolder
  };


  const carouselContainerStyle = {
    textAlign: "center",
    marginBottom: "1.5rem", // Increased margin
    flexGrow: 1, // Allows carousel to take available space
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center image vertically within its container
    alignItems: "center", // Center image horizontally
    overflow: "hidden", // Ensure image doesn't overflow this container
  };

  const mainImageStyle = {
    maxWidth: "100%", // Ensure image is fully responsive within its container
    maxHeight: "calc(100% - 60px)", // Allocate space for navigation controls, adjust as needed
    width: "auto",
    height: "auto",
    borderRadius: "8px",
    objectFit: "contain", // Ensure the whole image is visible, fits within bounds
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", // Subtle shadow for the main image
  };

  const navControlsStyle = { // For the navigation buttons and count
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem", // Spacing above controls
    gap: "1.5rem", // Space between elements
  };

  const navButtonStyle = {
    backgroundColor: "#cba135", // Use new color for buttons
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "0.75rem 1.5rem", // Larger click area
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.2s ease-in-out, transform 0.1s ease-in-out",
  };

  const pageCountStyle = {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#333",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", // Responsive grid
    gap: "10px", // Spacing between thumbnails
    justifyItems: "center", // Center items in the grid
    padding: "0.5rem",
    borderTop: "1px solid #eee", // Subtle separator
    paddingTop: "1.5rem",
    overflowY: "auto", // Allow thumbnails to scroll if too many
    maxHeight: "150px", // Max height for thumbnail grid, adjust as needed
  };

  const thumbnailStyle = (index) => ({
    width: "100px", // Fixed width for thumbnails
    height: "75px", // Adjusted height for better aspect ratio
    objectFit: "cover",
    borderRadius: "6px", // Slightly rounded corners
    border: currentImageIndex === index ? "2px solid #cba135" : "2px solid #ccc", // Dynamic border
    cursor: "pointer",
    transition: "border-color 0.2s ease-in-out, transform 0.1s ease-in-out, box-shadow 0.2s ease-in-out",
    boxShadow: currentImageIndex === index ? "0 0 10px rgba(203, 161, 53, 0.6)" : "none", // Active glow
    transform: currentImageIndex === index ? "scale(1.02)" : "none", // Slightly larger for active
  });


  return (
    <div className="all-photos-modal-overlay" style={overlayStyle}>
      <div className="all-photos-modal-content" style={contentStyle}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          style={closeBtnStyle}
          // On hover style for close button
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#a8812c"; // Darker shade on hover
            e.currentTarget.style.transform = "rotate(90deg)"; // Subtle rotate effect
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#cba135";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
        >
          {/* Use the Lucide X component directly */}
          <X {...lucideIconProps} />
        </button>

        <div className="carousel-container" style={carouselContainerStyle}>
          <img
            src={images[currentImageIndex]}
            alt={`Property image ${currentImageIndex + 1}`}
            style={mainImageStyle}
          />
          <div style={navControlsStyle}>
            <button
              onClick={handlePrev}
              style={navButtonStyle}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#a8812c"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#cba135"; e.currentTarget.style.transform = "translateY(0)"; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Prev
            </button>
            <span style={pageCountStyle}>{currentImageIndex + 1} / {images.length}</span>
            <button
              onClick={handleNext}
              style={navButtonStyle}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#a8812c"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#cba135"; e.currentTarget.style.transform = "translateY(0)"; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Next
            </button>
          </div>
        </div>

        <div className="all-photos-grid" style={gridStyle}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Property image ${index + 1}`}
              style={thumbnailStyle(index)}
              onClick={() => setCurrentImageIndex(index)}
              onMouseEnter={(e) => {
                if (currentImageIndex !== index) {
                  e.currentTarget.style.borderColor = "#cba135";
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 0 8px rgba(203, 161, 53, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentImageIndex !== index) {
                  e.currentTarget.style.borderColor = "#ccc";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}