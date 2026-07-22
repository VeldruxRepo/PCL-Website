import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";

export function Impact() {
  return (
    <section className="impact">
      <Container>
        <div className="impact__header">
          <span className="eyebrow">POST-CLICK IMPACT</span>
          <h2>What better post-click systems are built to influence.</h2>
          <p>
            Better pages, sharper offers, cleaner journeys, and faster testing cycles compound
            into measurable commercial momentum.
          </p>
        </div>

        <div className="impact__grid">
          {data.impact.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>Post-click metric</small>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
