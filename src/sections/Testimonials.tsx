import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Arrow } from "../components/ui/Arrow";

export function Testimonials() {
  const testimonialItems = [...data.testimonials, ...data.testimonials];

  return (
    <section className="section section--muted">
      <Container>
        <div className="testimonials__header">
          <SectionHeading
            eyebrow="TESTIMONIALS"
            title="From brands that needed more than traffic."
          />
          <a className="testimonials__cta" href="/reviews">
            View more founder reviews <Arrow />
          </a>
        </div>

        <div className="testimonial-grid">
          {testimonialItems.map((testimonial, index) => (
            <article
              key={`${testimonial.quote}-${index}`}
              aria-hidden={index >= data.testimonials.length}
            >
              <span className="quote">“</span>
              <blockquote>{testimonial.quote}</blockquote>
              <div>
                <strong>{testimonial.role}</strong>
                <span>{testimonial.company}</span>
              </div>
              <p>{testimonial.result}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
