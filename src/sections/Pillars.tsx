import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";

export function Pillars() {
  return (
    <section className="pillars">
      <Container className="pillars__grid">
        {data.pillars.map((item, index) => (
          <article key={item.title}>
            <div className="pillars__meta">
              <span className="pillars__icon">{item.icon}</span>
              <span className="pillars__index">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}
