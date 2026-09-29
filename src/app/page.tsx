import NeuralBackground from "@/components/NeuralBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import ProjectExplorer from "@/components/ProjectExplorer";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground selection:bg-primary/30 selection:text-white">
      <NeuralBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <ProjectExplorer />
      <Contact />
      <Footer />
    </main>
  );
}
