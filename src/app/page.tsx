import Link from "next/link";
import { Figure } from "@/components/Figure";
import { Collection } from "@/components/Collection";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Stars } from "@/components/Stars";
import { countInWords, flagshipIndex, pieceNumber, pieces } from "@/content/pieces";

export default function Home() {
  const featured = pieces[flagshipIndex];
  const count = pieces.length;
  const countWord = countInWords(count);

  return (
    <>
      <SiteHeader />

      <main>
        <section className="wrap">
          <div className="hero">
            <div className="hero__copy">
              <span className="eyebrow">The Little Wow Collection</span>
              <h1 className="hero__title">
                Air, held <br />
                in <em>shape.</em>
              </h1>
              <p className="hero__lede">
                {countWord} balloon sculptures, twisted by hand in Melbourne and shown one at a time, the way a
                jeweller shows a stone.
              </p>
              <a href="#collection" className="cta">
                <span>Enter the collection</span>
                <span className="cta__line" aria-hidden="true" />
              </a>
            </div>

            <Link
              href={`/pieces/${featured.slug}`}
              className="stage stage--hero"
              aria-label={`${featured.name}, No. ${pieceNumber(flagshipIndex)}`}
            >
              <div className="stage__floor" aria-hidden="true" />
              <div className="stage__box">
                <Figure piece={featured} priority />
              </div>
              <div className="stage__caption">
                <span className="no">No. {pieceNumber(flagshipIndex)}</span>
                <Stars value={featured.difficulty} />
                <span className="stage__name">{featured.name}</span>
                {featured.nameZh && (
                  <span className="zh" lang="zh-Hans">
                    {featured.nameZh}
                  </span>
                )}
              </div>
            </Link>
          </div>

          <div className="hero__meta">
            <span>Scroll</span>
            <span>
              {count} pieces · Melbourne
            </span>
          </div>
        </section>

        <section id="collection" className="collection wrap">
          <div className="section-head">
            <div className="section-head__title">
              <span className="eyebrow">The Collection</span>
              <h2 className="section-title">{countWord} pieces</h2>
            </div>
            <p>Choose a piece to see it up close. The stars beside each number say how hard it is to make.</p>
          </div>

          <Collection />
        </section>

        <section id="about" className="wrap">
          <div className="about">
            <div className="about__lead">
              <span className="eyebrow">About</span>
              <p className="about__statement">It starts with a straight line of latex and a breath of air.</p>
            </div>
            <div className="about__body">
              <p>
                Little Wow is a personal collection of balloon sculptures, made in Melbourne. Each piece is
                photographed on its own, against the dark, so the colour and the twist are all there is to look at.
              </p>
              <p>Films of the making are on their way, one piece at a time.</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
