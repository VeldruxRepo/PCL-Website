import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";

export function Faq() {
  return <section className="section"><Container><div className="faq-grid"><div><SectionHeading eyebrow="FAQ" title="Common questions, clear answers." /><p>Have a question not listed here?</p><a className="text-link" href="mailto:hello@postclicklab.com">Reach out directly →</a></div><div className="faq-list">{data.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></div></Container></section>;
}
