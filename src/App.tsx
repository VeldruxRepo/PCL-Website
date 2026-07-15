import { useCallback, useState } from "react";

import { InitialLoader } from "./components/InitialLoader/InitialLoader";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Brands } from "./sections/Brands";
import { Pillars } from "./sections/Pillars";
import { Problem } from "./sections/Problem";
import { Improvements } from "./sections/Improvements";
import { Services } from "./sections/Services";
import { System } from "./sections/System";
import { Process } from "./sections/Process";
import { CaseStudies } from "./sections/CaseStudies";
import { Transformation } from "./sections/Transformation";
import { Experiments } from "./sections/Experiments";
import { Technologies } from "./sections/Technologies";
import { Reasons } from "./sections/Reasons";
import { Testimonials } from "./sections/Testimonials";
import { Impact } from "./sections/Impact";
import { Faq } from "./sections/Faq";
import { FinalCta } from "./sections/FinalCta";
import { Footer } from "./sections/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && (
        <InitialLoader
          duration={3200}
          onComplete={handleLoaderComplete}
        />
      )}

      <div className={`site-shell${isLoading ? "" : " is-visible"}`}>
        <Header />

        <main>
          <div className="scroll-stack">
            <div className="scroll-stack__section scroll-stack__section--hero">
              <Hero />
            </div>

            <div className="scroll-stack__section">
              <Brands />
              <Pillars />
            </div>

            <div className="scroll-stack__section">
              <Problem />
            </div>

            <div className="scroll-stack__section">
              <Improvements />
            </div>

            <div className="scroll-stack__section">
              <Services />
            </div>

            <div className="scroll-stack__section scroll-stack__section--dark">
              <System />
            </div>

            <div className="scroll-stack__section">
              <Process />
            </div>

            <div className="scroll-stack__section">
              <CaseStudies />
            </div>

            <div className="scroll-stack__section">
              <Transformation />
            </div>

            <div className="scroll-stack__section scroll-stack__section--dark">
              <Experiments />
            </div>

            <div className="scroll-stack__section">
              <Technologies />
              <Reasons />
            </div>

            <div className="scroll-stack__section">
              <Testimonials />
            </div>

            <div className="scroll-stack__section scroll-stack__section--accent">
              <Impact />
            </div>
          </div>

          <div className="normal-scroll">
            <Faq />
            <FinalCta />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}