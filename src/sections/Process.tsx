import { useEffect, useMemo, useRef, useState } from "react";

import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const processRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<number | null>(null);

  const progress =
    data.process.steps.length <= 1
      ? 1
      : activeStep / (data.process.steps.length - 1);

  const nextStep = useMemo(() => {
    return data.process.steps[(activeStep + 1) % data.process.steps.length];
  }, [activeStep]);

  useEffect(() => {
    const viewport = processRef.current;

    if (!viewport) {
      return;
    }

    let animationFrameId = 0;

    const steps = Array.from(
      viewport.querySelectorAll<HTMLElement>(".process-loop__step"),
    );

    const getClosestStepIndex = () => {
      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenter = viewportRect.top + viewport.clientHeight / 2;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      steps.forEach((step, index) => {
        const stepRect = step.getBoundingClientRect();
        const stepCenter = stepRect.top + stepRect.height / 2;
        const distance = Math.abs(stepCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const updateActiveStep = () => {
      setActiveStep(getClosestStepIndex());
    };

    const snapToClosestStep = () => {
      const closestIndex = getClosestStepIndex();
      const closestStep = steps[closestIndex];

      if (!closestStep) {
        return;
      }

      viewport.scrollTo({
        top: closestStep.offsetTop,
        behavior: "smooth",
      });

      setActiveStep(closestIndex);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateActiveStep);

      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }

      scrollEndTimerRef.current = window.setTimeout(
        snapToClosestStep,
        110,
      );
    };

    const onResize = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateActiveStep);
    };

    viewport.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onResize, {
      passive: true,
    });

    updateActiveStep();

    return () => {
      window.cancelAnimationFrame(animationFrameId);

      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }

      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollToStep = (index: number) => {
    const viewport = processRef.current;
    const step = viewport?.querySelectorAll<HTMLElement>(
      ".process-loop__step",
    )[index];

    if (!viewport || !step) {
      return;
    }

    viewport.scrollTo({
      top: step.offsetTop,
      behavior: "smooth",
    });

    setActiveStep(index);
  };

  return (
    <section className="section process-loop">
      <Container>
        <div className="process-loop__layout">
          <div className="process-loop__intro">
            <span className="eyebrow eyebrow--accent">
              {data.process.eyebrow}
            </span>

            <h2>{data.process.title}</h2>

            <p>{data.process.description}</p>

            <div className="process-loop__status">
              <span>
                {String(activeStep + 1).padStart(2, "0")}
                {" / "}
                {String(data.process.steps.length).padStart(2, "0")}
              </span>

              <strong>{data.process.steps[activeStep]?.title}</strong>
            </div>
          </div>

          <div className="process-loop__visual">
            <div className="process-loop__toolbar">
              <div>
                <span className="process-loop__toolbar-dot" />
                <span>PROCESS LOOP</span>
              </div>

              <div className="process-loop__scroll-hint">
                <span className="process-loop__mouse">
                  <i />
                </span>
                Scroll to explore
              </div>
            </div>

            <div className="process-loop__body">
              <nav
                className="process-loop__nav"
                aria-label="Process steps"
              >
                {data.process.steps.map((step, index) => (
                  <button
                    className={
                      index === activeStep ? "is-active" : ""
                    }
                    key={step.title}
                    onClick={() => scrollToStep(index)}
                    type="button"
                    aria-label={`Go to ${step.title}`}
                  >
                    <span>{step.number}</span>
                    <i />
                  </button>
                ))}
              </nav>

              <div className="process-loop__viewport" ref={processRef}>
                <div className="process-loop__track" aria-hidden="true">
                  <span
                    style={{
                      transform: `scaleY(${progress})`,
                    }}
                  />
                </div>

                <div className="process-loop__steps">
                  {data.process.steps.map((step, index) => (
                    <article
                      className={`process-loop__step${
                        index === activeStep ? " is-active" : ""
                      }`}
                      key={step.title}
                    >
                      <div className="process-loop__marker">
                        <span>{step.number}</span>
                        <i />
                      </div>

                      <div className="process-loop__content">
                        <span className="process-loop__phase">
                          {step.phase}
                        </span>

                        <h3>{step.title}</h3>
                        <p>{step.description}</p>

                        <div className="process-loop__outcome">
                          {step.outcome}
                        </div>
                      </div>
                    </article>
                  ))}

                  <div className="process-loop__return">
                    <span>↺</span>
                    <p>{data.process.loopLabel}</p>
                  </div>
                </div>
              </div>

              <div className="process-loop__edge-fade process-loop__edge-fade--top" />
              <div className="process-loop__edge-fade process-loop__edge-fade--bottom" />
            </div>

            <button
              className="process-loop__next"
              onClick={() =>
                scrollToStep(
                  (activeStep + 1) % data.process.steps.length,
                )
              }
              type="button"
            >
              <span>NEXT STEP</span>

              <strong>{nextStep.title}</strong>

              <i>
                <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  viewBox="0 0 12 16"
                >
                  <path
                    d="M6 1v13M1.5 9.5 6 14l4.5-4.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                </svg>
              </i>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
