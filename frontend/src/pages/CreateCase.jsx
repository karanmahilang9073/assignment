import { useState } from "react";
import { addCase } from "../services/case";
import { useNavigate } from "react-router-dom";

function CreateCase() {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await addCase({ description });

    alert("Case Added");
    navigate("/");
  };

  return (
    <section className="min-h-screen bg-black flex justify-center items-center">
      <form nSubmit={submit} className="border border-amber-600 p-10 rounded-3xl w-175" >
        <h1 className="text-5xl text-amber-600 mb-8">Add Case</h1>

        <textarea rows="8" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-6 bg-transparent border text-white"/>

        <button className="mt-8 border px-8 py-4 text-amber-500">Save</button>
      </form>
    </section>
  );
}

export default CreateCase;
