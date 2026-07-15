import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";

export function Impact() {
  return <section className="impact"><Container><span className="eyebrow">ILLUSTRATIVE IMPACT — NOT GUARANTEED RESULTS</span><div>{data.impact.map((metric) => <article key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span><small>Illustrative example</small></article>)}</div></Container></section>;
}
