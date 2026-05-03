import { useEffect, useState, useRef } from "react";
import { getTestimonials, updateTestimonial, createTestimonial } from "../services/testimonial";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editText, setEditText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const t = await getTestimonials();
      const data = t?.data || [];

      setTestimonials(data);
    };
    loadData();
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setSelectedFile(f);
      const url = URL.createObjectURL(f);
      setPreview(url);
    }
  };

  const handleEditClick = (testimonial) => {
    setEditingId(testimonial._id);
    setEditText(testimonial.text || "");
    setPreview(testimonial.clientImg || "");
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setEditText("");
    setSelectedFile(null);
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const saveTestimonial = async (testimonialId) => {
    const formData = new FormData();
    if (editText) formData.append("text", editText);
    if (selectedFile) formData.append("clientImg", selectedFile);

    try {
      const res = await updateTestimonial(testimonialId, formData);
      const updatedTestimonials = testimonials.map(t => t._id === testimonialId ? res.data : t);
      setTestimonials(updatedTestimonials);
      handleCancel();
      alert("Testimonial updated successfully!");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update");
    }
  };

  const createNewTestimonial = async () => {
    if (!editText.trim()) {
      alert("Please enter testimonial text");
      return;
    }
    if (!selectedFile) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("text", editText);
    formData.append("clientImg", selectedFile);

    try {
      const res = await createTestimonial(formData);
      setTestimonials([...testimonials, res.data]);
      handleCancel();
      setIsCreating(false);
      alert("Testimonial created successfully!");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create testimonial");
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex] || null;

  return (
    <section className="bg-linear-to-b from-[#2b0906] via-black to-black py-12">
      <div className="w-150 mx-auto px-6">
        <h2 className="text-center text-2xl font-bold text-amber-600 mb-8">
          CLIENT TESTIMONIALS
        </h2>

        {/* Create New Testimonial  */}
        {!isCreating ? (
          <div className="text-center mb-8">
            <button  onClick={() => setIsCreating(true)} className="border border-amber-600 px-6 py-3 rounded-xl text-amber-500 hover:bg-amber-600 hover:text-black font-semibold transition">
              + Create New Testimonial
            </button>
          </div>
        ) : (
          <div className="border border-gray-700 rounded-2xl p-6 mb-8">
            <h3 className="text-white text-lg font-bold mb-4">Add New Testimonial</h3>
            
            {/* Text Input */}
            <textarea rows="4" placeholder="Enter testimonial text..."value={editText} onChange={(e) => setEditText(e.target.value)} className="w-full bg-transparent border border-amber-600 rounded-xl p-4 text-white mb-4 placeholder-gray-400"/>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="text-white text-sm mb-2 block">Upload Image:</label>
              <input  type="file"  accept="image/*"  onChange={handleFileChange}  ref={fileInputRef} className="text-white text-sm mb-2"/>
              {preview && (
                <img src={preview} alt="preview" className="w-40 h-40 object-cover rounded-xl mt-2" />
              )}
            </div>

            {/* create and cancel button */}
            <div className="flex gap-2">
              <button  onClick={createNewTestimonial} className="border border-amber-600 px-6 py-2 rounded-xl text-amber-500 hover:bg-amber-600 hover:text-black font-semibold transition">
                Create
              </button>
              <button  onClick={handleCancel} className="border border-gray-600 px-6 py-2 rounded-xl text-gray-400 hover:bg-gray-600 font-semibold transition">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* card */}
        {testimonials.length > 0 && !isCreating ? (
          <div>
            <div className="border border-gray-700 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Text */}
                <div>
                  <div className="text-6xl text-white mb-4">❝</div>

                  {editingId === currentTestimonial?._id ? (
                    <>
                      {/* Edit*/}
                      <textarea  rows="6"  value={editText}  onChange={(e) => setEditText(e.target.value)}  className="w-full bg-transparent border border-amber-600 rounded-xl p-4 text-white mb-4" />

                      <div className="mb-4">
                        <input  type="file"  accept="image/*"  onChange={handleFileChange}  ref={fileInputRef} className="text-white text-sm mb-2"/>
                        {preview && (
                          <img src={preview} alt="preview" className="w-48 h-48 object-cover rounded-xl mt-2" />
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button  onClick={() => saveTestimonial(currentTestimonial._id)}  className="border border-amber-600 px-4 py-2 rounded-xl text-amber-500 hover:bg-amber-600 hover:text-black">
                          Save
                        </button>
                        <button onClick={handleCancel} className="border border-gray-600 px-4 py-2 rounded-xl text-gray-400 hover:bg-gray-600">
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Display  */}
                      <p className="text-white text-base leading-relaxed mb-4">
                        {currentTestimonial?.text || "No testimonial text"}
                      </p>

                      <button onClick={() => handleEditClick(currentTestimonial)} className="border border-amber-600 px-4 py-2 rounded-xl text-amber-500 hover:bg-amber-600 hover:text-black">
                        Edit
                      </button>
                    </>
                  )}
                </div>

                {/* Right Side - Image */}
                <div className="flex justify-center">
                  {currentTestimonial?.clientImg && (
                    <img src={currentTestimonial.clientImg} alt="client" className="w-64 h-80 object-cover rounded-2xl"/>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-6 mt-8">
              {/* Previous Button */}
              <button onClick={goToPrevious} className="border border-amber-600 px-4 py-2 rounded-xl text-amber-500 hover:bg-amber-600 hover:text-black font-semibold transition">
                ← Previous
              </button>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition ${index === currentIndex ? "bg-amber-600" : "bg-gray-500 hover:bg-gray-400"}`}aria-label={`Go to testimonial ${index + 1}`}/>
                ))}
              </div>

              {/* Next Button */}
              <button onClick={goToNext} className="border border-amber-600 px-4 py-2 rounded-xl text-amber-500 hover:bg-amber-600 hover:text-black font-semibold transition">
                Next →
              </button>
            </div>
          </div>
        ) : testimonials.length === 0 && !isCreating ? (
          <p className="text-center text-gray-400">No testimonials yet. Create one!</p>
        ) : null}
      </div>
    </section>
  );
}

export default Testimonials;
