import Link from "next/link";

const year = new Date().getUTCFullYear();

export function SiteHeader() {
  return (
    <header className="site-header wrap">
      <div className="site-header__bar">
        <Link href="/" className="wordmark">
          Little Wow
        </Link>
        <nav className="site-nav" aria-label="Main">
          <Link href="/#collection">Collection</Link>
          <Link href="/#about">About</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <div className="site-footer__bar">
        <span className="wordmark wordmark--small">Little Wow</span>
        <span className="site-footer__note">© {year} Little Wow Balloons · Melbourne</span>
      </div>
    </footer>
  );
}
