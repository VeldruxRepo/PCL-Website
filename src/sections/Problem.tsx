import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";

export function Problem() {
  return (
    <section className="section" id="about">
      <Container>
        <div className="problem__grid">
          <div className="problem__content">
            <SectionHeading
              eyebrow={data.problem.eyebrow}
              title={data.problem.title}
            />

            {data.problem.paragraphs.map((paragraph, index) => (
              <p
                className={`body-copy problem__copy${
                  index === data.problem.paragraphs.length - 1
                    ? " problem__copy--closing"
                    : ""
                }`}
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="problem__cards">
            <article>
              <span className="eyebrow">BEFORE PCL</span>

              {data.problem.before.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </article>

            <span className="problem__bridge" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M12 5v14m0 0 6-6m-6 6-6-6" />
              </svg>
            </span>

            <article className="problem__card--accent">
              <span className="eyebrow">AFTER PCL</span>

              {data.problem.after.map((item) => (
                <p key={item}>{item}</p>
              ))}

              <div className="problem__outcome">
                <span>{data.problem.outcomeEyebrow}</span>
                <strong>{data.problem.outcome}</strong>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
