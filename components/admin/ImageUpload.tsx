"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaUpload, FaImage, FaCheckCircle, FaTimes } from "react-icons/fa";
import axios from "axios";

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
  acceptVideo?: boolean;
}

const ImageUpload = ({ onUploadComplete, acceptVideo = false }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const validTypes = acceptVideo
      ? ["image/jpeg", "image/png", "image/jpg", "image/gif", "video/mp4", "video/webm"]
      : ["image/jpeg", "image/png", "image/jpg", "image/gif"];

    if (!validTypes.includes(selectedFile.type)) {
      setError(`Invalid file type. Please select a valid ${acceptVideo ? "image or video" : "image"} file.`);
      return;
    }

    // Validate file size (5MB for images, 100MB for videos)
    const maxSize = acceptVideo && selectedFile.type.startsWith("video/")
      ? 100 * 1024 * 1024
      : 5 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError(`File size too large. Max size: ${acceptVideo ? "100MB for videos, 5MB for images" : "5MB"}`);
      return;
    }

    setFile(selectedFile);
    setError("");

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    const isVideo = file.type.startsWith("video/");
    formData.append(isVideo ? "video" : "image", file);

    try {
      const token = localStorage.getItem("token"); // Assuming JWT token is stored
      const endpoint = isVideo ? "/api/upload/video" : "/api/upload/image";

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUploadedUrl(data.url);
      if (onUploadComplete) {
        onUploadComplete(data.url);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setUploadedUrl("");
    setError("");
  };

  if (uploadedUrl) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card text-center"
      >
        <FaCheckCircle className="text-6xl mx-auto mb-4" style={{ color: "var(--secondary)" }} />
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
          Upload Successful!
        </h3>
        <p className="mb-4" style={{ color: "var(--text-muted)" }}>
          URL: <code className="text-xs">{uploadedUrl}</code>
        </p>
        <button onClick={handleReset} className="btn-secondary">
          Upload Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
        {acceptVideo ? "Upload Image or Video" : "Upload Image"}
      </h3>

      {!preview ? (
        <label
          className="block border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors hover:border-secondary"
          style={{ borderColor: "var(--text-muted)" }}
        >
          <input
            type="file"
            accept={acceptVideo ? "image/*,video/*" : "image/*"}
            onChange={handleFileChange}
            className="hidden"
          />
          <FaUpload className="text-5xl mx-auto mb-4" style={{ color: "var(--secondary)" }} />
          <p className="font-semibold mb-2" style={{ color: "var(--text)" }}>
            Click to upload or drag and drop
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {acceptVideo
              ? "PNG, JPG, GIF up to 5MB • MP4, WEBM up to 100MB"
              : "PNG, JPG, GIF up to 5MB"}
          </p>
        </label>
      ) : (
        <div>
          <div className="relative mb-4">
            {file?.type.startsWith("video/") ? (
              <video src={preview} controls className="w-full rounded-lg" />
            ) : (
              <img src={preview} alt="Preview" className="w-full rounded-lg" />
            )}
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--primary)",
              }}
            >
              <FaTimes />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              <strong>File:</strong> {file?.name}
              <br />
              <strong>Size:</strong> {(file?.size || 0 / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="btn-primary w-full disabled:opacity-50 flex items-center justify-center"
          >
            <FaUpload className="mr-2" />
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-4">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
