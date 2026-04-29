import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutSection from "../components/About";
import InfoCards from "../components/Info";
import RecentCases from "../components/RecentCases";
import Testimonials from "../components/Testimonial";
import ShortMessage from "../components/Shortmsg";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <InfoCards/>
      <RecentCases/>
      <Testimonials/>
      <ShortMessage/>
    </>
  );
}

export default Home;
