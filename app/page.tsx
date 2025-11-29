import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Works from "./components/Works";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

export default function Home() {
  return (
    <>
      <Loading />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Services />
        <Works />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
