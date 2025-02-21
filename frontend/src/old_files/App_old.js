import React, { useState } from "react";
import axios from "axios";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Upload } from "lucide-react";

export default function HandwritingRecognition() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await axios.post("http://localhost:5000/recognize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setText(response.data.text);
    } catch (error) {
      console.error("Error recognizing text:", error);
      alert("Failed to process image.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-6 shadow-lg bg-white rounded-2xl">
        <CardContent className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            className="hidden"
            id="upload"
          />
          <label
            htmlFor="upload"
            className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600"
          >
            <Upload className="mr-2" /> Upload Image
          </label>
          {image && <p className="text-sm text-gray-500">Selected: {image.name}</p>}
          <Button onClick={handleSubmit} disabled={loading} className="bg-green-500 hover:bg-green-600">
            {loading ? "Processing..." : "Convert to Text"}
          </Button>
          <Textarea
            readOnly
            value={text}
            placeholder="Recognized text will appear here..."
            className="h-40 p-2 border rounded-md"
          />
        </CardContent>
      </Card>
    </div>
  );
}
