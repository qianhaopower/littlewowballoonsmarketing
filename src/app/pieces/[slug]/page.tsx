import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KeyNav } from "@/components/KeyNav";
import { PieceStage } from "@/components/PieceStage";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Stars } from "@/components/Stars";
import { difficultyName, findPiece, pieceNumber, pieces } from "@/content/pieces";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return pieces.map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = findPiece(slug);
  if (!found) return {};
  return {
    title: `${found.piece.name}, No. ${pieceNumber(found.index)}`,
    description: found.piece.note,
  };
}

export default async function PiecePage({ params }: Props) {
  const { slug } = await params;
  const found = findPiece(slug);
  if (!found) notFound();

  const { piece, index, previous, next } = found;
  const hasMaking = Boolean(piece.film || piece.steps?.length);

  return (
    <>
      <SiteHeader />
      <KeyNav previous={`/pieces/${previous.piece.slug}`} next={`/pieces/${next.piece.slug}`} />

      <main className="wrap">
        <div className="crumbs">
          <Link href="/#collection" className="back">
            <svg aria-hidden="true" width="28" height="9" viewBox="0 0 28 9" fill="none" stroke="currentColor">
              <path d="M28 4.5H1M5 0.5l-4 4 4 4" />
            </svg>
            <span>The Collection</span>
          </Link>
          <span className="count">
            {pieceNumber(index)} / {pieceNumber(pieces.length - 1)}
          </span>
        </div>

        <article className="piece">
          <PieceStage piece={piece} />

          <div className="piece__label">
            <span className="eyebrow">No. {pieceNumber(index)}</span>
            <div className="piece__heading">
              <h1 className="piece__title">{piece.name}</h1>
              {piece.nameZh && (
                <span className="piece__zh" lang="zh-Hans">
                  {piece.nameZh}
                </span>
              )}
            </div>
            <p className="piece__note">{piece.note}</p>

            <dl className="spec">
              <div className="spec__row">
                <dt>Form</dt>
                <dd>{piece.form}</dd>
              </div>
              <div className="spec__row">
                <dt>Difficulty</dt>
                <dd>
                  <Stars value={piece.difficulty} />
                  {difficultyName(piece.difficulty)}
                </dd>
              </div>
              <div className="spec__row">
                <dt>Palette</dt>
                <dd>
                  <span className="swatches" aria-hidden="true">
                    {piece.palette.swatches.map((colour) => (
                      <i key={colour} style={{ background: colour }} />
                    ))}
                  </span>
                  {piece.palette.name}
                </dd>
              </div>
              <div className="spec__row">
                <dt>Medium</dt>
                <dd>Latex and air, twisted by hand</dd>
              </div>
              {piece.balloons && (
                <div className="spec__row">
                  <dt>Balloons</dt>
                  <dd>{piece.balloons}</dd>
                </div>
              )}
              {piece.time && (
                <div className="spec__row">
                  <dt>Time</dt>
                  <dd>{piece.time}</dd>
                </div>
              )}
              <div className="spec__row">
                <dt>Film</dt>
                {piece.film ? (
                  <dd>
                    <a href="#making" className="spec__link">
                      Watch the making
                    </a>
                  </dd>
                ) : (
                  <dd className="is-pending">In preparation</dd>
                )}
              </div>
            </dl>
          </div>
        </article>

        {hasMaking && (
          <section id="making" className="making">
            <div className="section-head">
              <div className="section-head__title">
                <span className="eyebrow">The Making</span>
                <h2 className="section-title">From a straight line</h2>
              </div>
              <p>Watch the piece come together, then follow the steps at your own pace.</p>
            </div>

            {piece.film && (
              <video
                className="making__film"
                src={piece.film.src}
                poster={piece.film.poster}
                controls
                playsInline
                preload="metadata"
              />
            )}

            {piece.steps && piece.steps.length > 0 && (
              <ol className="steps">
                {piece.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            )}
          </section>
        )}

        <nav className="pager" aria-label="More pieces">
          <Link href={`/pieces/${previous.piece.slug}`} className="pager__link">
            <img
              className="pager__thumb"
              src={previous.piece.image.src}
              alt=""
              width={previous.piece.image.width}
              height={previous.piece.image.height}
              decoding="async"
            />
            <span className="pager__text">
              <span className="pager__dir">Previous · No. {pieceNumber(previous.index)}</span>
              <span className="pager__name">{previous.piece.name}</span>
            </span>
          </Link>
          <Link href={`/pieces/${next.piece.slug}`} className="pager__link is-next">
            <span className="pager__text">
              <span className="pager__dir">Next · No. {pieceNumber(next.index)}</span>
              <span className="pager__name">{next.piece.name}</span>
            </span>
            <img
              className="pager__thumb"
              src={next.piece.image.src}
              alt=""
              width={next.piece.image.width}
              height={next.piece.image.height}
              decoding="async"
            />
          </Link>
        </nav>
      </main>

      <SiteFooter />
    </>
  );
}
