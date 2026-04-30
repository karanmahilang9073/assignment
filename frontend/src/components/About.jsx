import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profile";
import statue from "../assets/statue.png";

function AboutSection() {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingAbout, setEditingAbout] = useState("");

  useEffect(() => {
    const loadData = async () => {
    const res = await getProfile();
    const data = res.data || res;
    setProfile(data);
    setEditingAbout(data.about || "");
  };
    loadData();
  }, []);

  

  const saveAbout = async () => {
    await updateProfile(profile._id, { about: editingAbout });

    setProfile({
      ...profile,
      about: editingAbout,
    });

    setIsEditing(false);
  };

  return (
    <section className="bg-black relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-linear-to-r from-[#1a0802] via-black to-black"></div>

      <div className="relative max-w-4xl mx-auto grid md:grid-cols-2 items-center gap-8 px-6">
        <div className="p-6">
          <h2 className="text-white text-3xl leading-tight max-w-2xl mb-4">ABOUT ME</h2>

          <div className="border-l border-white pl-6">
            {isEditing ? (
              <>
                <textarea rows="6" value={editingAbout} onChange={(e) => setEditingAbout(e.target.value)} className="w-full max-w-xl bg-transparent border border-amber-600 p-4 rounded-xl text-white"/>
                <button onClick={saveAbout} className="mt-4 border border-amber-600 px-4 py-2 text-amber-500 rounded-xl">
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="text-white text-base leading-relaxed max-w-xl">
                  {profile.about}
                </p>

                <button onClick={() => setIsEditing(true)} className="mt-4 border border-amber-600 px-4 py-2 text-amber-500 rounded-xl">
                  Edit About
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <img src={statue} alt="" className="w-56 h-auto object-contain" />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
