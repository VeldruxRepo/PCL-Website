import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";

export function System() {
  return <section className="section section--dark"><Container><SectionHeading eyebrow="THE POST-CLICK SYSTEM" title="The click is only the beginning. We engineer what comes next." /><div className="system-grid">{data.system.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3>{step.items.map((item) => <p key={item}>{item}</p>)}</article>)}</div></Container></section>;
}
