import { useMemo, useState, type CSSProperties } from "react";

import { Arrow } from "../components/ui/Arrow";
import { Container } from "../components/ui/Container";
import { selectedCases } from "../utils/selectedCases";

type CasePreview = {
  image?: string;
  imageAlt?: string;
  imageFit?: "contain";
  industry: string;
  headline: string;
  summary: string;
  services?: string[];
};

export function ClientShowcaseSlider() {
  const featuredCases = selectedCases;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = featuredCases[activeIndex];
  const activePreview = (activeCase.preview ?? activeCase) as CasePreview;
  const activeImage = activePreview.image ?? activeCase.image;
  const activeImageAlt = activePreview.imageAlt ?? activeCase.imageAlt;

  const activeTheme = useMemo(() => {
    return {
      "--showcase-bg": activeCase.theme.background,
      "--showcase-fg": activeCase.theme.foreground,
      "--showcase-accent": activeCase.theme.accent,
    } as CSSProperties;
  }, [activeCase]);

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? featuredCases.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === featuredCases.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <section className="client-showcase" id="work" style={activeTheme}>
      <Container>
        <div className="client-showcase__header">
          <div>
            <span className="eyebrow eyebrow--accent">CLIENT SHOWCASE</span>
            <h2>Selected post-click systems in motion.</h2>
          </div>

          <a className="client-showcase__page-link" href="/work">
            View full systems page
            <Arrow />
          </a>
        </div>

        <div className="client-showcase__slider">
          <div
            className={`client-showcase__visual${
              activePreview.imageFit === "contain"
                ? " client-showcase__visual--contain"
                : ""
            }`}
          >
            <img
              key={activeImage}
              src={activeImage}
              alt={activeImageAlt}
              onLoad={(event) => {
                event.currentTarget.style.display = "block";
              }}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <div className="client-showcase__visual-fallback">
              <span>{activeCase.client}</span>
            </div>
          </div>

          <div className="client-showcase__content">
            <div className="client-showcase__meta">
              <span>{activeCase.number}</span>
              <span>{activePreview.industry}</span>
            </div>

            <span className="client-showcase__client">{activeCase.client}</span>
            <h3>{activePreview.headline}</h3>
            <p>{activePreview.summary}</p>

            <div className="client-showcase__tags">
              {(activePreview.services ?? activeCase.services).map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>

            <div className="client-showcase__metrics">
              {activeCase.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <a
              className="client-showcase__case-link"
              href={`/case-studies/${activeCase.slug}`}
            >
              View case study
              <Arrow />
            </a>

            <div className="client-showcase__controls">
              <button type="button" onClick={goToPrevious} aria-label="Previous case">
                Prev
              </button>
              <div aria-label="Case slides">
                {featuredCases.map((caseStudy, index) => (
                  <button
                    className={index === activeIndex ? "is-active" : ""}
                    key={caseStudy.slug}
                    onClick={() => setActiveIndex(index)}
                    type="button"
                    aria-label={`Show ${caseStudy.client}`}
                  />
                ))}
              </div>
              <button type="button" onClick={goToNext} aria-label="Next case">
                Next
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
