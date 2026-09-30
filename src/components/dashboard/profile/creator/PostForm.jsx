import React, { useState } from "react";
import { Upload, X, Trash2, Loader2 } from "lucide-react";
import { usePost } from "@/store/usePost";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const [images, setImages] = useState([]);
  const [serverImages, setServerImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading,setIsloading] = useState(false)
  const {storePost} = usePost();
  const navigate = useNavigate();

const handleUpload = (e) => {
  const files = e.target.files;
  if (!files) return;
  
  const imageUrls = Array.from(files).map((file) => {
    return {
      img_id: new Date().getTime().toString() + Math.random(),
      url: URL.createObjectURL(file)
    };
  });
  
  setServerImages([...serverImages, ...files]); 
  setImages([...images, ...imageUrls]);
};
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeAllImages = () => {
    setImages([]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault(); 
  setIsloading(true)
  
  const formData = new FormData();
  serverImages.forEach((imageFile) => {
    formData.append("img", imageFile);
  });
  formData.append("title", title);
  formData.append("body", description);
  
  try{
    const response = await storePost(formData);
  
  if (response?.status === 201) {
    toast("Post created successfully", {
      action: {
        label: <X size={16} />,
      },
    });
    navigate('/trending')
    // Reset form
    setTitle("");
    setDescription("");
    setImages([]);
    setServerImages([]);
  }

  }catch(error){
      if (error?.status == 400) {
        setIsloading(false)
    toast("Complete all fields", {
      action: {
        label: <X size={16} />,
      },
    });
  }
  }
}


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-0 focus:outline-none"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-0 focus:outline-none"
            placeholder="Write your post description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Upload Images */}
        <div>
          <label className="block text-sm font-medium mb-2">Add Images</label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <Upload className="w-6 h-6 mb-1 text-gray-500" />
            <span className="text-sm text-gray-500">Click to upload images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>

        {/* Preview Images */}
        {images.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                {images.length} image(s) selected
              </span>
              <button
                type="button"
                onClick={removeAllImages}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                <Trash2 size={16} /> Delete All
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden shadow"
                >
                  <img
                    src={img.url}
                    alt="preview"
                    className="w-full h-24 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-primary flex justify-center items-center gap-2 text-white rounded-lg hover:bg-primary transition"
        >
          {
            isLoading&&<Loader2 className="animate-spin"/>
          }
          Post
        </button>
      </form>
    </div>
  );
}
