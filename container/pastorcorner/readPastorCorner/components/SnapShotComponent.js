"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import htmlToImage from "html-to-image";

const SnapshotComponent = () => {
  const componentRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(imageData)
  // Capture component as an image

  const captureImage = async () => {
    if (!componentRef.current) return;
    setLoading(true);

    try {
         // Convert unsupported `oklch()` colors to a fallback color
        document.querySelectorAll("*").forEach(el => {
        let style = window.getComputedStyle(el);
        if (style.backgroundColor.includes("oklch")) {
            console.log("Element with oklch:", el);
          el.style.backgroundColor = "white"; // Change to a suitable fallback color
        }
        });
      
      const canvas = await html2canvas(componentRef.current, { scale: 2 });
      const imageBase64 = canvas.toDataURL("image/png");
      setImageData(imageBase64);
    } catch (error) {
      console.log("Error capturing image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Component to capture */}
      <CaptureContainer componentRef={componentRef}/>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="btn btn-accent btn-sm" onClick={captureImage} disabled={loading}>
          {loading ? "Processing..." : "Capture"}
        </button>
      </div>

      {/* Display Captured Image */}
      <ImageDisplay imageSrc={imageData} />

      {/* Share Component */}
      <ShareImage imageSrc={imageData} />
    </div>
  );
};

export default SnapshotComponent;

const CaptureContainer= ({componentRef})=>{
    return(
        <div ref={componentRef} className="p-6 shadow-md rounded-lg w-80 text-center border">
            <h2 className="text-xl font-semibold">Snapshot Me</h2>
            <p className="text-gray-600">This content will be captured.</p>
      </div>
    )
}

const ShareImage = ({ imageSrc }) => {
    const [loading, setLoading] = useState(false);
  
    const shareToFacebook = () => {
      if (!imageSrc) return alert("No image to share!");
  
      // Facebook share URL (to share a link to the image)
      const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageSrc)}`;
  
      // Open the share URL in a new window
      window.open(facebookShareURL, "_blank", "width=600,height=400");
    };
  
    const shareToX = () => {
      if (!imageSrc) return alert("No image to share!");
  
      // X (formerly Twitter) share URL (to share a link to the image)
      const xShareURL = `https://twitter.com/intent/tweet?text=Check%20out%20this%20image&url=${encodeURIComponent(imageSrc)}`;
  
      // Open the share URL in a new window
      window.open(xShareURL, "_blank", "width=600,height=400");
    };
  
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold">Share Image</div>
        
        {/* Button to share on Facebook */}
        <button className="btn btn-accent btn-sm" onClick={shareToFacebook} disabled={!imageSrc}>
          Share on Facebook
        </button>
        
        {/* Button to share on X (Twitter) */}
        <button className="btn btn-accent btn-sm" onClick={shareToX} disabled={!imageSrc}>
          Share on X
        </button>
      </div>
    );
  };
  

  export function ImageDisplay({ imageSrc }) {
    return (
      <div className="flex flex-col items-center p-4">
        <h3 className="text-lg font-semibold mb-2">Captured Image</h3>
        {imageSrc ? (
          <img src={imageSrc} alt="Captured Snapshot" className="w-64 h-auto border rounded-lg shadow-md" />
        ) : (
          <div className="w-64 h-40 flex items-center justify-center border-2 border-dashed rounded-lg text-gray-500">
            No image captured
          </div>
        )}
      </div>
    );
  }
  