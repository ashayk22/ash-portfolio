import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroCinematic from "@/components/HeroCinematic";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import StackContact from "@/components/StackContact";
import GutterWaves from "@/components/GutterWaves";

export default function Home() {
  return (
    <div className="relative [overflow-x:clip] max-w-[100vw]">
      <GutterWaves />
      <div className="max-w-[1200px] mx-auto min-h-screen bg-[#f0f0f0] dark:bg-[#0e0e0e] relative z-10">
        <Navbar />
        <Hero />
        <HeroCinematic />
        <Projects />
        <TechStack />
        <About />
        <StackContact />
      </div>
    </div>
  );
}
