import { useEffect, useState } from "react";
import { getProfile } from "../services/profile";

function Hero() {
  const [profile, setProfile] = useState({});

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
        <div className="w-1/2 relative">
          <img src={profile.profileImage} alt="" className="w-180 max-w-none object-contain translate-y-10"/>
        </div>

        {/* Right text */}
        <div className="w-1/2 flex flex-col items-start pl-12">
          <h1 className=" text-[150px] leading-[0.9] font-bold texwh text-amber-600">
            THASE <br /> WEBB
          </h1>

          <button className=" mt-10 border border-amber-600 px-10 py-4 tracking-widest text-white ">
            MESSAGE
          </button>
        </div>

        {/* Floating stats */}
        <div
          className=" absolute bottom-8 left-1/2 -translate-x-1/2 border text-white border-amber-600 rounded-2xl px-20 py-8 flex gap-24 backdrop-blur-md ">
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
