import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";

export function Brands() {
  return <section className="brands"><Container><span className="eyebrow">TRUSTED BY E-COMMERCE BRANDS</span><div className="brands__list">{data.brands.map((brand) => <span key={brand}>{brand}</span>)}</div></Container></section>;
}
