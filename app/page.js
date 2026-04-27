import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import StackContact from "@/components/StackContact";
import GutterWaves from "@/components/GutterWaves";

export default function Home() {
  return (
    <div className="relative">
      <GutterWaves />
      <div className="max-w-[1200px] mx-auto min-h-screen shadow-[0_0_0_1px_rgba(0,0,0,0.06)] bg-[#f0f0f0] dark:bg-[#0e0e0e] relative z-10">
        <Navbar />
        <Hero />
        <Projects />
        <About />
        <StackContact />
      </div>
    </div>
  );
}
