import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";

const brandLogos: Record<string, { src: string; className?: string }> = {
  Assence: { src: "/images/logos/assence.svg", className: "brand-logo--assence" },
  IVER: { src: "/images/logos/iver.svg", className: "brand-logo--iver" },
  ClickNShip: { src: "/images/logos/clicknship-black.png", className: "brand-logo--clicknship" },
  IVERUSA: { src: "/images/logos/iverusa.svg", className: "brand-logo--iverusa" },
  Veganic: { src: "/images/logos/veganic.webp", className: "brand-logo--veganic" },
};

export function Brands() {
  const brandItems = [...data.brands, ...data.brands];

  return (
    <section className="brands">
      <Container className="brands__inner">
        <span className="eyebrow">TRUSTED BY E-COMMERCE BRANDS</span>
        <div className="brands__list">
          {brandItems.map((brand, index) => {
            const logo = brandLogos[brand];
            const isDuplicate = index >= data.brands.length;

            return (
              <div
                className="brands__item"
                key={`${brand}-${index}`}
                aria-hidden={isDuplicate}
              >
                {logo ? (
                  <img
                    alt={`${brand} logo`}
                    className={logo.className}
                    decoding="async"
                    loading="lazy"
                    src={`${logo.src}?v=20260722`}
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
