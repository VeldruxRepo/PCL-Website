import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";

export function Experiments() {
  return (
    <section className="section section--dark">
      <Container>
        <SectionHeading
          eyebrow="EXPERIMENTATION"
          title="Every assumption is a hypothesis."
          description="We combine qualitative insight, behavioral data, strategic thinking, design, and development to create experiments that produce useful learning — not noise."
        />

        <div className="experiment-grid">
          {data.experiments.map((experiment) => (
            <article key={experiment.hypothesis}>
              <div className="experiment__top">
                <span>{experiment.status}</span>
                <strong>{experiment.lift}</strong>
              </div>
              <h3>{experiment.hypothesis}</h3>
              <div className="experiment__variants">
                {experiment.variants.map((variant, index) => (
                  <p key={variant}>
                    <span>VAR {index === 0 ? "A" : "B"}</span>
                    {variant}
                  </p>
                ))}
              </div>
              <footer>
                <span>CONFIDENCE</span>
                <strong>{experiment.confidence}</strong>
              </footer>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
