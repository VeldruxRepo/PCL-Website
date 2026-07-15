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
          <nav aria-label="Primary navigation">
            {data.navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
          </nav>
          <a className="logo" href="#top" aria-label="Post Click Lab home"><span>Post</span><span>Click</span><span>Lab</span></a>
          <a className="button button--dark header-cta" href="#contact">Book a Call <Arrow /></a>
        </Container>
      </header>
    </>
  );
}
