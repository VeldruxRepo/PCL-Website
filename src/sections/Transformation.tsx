import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";

export function Transformation() {
  return <section className="section">
    <Container><SectionHeading eyebrow="TRANSFORMATION" title="From AI-assisted traffic to post-click systems that convert." /><div className="compare-grid"><article><h3>Before PCL</h3>  <span className="compare-grid__bridge" aria-hidden="true">
    →
  </span>{data.transformation.before.map((item) => <p key={item}><span>×</span>{item}</p>)}</article><article className="compare-grid__after"><h3>After PCL</h3>{data.transformation.after.map((item) => <p key={item}><span>✓</span>{item}</p>)}</article></div></Container></section>;
}
