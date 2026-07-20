import { useMemo, useState, type CSSProperties } from "react";

import data from "../data/site-content.json";
import { Arrow } from "../components/ui/Arrow";
import { Container } from "../components/ui/Container";

export function ClientShowcaseSlider() {
  const featuredCases = data.caseStudies.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = featuredCases[activeIndex];

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
          <div className="client-showcase__visual">
            <img
              src={activeCase.image}
              alt={activeCase.imageAlt}
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
              <span>{activeCase.industry}</span>
            </div>

            <span className="client-showcase__client">{activeCase.client}</span>
            <h3>{activeCase.headline}</h3>
            <p>{activeCase.summary}</p>

            <div className="client-showcase__metrics">
              {activeCase.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

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
