import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";

export function Testimonials() {
  return <section className="section section--muted"><Container><SectionHeading eyebrow="TESTIMONIALS — ILLUSTRATIVE EXAMPLES" title="From brands that needed more than traffic." /><div className="testimonial-grid">{data.testimonials.map((testimonial) => <article key={testimonial.quote}><span className="quote">“</span><blockquote>{testimonial.quote}</blockquote><div><strong>{testimonial.role}</strong><span>{testimonial.company}</span></div><p>{testimonial.result}</p></article>)}</div></Container></section>;
}
