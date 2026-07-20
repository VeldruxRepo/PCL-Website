import data from "../data/site-content.json";
import { Container } from "../components/ui/Container";

export function Footer() {
  return <footer className="footer"><Container><div className="footer__grid"><div><a className="logo logo--footer" href="/"><span>Post</span><span>Click</span><span>Lab</span></a><p>{data.footer.description}</p><a href={`mailto:${data.footer.email}`}>{data.footer.email}</a></div>{data.footer.groups.map((group) => <div key={group.title}><strong>{group.title}</strong>{group.links.map((link) => <a key={link} href="#top">{link}</a>)}</div>)}</div><div className="footer__bottom"><span>© 2025 PCL — Post Click Lab. All rights reserved.</span><div><a href="#top">Privacy</a><a href="#top">Terms</a></div></div></Container></footer>;
}
