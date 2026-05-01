import { useEffect, useState, useRef } from "react";
import { getProfile, updateProfile } from "../services/profile";
import Qr from "./Qr";


function Hero() {
  const [profile, setProfile] = useState({});
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setSelectedFile(f);
      const url = URL.createObjectURL(f);
      setPreview(url);
    }
  };

  const handleEditClick = () => {
    setIsEditingImage(true);
  };

  const handleCancel = () => {
    setIsEditingImage(false);
    setSelectedFile(null);
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSaveImage = async () => {
    if (!profile._id) return alert("Profile ID missing");
    if (!selectedFile) return alert("Select an image first");
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    
    try {
      const res = await updateProfile(profile._id, formData);
      setProfile(res?.data || res);
      alert("Image uploaded successfully!");
      handleCancel();
    } catch (err) {
      console.error("Upload error:", err);
      alert(err?.response?.data?.message || "Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    const loadProfile = async () => {
      const res = await getProfile();
      setProfile(res.data || res);
    };
    loadProfile();
  }, []);

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-black via-black to-[#2b1206]" />

      <div className="relative max-w-7xl mx-auto min-h-screen flex items-center px-10">
        {/* Left image */}
        <div className="w-1/3 h-80 relative">
          <img src={preview || profile.profileImage} alt="" className="w-180 max-w-none h-140 translate-y-10"/>

          <div className="absolute -top-2 right-3 z-30 flex items-center gap-2">
            {!isEditingImage ? (
              <button onClick={handleEditClick} className="bg-black/60 border border-amber-600  px-3 py-1 text-amber-500 rounded backdrop-blur-sm">
                Edit Image
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input id="hero-image-input" ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                <label htmlFor="hero-image-input" className="bg-black/60 border border-amber-600 px-3 py-1 text-amber-500 rounded cursor-pointer">Choose</label>

                <button  onClick={handleSaveImage}  disabled={isLoading} className={`bg-black/60 border border-amber-600 px-3 py-1 rounded ${isLoading ? "text-gray-400 opacity-50 cursor-not-allowed" : "text-amber-500 cursor-pointer"}`}
                >
                  {isLoading ? "Uploading..." : "Save"}
                </button>

                <button  onClick={handleCancel}  disabled={isLoading} className="bg-black/40 border text-amber-500 border-gray-700 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* QR code */}
        <div className="w-10 flex flex-col items-start pl-20">
          <div className="flex justify-center items-center ml-40 h-45">
            <Qr />
          </div>
        </div>

        {/* stats */}
        <div
          className=" absolute bottom-1 left-160 -translate-x-1/2 border text-white border-amber-600 rounded-2xl px-10 py-1 mb-10 flex gap-20 backdrop-blur-md  ">
          <div className="text-center">
            <h2 className="text-6xl font-bold">2K+</h2>
            <p className="tracking-[8px]">Cases</p>
          </div>

          <div className="text-center">
            <h2 className="text-6xl font-bold">88%</h2>
            <p className="tracking-[8px]">Success</p>
          </div>

          <div className="text-center">
            <h2 className="text-6xl font-bold">1K+</h2>
            <p className="tracking-[6px]">Happy Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
