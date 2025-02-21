import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const HandwritingOCR = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      processImage(file);
    }
  };

  const processImage = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/ocr", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setText(data.text);
    } catch (error) {
      console.error("Error processing image:", error);
      setText("Error processing image. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 p-6">
      {/* Header with Logo */}
      <div className="flex justify-between items-center w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg mb-6">
        <img src="/university-bremen-logo.png" alt="University of Bremen Logo" className="h-12" />
        <h2 className="text-xl font-semibold text-gray-700">Cognitive Systems Lab</h2>
      </div>
      
      {/* Main Container */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">German Handwriting OCR</h1>

        {/* File Upload */}
        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
          Upload Image
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>

        {/* Display Uploaded Image */}
        {image && <img src={image} alt="Uploaded" className="mt-4 max-h-60 mx-auto border rounded-lg shadow-md" />}

        {/* Processing Message */}
        {loading && <p className="mt-4 text-blue-500 font-semibold">Processing image...</p>}

        {/* Text Output */}
        <textarea
          value={text}
          placeholder="Recognized text will appear here..."
          className="mt-4 w-full p-3 border rounded-md text-gray-700"
          rows="4"
          readOnly
        />
      </div>
    </div>
  );
};

export default HandwritingOCR;
