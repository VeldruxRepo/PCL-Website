import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";

export function Transformation() {
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow="TRANSFORMATION"
          title="From AI-assisted traffic to post-click systems that convert."
        />

        <div className="compare-grid">
          <article>
            <h3>Before PCL</h3>
            <span className="compare-grid__bridge" aria-hidden="true">
              <svg fill="none" focusable="false" viewBox="0 0 18 10">
                <path
                  d="M1 5h15M12.5 1.5 16 5l-3.5 3.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
            {data.transformation.before.map((item) => (
              <p key={item}>
                <span>×</span>
                {item}
              </p>
            ))}
          </article>

          <article className="compare-grid__after">
            <h3>After PCL</h3>
            {data.transformation.after.map((item) => (
              <p key={item}>
                <span>✓</span>
                {item}
              </p>
            ))}
          </article>
        </div>
      </Container>
    </section>
  );
}
