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
// ServiceArea #service-area · FAQ #faq · Footer #contact · <body> #top ·
// <main> #main (skip link)
export default function Home() {
  return (
    <>
      {/* First tab stop: lets keyboard users jump past the navigation. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-accent-ink focus:outline-2 focus:outline-offset-2 focus:outline-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
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
