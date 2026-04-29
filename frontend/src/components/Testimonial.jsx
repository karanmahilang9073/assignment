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
    await updateTestimonial(testimonial._id, { text: editText });

    setTestimonial({
      ...testimonial,
      text: editText,
    });

    setIsEditing(false);
  };

  return (
    <section className=" min-h-screen bg-linear-to-b from-[#2b0906] via-black to-black flex items-center ">
      <div className="max-w-7xl mx-auto px-10 w-full">
        <h2 className=" text-center text-[90px] leading-none font-bold text-amber-600 mb-20 ">
          CLIENT <br />
          TESTIMONIALS
        </h2>

        <div className=" border border-gray-700 rounded-3xl p-16 "
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-8xl text-white mb-6">❝</div>

              {isEditing ? (
                <>
                  <textarea rows="8" value={editText} onChange={(e) => setEditText(e.target.value)} className=" w-full bg-transparent border border-amber-600 rounded-xl p-6 text-white "/>

                  <button onClick={saveTestimonial} className=" mt-6 border border-amber-600 px-6 py-3 rounded-xl text-amber-500 ">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className=" text-white text-2xl leading-loose max-w-2xl ">
                    {testimonial?.text ||
                      "Lorem ipsum dolor sit amet consectetur adipiscing elit"}
                  </p>

                  <button onClick={() => setIsEditing(true)} className=" mt-8 border border-amber-600 px-6 py-3 rounded-xl text-amber-500 ">
                    Edit Testimonial
                  </button>
                </>
              )}
            </div>

            <div className="flex justify-center">
              <img src={profile.profileImage} alt="" className=" w-85 h-110 object-cover rounded-3xl "/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
