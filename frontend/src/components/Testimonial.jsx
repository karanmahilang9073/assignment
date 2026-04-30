import { useEffect, useState } from "react";
import { getTestimonials, updateTestimonial } from "../services/testimonial";

import { getProfile } from "../services/profile";

function Testimonials() {
  const [testimonial, setTestimonial] = useState({});
  const [profile, setProfile] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  useEffect(() => {
      const loadData = async () => {
      const t = await getTestimonials();
      const p = await getProfile();
      const data = t?.data?.[0] || {};

      setTestimonial(data);
      setEditText(data?.text || "");
      setProfile(p.data || p);
    };
    loadData();
  }, []);

  

  const saveTestimonial = async () => {
    if (!testimonial._id) {
      alert("Testimonial ID is missing. Cannot update testimonial.");
      return;
    }
    await updateTestimonial(testimonial._id, { text: editText });
    setTestimonial({
      ...testimonial,
      text: editText,
    });
    setIsEditing(false);
  };

  return (
    <section className="bg-linear-to-b from-[#2b0906] via-black to-black py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-center text-2xl font-bold text-amber-600 mb-8">CLIENT TESTIMONIALS</h2>

        <div className="border border-gray-700 rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-6xl text-white mb-4">❝</div>

              {isEditing ? (
                <>
                  <textarea rows="6" value={editText} onChange={(e) => setEditText(e.target.value)} className="w-full bg-transparent border border-amber-600 rounded-xl p-4 text-white"/>

                  <button onClick={saveTestimonial} className="mt-4 border border-amber-600 px-4 py-2 rounded-xl text-amber-500">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="text-white text-base leading-relaxed max-w-xl">
                    {testimonial?.text || "Lorem ipsum dolor sit amet consectetur adipiscing elit"}
                  </p>

                  <button onClick={() => setIsEditing(true)} className="mt-4 border border-amber-600 px-4 py-2 rounded-xl text-amber-500">
                    Edit Testimonial
                  </button>
                </>
              )}
            </div>

            <div className="flex justify-center">
              <img src={profile.profileImage} alt="" className="w-40 h-auto object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
