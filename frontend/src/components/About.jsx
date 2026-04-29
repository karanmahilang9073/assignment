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
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-[#1a0802] via-black to-black"></div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-[50%_50%] items-centermin-h-screen px-16">
        <div>
          <h2 className="text-white text-[30px] leading-loosemax-w-2xl">ABOUT ME</h2>

          <div className="border-l border-white pl-8">
            {isEditing ? (
              <>
                <textarea rows="8" value={editingAbout} onChange={(e) => setEditingAbout(e.target.value)}className="w-full max-w-xl bg-transparentborder border-amber-600 p-5 rounded-xl text-white"/>
                <button onClick={saveAbout} className=" mt-6 border border-amber-600 px-6 py- text-amber-500 rounded-xl ">
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="text-white text-2xl leading-loose max-w-xl">
                  {profile.about}
                </p>

                <button
                  onClick={() => setIsEditing(true)} className=" mt-6 border border-amber-600 px-6 py-3 text-amber-500 rounded-xl ">
                  Edit About
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <img src={statue} alt="" className=" max-w-none translate-x-20" />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
