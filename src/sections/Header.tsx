import data from "../data/site-content.json";
import { Arrow } from "../components/ui/Arrow";
import { Container } from "../components/ui/Container";

export function Header() {
  return (
    <>
      <div className="announcement">
        <span>{data.announcement.text} </span>
        <a href={data.announcement.link.href}>{data.announcement.link.label}</a>
      </div>
      <header className="site-header">
        <Container className="site-header__inner">
          <a className="logo" href="#top" aria-label="PCL home"><span>P</span><span>C</span><span>L</span></a>
          <nav aria-label="Primary navigation">
            {data.navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
          </nav>
          <a className="button button--dark header-cta" href="#contact">Book a Call <Arrow /></a>
        </Container>
      </header>
    </>
  );
}
