import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";

const brandLogos: Record<string, { src: string; className?: string }> = {
  IVER: { src: "/images/iver-logo.jpeg", className: "brand-logo--iver" },
  ClickNShip: { src: "/images/clicknship-logo.jpeg", className: "brand-logo--clicknship" },
  IVERUSA: { src: "/images/iverusa-logo.webp", className: "brand-logo--iverusa" },
  Veganic: { src: "/images/veganic-logo.jpeg", className: "brand-logo--veganic" },
};

export function Brands() {
  return (
    <section className="brands">
      <Container className="brands__inner">
        <span className="eyebrow">TRUSTED BY E-COMMERCE BRANDS</span>
        <div className="brands__list">
          {data.brands.map((brand) => {
            const logo = brandLogos[brand];

            return (
              <div className="brands__item" key={brand}>
                {logo ? (
                  <img
                    alt={`${brand} logo`}
                    className={logo.className}
                    decoding="async"
                    loading="lazy"
                    src={logo.src}
                  />
                ) : (
                  <span className="brands__wordmark">{brand}</span>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
