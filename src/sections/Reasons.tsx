import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";
import { ImagePlaceholder } from "../components/ui/ImagePlaceholder";
import { SectionHeading } from "../components/ui/SectionHeading";

export function Reasons() {
  return <section className="section"><Container><div className="reasons-grid"><div><SectionHeading eyebrow="WHY BRANDS CHOOSE PCL" title="Specialized in the part that most agencies skip." /><div className="check-list">{data.reasons.map((reason) => <p key={reason}><span>✓</span>{reason}</p>)}</div></div><ImagePlaceholder className="reasons__image" /></div></Container></section>;
}
