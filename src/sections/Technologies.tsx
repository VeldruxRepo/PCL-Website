import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";

export function Technologies() {
  return <section className="technologies" id="resources"><Container><span className="eyebrow">PLATFORMS & TECHNOLOGIES</span><div>{data.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></Container></section>;
}
