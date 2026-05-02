import { useEffect, useState } from "react";
import { getCases } from "../services/case";
import {useNavigate} from "react-router-dom";

function RecentCases() {
  const [cases, setCases] = useState([]);
  const [index, setIndex] = useState(0);

  const navigate=useNavigate();

  useEffect(() => {
    const loadCases = async () => {
    const res = await getCases();
    setCases(res.data || res);
  };
    loadCases();
  }, []);

  const nextCases = () => {
    if (index + 3 < cases.length) {
      setIndex(index + 1);
    }
  };

  return (
    <section className="bg-linear-to-r from-orange-950 to-black py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* heading row */}
        <div className="flex items-center justify-center gap-2 mb-6 ml-">
          <div className="w-155 h-px bg-amber-600"></div>
          <h2 className="text-2xl font-bold text-amber-600 leading-none">MY RECENT CASES</h2>
        </div>

       
        {/* cards */}
        <div className="relative grid md:grid-cols-3 mt-8 gap-6 z-10">
          {cases.slice(index, index + 3).map((item) => (
            <div key={item._id} className="border border-amber-600  rounded-2xl p-6 backdrop-blur-md bg-black flex items-center justify-center h-40">
              <p className="text-white text-sm leading-relaxed text-center">{item.description}</p>
            </div>
          ))}
        </div>

        {/* buttons */}
        <div className="flex justify-between items-center mt-6">
          <button onClick={() => navigate("/create-case")} className="border border-amber-600 text-orange-300 px-4 py-2 rounded-lg">+ Add Case</button>
          <button onClick={nextCases} className="w-12 h-12 rounded-full border border-amber-600 text-2xl text-amber-500">→</button>
        </div>
      </div>
    </section>
  );
}

export default RecentCases;
