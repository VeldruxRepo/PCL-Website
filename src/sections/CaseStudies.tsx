import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import data from "../data/site-content.json";
import { Arrow } from "../components/ui/Arrow";
import { Container } from "../components/ui/Container";

export function CaseStudies() {
  const [activeCase, setActiveCase] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const caseRefs = useRef<Array<HTMLElement | null>>([]);

  const currentCase = data.caseStudies.items[activeCase];

  const activeTheme = useMemo(() => {
    return {
      "--case-bg": currentCase?.theme.background ?? "#F5F0E8",
      "--case-fg": currentCase?.theme.foreground ?? "#1A1410",
      "--case-accent": currentCase?.theme.accent ?? "#FF5C1A",
    } as CSSProperties;
  }, [currentCase]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (firstEntry, secondEntry) =>
              secondEntry.intersectionRatio - firstEntry.intersectionRatio,
          )[0];

        if (!visibleEntry) {
          return;
        }

        const nextIndex = Number(
          (visibleEntry.target as HTMLElement).dataset.caseIndex,
        );

        if (!Number.isNaN(nextIndex)) {
          setActiveCase(nextIndex);
        }
      },
      {
        threshold: [0.35, 0.55, 0.75],
      },
    );

    caseRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToCase = (index: number) => {
    caseRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      className="case-stack"
      id="work"
      ref={sectionRef}
      style={activeTheme}
    >
      <div className="case-stack__intro">
        <Container>
          <div className="case-stack__intro-grid">
            <div>
              <span className="eyebrow eyebrow--accent">
                {data.caseStudies.eyebrow}
              </span>

              <h2>{data.caseStudies.title}</h2>
            </div>

            <p>{data.caseStudies.description}</p>
          </div>
        </Container>
      </div>

      <nav className="case-stack__nav" aria-label="Case studies">
        {data.caseStudies.items.map((caseStudy, index) => (
          <button
            className={index === activeCase ? "is-active" : ""}
            key={caseStudy.slug}
            onClick={() => scrollToCase(index)}
            type="button"
          >
            <span>{caseStudy.number}</span>
            <strong>{caseStudy.client}</strong>
          </button>
        ))}
      </nav>

      <div className="case-stack__items">
        {data.caseStudies.items.map((caseStudy, index) => {
          const caseStyle = {
            "--case-bg": caseStudy.theme.background,
            "--case-fg": caseStudy.theme.foreground,
            "--case-accent": caseStudy.theme.accent,
            "--case-index": index,
          } as CSSProperties;

          return (
            <article
              className={`case-stack__item${
                index === activeCase ? " is-active" : ""
              }`}
              data-case-index={index}
              key={caseStudy.slug}
              ref={(element) => {
                caseRefs.current[index] = element;
              }}
              style={caseStyle}
            >
              <Container>
                <div className="case-stack__panel">
                  <div className="case-stack__meta">
                    <span>{caseStudy.number}</span>
                    <span>{caseStudy.industry}</span>
                  </div>

                  <div className="case-stack__layout">
                    <div className="case-stack__content">
                      <span className="case-stack__client">
                        {caseStudy.client}
                      </span>

                      <h3>{caseStudy.headline}</h3>

                      <p className="case-stack__summary">
                        {caseStudy.summary}
                      </p>

                      <div className="case-stack__details">
                        <div>
                          <span>THE PROBLEM</span>
                          <p>{caseStudy.problem}</p>
                        </div>

                        <div>
                          <span>WHAT WE CHANGED</span>
                          <p>{caseStudy.solution}</p>
                        </div>
                      </div>

                      <div className="case-stack__tags">
                        {caseStudy.services.map((service) => (
                          <span key={service}>{service}</span>
                        ))}
                      </div>

                      <a
                        className="case-stack__link"
                        href={`#${caseStudy.slug}`}
                      >
                        View case study
                        <Arrow />
                      </a>
                    </div>

                    <div className="case-stack__visual">
                      <div className="case-stack__image">
                        <img
                          src={caseStudy.image}
                          alt={caseStudy.imageAlt}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />

                        <div className="case-stack__placeholder">
                          <span>{caseStudy.client}</span>
                          <strong>PLACE IMAGE HERE</strong>
                        </div>
                      </div>

                      <div className="case-stack__impact">
                        <span>THE IMPACT</span>
                        <p>{caseStudy.impact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="case-stack__metrics">
                    {caseStudy.metrics.map((metric) => (
                      <div key={metric.label}>
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </div>
                    ))}

                    <small>{data.caseStudies.disclaimer}</small>
                  </div>
                </div>
              </Container>
            </article>
          );
        })}
      </div>
    </section>
  );
}