import { useState } from "react";
import { createProfile } from "../services/profile";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const navigate = useNavigate();

  const [about, setAbout] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("about", about);
      formData.append("profileImage", profileImage);

      await createProfile(formData);

      alert("Profile Created");
      navigate("/");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message || "Failed to create profile"));
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-r from-[#1a0903] via-black to-black flex items-center justify-center px-6 relative">
      {/* Back Button */}
      <button onClick={() => navigate("/")} className=" absolute top-8 left-8 border border-amber-600 text-amber-500 px-6 py-3 rounded-xl ">
        ← Back
      </button>

      <div className="w-full max-w-3xl border border-amber-600 rounded-3xl p-12">
        <h1 className="text-6xl font-bold text-amber-600 text-center mb-12">
          CREATE PROFILE
        </h1>

        <form onSubmit={submit} className="space-y-8">
          <div>
            <label className="block text-white mb-4">
              Upload Profile Image
            </label>
            <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="w-full border border-amber-600 p-4 rounded-xl text-white"/>
          </div>

          <div>
            <label className="block text-white mb-4">About Me</label>
            <textarea rows="8" value={about} onChange={(e) => setAbout(e.target.value)} className="w-full border border-amber-600 bg-transparent p-6 rounded-2xl text-white"/>
          </div>

          <button className="w-full border border-amber-600 py-4 rounded-xl text-amber-500">
            Save Profile
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateProfile;
