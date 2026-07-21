import { useCallback, useEffect, useState, type MouseEvent } from "react";

import { InitialLoader } from "./components/InitialLoader/InitialLoader";
import { ContactModal } from "./components/ContactModal";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Brands } from "./sections/Brands";
import { Pillars } from "./sections/Pillars";
import { Problem } from "./sections/Problem";
import { Services } from "./sections/Services";
import { Process } from "./sections/Process";
import { CaseStudies } from "./sections/CaseStudies";
import { ClientShowcaseSlider } from "./sections/ClientShowcaseSlider";
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
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSiteClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const link = (event.target as HTMLElement).closest("a");

    if (!link) {
      return;
    }

    const href = link.getAttribute("href");

    if (link.target === "_blank") {
      return;
    }

    const label = link.textContent?.toLowerCase() ?? "";
    const shouldOpenContact =
      href === "#contact" ||
      href === "mailto:hello@postclicklab.com" ||
      label.includes("contact") ||
      label.includes("contato") ||
      label.includes("start") ||
      label.includes("project") ||
      label.includes("book") ||
      label.includes("call") ||
      label.includes("schedule") ||
      label.includes("discuss") ||
      label.includes("iniciar") ||
      label.includes("projeto");

    if (shouldOpenContact) {
      event.preventDefault();
      setIsContactOpen(true);
      return;
    }

    if (!href?.startsWith("/")) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", href);
    setCurrentPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const caseStudySlug = currentPath.startsWith("/case-studies/")
    ? currentPath.split("/").filter(Boolean).at(-1)
    : undefined;
  const isWorkPage = currentPath === "/work" || Boolean(caseStudySlug);

  return (
    <>
      {isLoading && (
        <InitialLoader
          duration={2100}
          onComplete={handleLoaderComplete}
        />
      )}

      <div
        className={`site-shell${isLoading ? "" : " is-visible"}`}
        onClick={handleSiteClick}
      >
        <Header />

        {isWorkPage ? (
          <main className="work-page">
            <CaseStudies activeSlug={caseStudySlug} />
            <FinalCta />
          </main>
        ) : (
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
                <Services />
              </div>

              <div className="scroll-stack__section">
                <Process />
              </div>

              <div className="scroll-stack__section">
                <ClientShowcaseSlider />
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
        )}

        <Footer />
      </div>

      {!isLoading && (
        <button
          className="sticky-cta"
          type="button"
          onClick={() => setIsContactOpen(true)}
        >
          Contact Us
        </button>
      )}

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
