import { Arrow } from "../components/ui/Arrow";
import { Container } from "../components/ui/Container";

export function FinalCta() {
  return <section className="final-cta" id="contact"><Container><span className="eyebrow">START A PROJECT</span><h2>Your next click should lead<br /><em>somewhere better.</em></h2><p>Let's turn your traffic into a clearer, faster, and higher-converting experience. Tell us what you're working on.</p><div className="button-row"><a className="button button--light" href="mailto:hello@postclicklab.com">Start a project <Arrow /></a><a className="button button--outline-light" href="#services">See how we work</a></div></Container></section>;
}
