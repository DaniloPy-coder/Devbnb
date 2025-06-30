import { useState, useEffect } from "react";

const PhotoUploader = ({ photos, setPhotos }) => {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("http://localhost:3333/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Erro ao enviar arquivo");

        const data = await res.json();
        uploadedUrls.push(data.url);
      } catch (err) {
        console.error("Erro no upload:", err);
        alert("Falha no upload da imagem.");
      }
    }

    setPhotos((prev) => [...prev, ...uploadedUrls]);
  };

  const deletePhoto = (index) => {
    const updated = [...photos];
    updated.splice(index, 1);
    setPhotos(updated);
  };

  const promotePhoto = (index) => {
    const updated = [...photos];
    const [chosen] = updated.splice(index, 1);
    updated.unshift(chosen);
    setPhotos(updated);
  };

  useEffect(() => {
    setPreviews(photos);
  }, [photos]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="photos" className="ml-2 text-2xl font-bold">
        Fotos
      </label>

      <div className="mt-2 grid grid-cols-5 gap-4">
        <label
          htmlFor="file"
          className="flex aspect-square cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gray-300"
        >
          <input
            type="file"
            id="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>

        {previews.map((url, idx) => (
          <div
            key={idx}
            className="relative aspect-square overflow-hidden rounded-2xl border border-gray-300"
          >
            <img
              src={url}
              alt={`Foto ${idx}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute right-2 bottom-2 flex gap-1">
              <div
                onClick={() => promotePhoto(idx)}
                className="hover:bg-primary-400 cursor-pointer rounded-full bg-gray-100 p-2 opacity-75 hover:text-white"
              >
                ⭐
              </div>
              <div
                onClick={() => deletePhoto(idx)}
                className="hover:bg-primary-400 cursor-pointer rounded-full bg-gray-100 p-2 opacity-75 hover:text-white"
              >
                ❌
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUploader;
