import { useState } from "react";

import data from "../data/site-content.json";
import { Arrow } from "../components/ui/Arrow";
import { Container } from "../components/ui/Container";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="announcement">
        <span>
          {data.announcement.text}
          <Arrow />
        </span>
        <a href={data.announcement.link.href}>{data.announcement.link.label}</a>
      </div>
      <header className={`site-header${isMenuOpen ? " is-menu-open" : ""}`}>
        <Container className="site-header__inner">
          <nav className="site-header__nav" aria-label="Primary navigation">
            {data.navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
          </nav>
          <a className="logo" href="/" aria-label="Post Click Lab home" onClick={closeMenu}><span>Post</span><span>Click</span><span>Lab</span></a>
          <a className="button button--dark header-cta" href="#contact">Book a Call <Arrow /></a>

          <button
            className="site-header__menu-button"
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </Container>

        <div className="site-header__mobile-panel" id="mobile-navigation">
          <Container>
            <nav aria-label="Mobile navigation">
              {data.navigation.map((item) => (
                <a key={item.label} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
              <a className="site-header__mobile-cta" href="#contact" onClick={closeMenu}>
                Book a Call
                <Arrow />
              </a>
            </nav>
          </Container>
        </div>
      </header>
    </>
  );
}
