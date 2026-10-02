import About from "./components/About";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Quote from "./components/Quote";
import Reviews from "./components/Reviews";
import ServiceArea from "./components/ServiceArea";
import Services from "./components/Services";

// Section ids (targets of the Navbar, Hero, Services and Footer anchor links):
// Services #services · Quote #quote · About #about · Reviews #reviews ·
// ServiceArea #service-area · FAQ #faq · Footer #contact · <body> #top
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Quote />
        <About />
        <Reviews />
        <ServiceArea />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
