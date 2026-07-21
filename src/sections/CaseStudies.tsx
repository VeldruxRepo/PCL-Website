import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

import data from "../data/site-content.json";
import { Arrow } from "../components/ui/Arrow";
import { Container } from "../components/ui/Container";
import {
  getSelectedCaseIndexBySlug,
  selectedCases,
} from "../utils/selectedCases";

type CaseStudiesProps = {
  activeSlug?: string;
};

export function CaseStudies({ activeSlug }: CaseStudiesProps) {
  const [activeCase, setActiveCase] = useState(() =>
    getSelectedCaseIndexBySlug(activeSlug),
  );
  const [imageViewer, setImageViewer] = useState<{
    alt: string;
    src: string;
  } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const caseRefs = useRef<Array<HTMLElement | null>>([]);

  const currentCase = selectedCases[activeCase];

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

  useEffect(() => {
    if (!activeSlug) {
      return;
    }

    const index = getSelectedCaseIndexBySlug(activeSlug);

    window.requestAnimationFrame(() => {
      setActiveCase(index);
      caseRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [activeSlug]);

  useEffect(() => {
    if (!imageViewer) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setImageViewer(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imageViewer]);

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

      <div className="case-stack__items">
        {selectedCases.map((caseStudy, index) => {
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
              }${caseStudy.detail ? " case-stack__item--long" : ""}`}
              data-case-index={index}
              data-case-number={caseStudy.number}
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
                        href={`/case-studies/${caseStudy.slug}`}
                      >
                        View case study
                        <Arrow />
                      </a>
                    </div>

                    <div className="case-stack__visual">
                      <div className="case-stack__image">
                        <button
                          className="case-stack__image-link"
                          type="button"
                          onClick={() =>
                            setImageViewer({
                              alt: caseStudy.imageAlt,
                              src: caseStudy.image,
                            })
                          }
                          aria-label={`Open ${caseStudy.client} image full size`}
                        >
                          <img
                            key={caseStudy.image}
                            src={caseStudy.image}
                            alt={caseStudy.imageAlt}
                            onLoad={(event) => {
                              event.currentTarget.style.display = "block";
                            }}
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        </button>

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

                  {caseStudy.detail && (
                    <div className="case-stack__deep-dive" id={caseStudy.slug}>
                      <div className="case-stack__deep-header">
                        <span>{caseStudy.detail.eyebrow}</span>
                        <h4>{caseStudy.detail.title}</h4>
                        <p>{caseStudy.detail.introduction}</p>
                      </div>

                      <div className="case-stack__deep-grid">
                        {caseStudy.detail.sections.map((section) => (
                          <div key={section.title}>
                            <span>{section.label}</span>
                            <h5>{section.title}</h5>
                            <p>{section.body}</p>
                          </div>
                        ))}
                      </div>

                      <div className="case-stack__screens">
                        {caseStudy.detail.screenshots.map((screenshot) => {
                          return (
                            <figure
                              className={`case-stack__screen case-stack__screen--${screenshot.type}`}
                              key={screenshot.src}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setImageViewer({
                                    alt: screenshot.alt,
                                    src: screenshot.src,
                                  })
                                }
                                aria-label={`Open ${screenshot.label} full size`}
                              >
                                <img
                                  key={screenshot.src}
                                  src={screenshot.src}
                                  alt={screenshot.alt}
                                />
                              </button>
                              <figcaption>
                                <span>{screenshot.label}</span>
                                {screenshot.caption}
                              </figcaption>
                            </figure>
                          );
                        })}
                      </div>

                      <div className="case-stack__decision-grid">
                        {caseStudy.detail.decisions.map((decision) => (
                          <div key={decision}>
                            <Arrow />
                            <span>{decision}</span>
                          </div>
                        ))}
                      </div>

                      <div className="case-stack__journey">
                        <span>{caseStudy.detail.journey.label}</span>
                        <p>{caseStudy.detail.journey.body}</p>
                      </div>

                      <div className="case-stack__takeaway">
                        <span>{caseStudy.detail.takeaway.label}</span>
                        <p>{caseStudy.detail.takeaway.body}</p>
                        <a href="#contact">
                          Start a post-click project
                          <Arrow />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </Container>
            </article>
          );
        })}
      </div>

      {imageViewer &&
        createPortal(
          <div className="image-viewer" role="dialog" aria-modal="true">
            <button
              className="image-viewer__backdrop"
              type="button"
              onClick={() => setImageViewer(null)}
              aria-label="Close image viewer"
            />
            <div className="image-viewer__frame">
              <button
                className="image-viewer__close"
                type="button"
                onClick={() => setImageViewer(null)}
                aria-label="Close image viewer"
              >
                ×
              </button>
              <img
                key={imageViewer.src}
                src={imageViewer.src}
                alt={imageViewer.alt}
              />
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
