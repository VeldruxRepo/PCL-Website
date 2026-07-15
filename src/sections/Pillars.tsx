import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";

export function Pillars() {
  return <section className="pillars"><Container className="pillars__grid">{data.pillars.map((item) => <article key={item.title}><span className="pillars__icon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</Container></section>;
}
