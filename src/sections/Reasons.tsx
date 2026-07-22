import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";

export function Reasons() {
  return (
    <section className="section">
      <Container>
        <div className="reasons-grid">
          <div>
            <SectionHeading
              eyebrow="WHY BRANDS CHOOSE PCL"
              title="Specialized in the part that most agencies skip."
            />
            <div className="check-list">
              {data.reasons.map((reason) => (
                <p key={reason}>
                  <span>✓</span>
                  {reason}
                </p>
              ))}
            </div>
          </div>
          <img
            className="reasons__image"
            src="/images/pcl-machine-new-transparent.png?v=20260722"
            alt="PCL conversion optimization machine with testing, design and analytics modules"
          />
        </div>
      </Container>
    </section>
  );
}
