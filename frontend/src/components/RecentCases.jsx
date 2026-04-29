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
    <section className=" min-h-screen bg-[radial-gradient(circle_at_left,#2b1206_0%,#000_65%)] py-24 ">
      <div className="max-w-7xl mx-auto px-8">
        {/* heading row */}
        <div className=" flex items-center justify-center gap-10 mb-12 ">
          <div className="w-72 h-0.5 bg-amber-600"></div>
          <h2 className=" text-[90px] font-bold text-amber-600 leading-none ">
            MY RECENT CASES
          </h2>
        </div>

        {/* gavel image */}
        <div className="flex justify-center -mb-20">
          <img src="/gavel.png" alt="" className=" w-225 object-contain "
          />
        </div>

        {/* cards */}
        <div className=" relative grid md:grid-cols-3 mt-20 gap-10 z-10 ">
          {cases.slice(index, index + 3).map((item) => (
            <div key={item._id} className=" border border-amber-600 rounded-3xl p-10 backdrop-blur-md bg-black/40 min-h-105 flex items-center ">
              <p className=" text-white text-2xl leading-loose text-center ">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* buttons */}
        <div className=" flex justify-between items-center mt-12 ">
          <button onClick={()=>navigate("/create-case")} className="border border-amber-600 text-orange-300 px-8 py-4 rounded-xl" >
              + Add Case
          </button>

          <button onClick={nextCases} className=" w-20 h-20 rounded-full border border-amber-600 text-4xl text-amber-500 ">
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default RecentCases;
