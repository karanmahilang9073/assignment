import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between px-10 py-6 bg-[#181818] shadow-md">
      <div className="font-bold text-3xl tracking-widest text-yellow-400 font-mono uppercase">
        Lawyer
      </div>
      <button onClick={() => navigate("/create-profile")}
        className="px-8 py-3 bg-linear-to-r from-yellow-400 to-yellow-700 text-[#181818] rounded-lg font-bold text-lg uppercase shadow-md tracking-wide hover:from-yellow-300 hover:to-yellow-600 transition-colors duration-200"
      >
        Create Profile
      </button>
    </nav>
  );
};

export default Navbar;
