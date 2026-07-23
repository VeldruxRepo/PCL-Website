import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import data from "../data/site-content.json";
import { Arrow } from "../components/ui/Arrow";
import { Container } from "../components/ui/Container";

const JOURNEY_INTERVAL = 1700;

export function Hero() {
  const [activeJourneyIndex, setActiveJourneyIndex] = useState(0);
  const journeyRef = useRef<HTMLDivElement>(null);
  const journeyItemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveJourneyIndex((currentIndex) => {
        return (currentIndex + 1) % data.hero.journey.length;
      });
    }, JOURNEY_INTERVAL);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

 useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 620px)");
  const journeyElement = journeyRef.current;
  const activeItem = journeyItemRefs.current[activeJourneyIndex];

  if (!mediaQuery.matches || !journeyElement || !activeItem) {
    return;
  }

  const journeyRect = journeyElement.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();

  const itemCenter =
    itemRect.left -
    journeyRect.left +
    journeyElement.scrollLeft +
    itemRect.width / 2;

  const targetScrollLeft =
    itemCenter - journeyElement.clientWidth / 2;

  journeyElement.scrollTo({
    left: targetScrollLeft,
    behavior: "smooth",
  });
}, [activeJourneyIndex]);

  return (
    <section className="hero" id="top">
      <Container>
        <div className="hero__grid">
          <div className="hero__content">
            <span className="eyebrow eyebrow--accent">
              {data.hero.eyebrow}
            </span>

            <h1>
              {data.hero.titleBefore}
              <br />
              <em>{data.hero.titleAccent}</em>
              <br />
              {data.hero.titleAfter}
            </h1>

            <p className="hero__description">{data.hero.description}</p>

            <div className="button-row">
              {data.hero.buttons.map((button) => (
                <a
                  key={button.label}
                  className={`button button--${button.variant}`}
                  href={button.href}
                >
                  {button.label}

                  {button.variant === "primary" ? <Arrow /> : null}
                </a>
              ))}
            </div>
          </div>

         <div className="hero__image">
  <img
    src="/images/pcl-hero-banner.png"
    alt="Post Click Lab growth system"
  />
</div>
        </div>

        <div
          className="journey"
          ref={journeyRef}
          aria-label="Post-click journey"
        >
          {data.hero.journey.map((item, index) => {
            const isActive = activeJourneyIndex === index;
            const isClick = item.title.toLowerCase() === "click";
            const isConversion =
              item.title.toLowerCase() === "conversion";
            const isCompleted = index < activeJourneyIndex;

            const animationStyle = {
              "--journey-index": index,
            } as CSSProperties;

            return (
              <div
                className="journey__group"
                key={item.title}
                ref={(element) => {
                  journeyItemRefs.current[index] = element;
                }}
                style={animationStyle}
              >
                <div
                  className={[
                    "journey__item",
                    isActive ? "journey__item--active" : "",
                    isCompleted ? "journey__item--completed" : "",
                    isActive && isClick
                      ? "journey__item--clicking"
                      : "",
                    isActive && isConversion
                      ? "journey__item--converting"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className="journey__node">
                    <i />

                    {isClick ? (
                      <span
                        className="journey__click-ring"
                        aria-hidden="true"
                      />
                    ) : null}

                    {isConversion ? (
                      <span
                        className="journey__burst"
                        aria-hidden="true"
                      >
                        {Array.from({ length: 8 }).map(
                          (_, burstIndex) => (
                            <i
                              key={burstIndex}
                              style={
                                {
                                  "--burst-index": burstIndex,
                                } as CSSProperties
                              }
                            />
                          ),
                        )}
                      </span>
                    ) : null}
                  </span>

                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </div>

                {index < data.hero.journey.length - 1 ? (
                  <span
                    className={[
                      "journey__line",
                      activeJourneyIndex > index
                        ? "journey__line--active"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-hidden="true"
                  >
                    <span />
                    <b>
                      <svg
                        aria-hidden="true"
                        fill="none"
                        focusable="false"
                        viewBox="0 0 18 10"
                      >
                        <path
                          d="M1 5h15M12.5 1.5 16 5l-3.5 3.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </b>
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
