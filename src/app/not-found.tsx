import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="wrap missing">
        <span className="eyebrow">Not in the collection</span>
        <h1 className="section-title">This plinth is empty.</h1>
        <Link href="/#collection" className="cta">
          <span>Back to the collection</span>
          <span className="cta__line" aria-hidden="true" />
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
