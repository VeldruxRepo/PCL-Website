import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";

type ImprovementIconProps = {
  name: string;
};

function ImprovementIcon({ name }: ImprovementIconProps) {
  const commonProps = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "message":
      return (
        <svg {...commonProps}>
          <path d="M5 5.5h14v9H9l-4 4v-13Z" />
          <path d="M8.5 9h7" />
          <path d="M8.5 12h4.5" />
        </svg>
      );
    case "layout":
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="M4 9h16" />
          <path d="M10 9v11" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...commonProps}>
          <rect x="7" y="3" width="10" height="18" rx="2" />
          <path d="M10.5 6h3" />
          <circle cx="12" cy="17.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      );
    case "speed":
      return (
        <svg {...commonProps}>
          <path d="m13.5 2-7 11h5l-1 9 7-12h-5l1-8Z" />
        </svg>
      );
    case "funnel":
      return (
        <svg {...commonProps}>
          <path d="M4 5h16l-6.5 7.5V19l-3 1.5v-8L4 5Z" />
        </svg>
      );
    case "conversion":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="m8.5 12 2.25 2.25L15.5 9.5" />
        </svg>
      );
    case "experiment":
      return (
        <svg {...commonProps}>
          <path d="M9 3h6" />
          <path d="M10 3v5l-5 9a2 2 0 0 0 1.75 3h10.5A2 2 0 0 0 19 17l-5-9V3" />
          <path d="M8 14h8" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <path d="M4 19V9" />
          <path d="M10 19V5" />
          <path d="M16 19v-7" />
          <path d="M3 19h18" />
        </svg>
      );
  }
}

export function Improvements() {
  return (
    <section className="section section--muted improvements" id="improvements">
      <Container>
        <SectionHeading
          eyebrow={data.improvements.eyebrow}
          title={data.improvements.title}
        />

        <div className="feature-grid improvements__grid">
          {data.improvements.items.map((item, index) => (
            <article
              className={item.featured ? "improvements__card--featured" : ""}
              key={item.title}
            >
              <div className="improvements__card-top">
                <span className="improvements__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="improvements__icon">
                  <ImprovementIcon name={item.icon} />
                </span>
              </div>

              <div className="improvements__card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}