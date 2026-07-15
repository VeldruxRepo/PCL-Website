import data from "../data/site-content.json";
import { Arrow } from "../components/ui/Arrow";
import { Container } from "../components/ui/Container";

type ServiceIconProps = {
  name: string;
};

function ServiceIcon({ name }: ServiceIconProps) {
  const commonProps = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const icons: Record<string, React.ReactNode> = {
    optimize: (
      <>
        <path d="M4 17l5-5 4 3 7-8" />
        <path d="M15 7h5v5" />
      </>
    ),
    landing: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="1.5" />
        <path d="M4 9h16" />
        <path d="M8 13h4" />
        <path d="M8 16h8" />
      </>
    ),
    design: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1" />
        <rect x="13" y="4" width="7" height="7" rx="1" />
        <rect x="4" y="13" width="16" height="7" rx="1" />
      </>
    ),
    code: (
      <>
        <path d="M9 7l-5 5 5 5" />
        <path d="M15 7l5 5-5 5" />
        <path d="M13 4l-2 16" />
      </>
    ),
    shopify: (
      <>
        <path d="M6 8h12l-1 12H7L6 8z" />
        <path d="M9 8V6a3 3 0 016 0v2" />
        <path d="M10 13c1.3-1 3.6-.8 4.4.4.8 1.3-.1 3-2.4 3.2-1.1.1-2-.2-2.6-.7" />
      </>
    ),
    webflow: (
      <>
        <path d="M3 7l4 10 4-7 3 7 7-10" />
        <path d="M7 17h10" />
      </>
    ),
    experiment: (
      <>
        <path d="M9 3h6" />
        <path d="M10 3v5l-5 9a2 2 0 001.8 3h10.4A2 2 0 0019 17l-5-9V3" />
        <path d="M8 15h8" />
      </>
    ),
    funnel: (
      <>
        <path d="M4 5h16l-6 7v5l-4 2v-7L4 5z" />
      </>
    ),
    copy: (
      <>
        <path d="M5 5h14v14H5z" />
        <path d="M8 9h8" />
        <path d="M8 13h6" />
        <path d="M8 16h4" />
      </>
    ),
    strategy: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3" />
        <path d="M22 12h-3" />
      </>
    ),
    react: (
      <>
        <ellipse cx="12" cy="12" rx="9" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
      </>
    ),
    analytics: (
      <>
        <path d="M5 19V9" />
        <path d="M10 19V5" />
        <path d="M15 19v-7" />
        <path d="M20 19V3" />
      </>
    ),
  };

  return <svg {...commonProps}>{icons[name] ?? icons.optimize}</svg>;
}

export function Services() {
  return (
    <section className="section services" id="services">
      <Container>
        <div className="services__header">
          <div className="services__heading">
            <span className="eyebrow eyebrow--accent">SERVICES</span>

            <h2>
              Everything your
              <br />
              <em>post-click growth</em>
              <br />
              system needs.
            </h2>
          </div>

          <div className="services__intro">
            <p>
              Strategy, design, development, and experimentation working as one
              connected system—not disconnected deliverables.
            </p>

            <a className="button button--primary" href="#contact">
              Discuss your project
              <Arrow />
            </a>
          </div>
        </div>

        <div className="services__grid">
          {data.services.map((service) => (
            <article
              className={`services__card${
                service.featured ? " services__card--featured" : ""
              }${service.dark ? " services__card--dark" : ""}`}
              key={service.title}
            >
              <div className="services__card-top">
                <span className="services__number">{service.number}</span>

                <span className="services__icon">
                  <ServiceIcon name={service.icon} />
                </span>
              </div>

              <div className="services__card-content">
                <span className="services__category">{service.category}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>

              <div className="services__card-footer">
                <span>{service.outcome}</span>
                <Arrow />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}