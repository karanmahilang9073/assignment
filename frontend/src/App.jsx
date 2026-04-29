import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import CreateCase from "./pages/CreateCase";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="create-case" element={<CreateCase/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
