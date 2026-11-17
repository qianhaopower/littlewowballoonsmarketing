import type { CSSProperties } from "react";
import type { Piece } from "@/content/pieces";

type FigureProps = {
  piece: Piece;
  /** Load immediately; use for the one piece visible when the page opens. */
  priority?: boolean;
  /** Leave the alt text empty when the name is already written next to the image. */
  decorative?: boolean;
};

/**
 * A piece standing on the plinth: the cutout photograph plus its floor reflection.
 * It sizes itself to fit the nearest `.stage__box` while keeping its proportions.
 */
export function Figure({ piece, priority = false, decorative = false }: FigureProps) {
  const { src, width, height, alt } = piece.image;
  const ratio = (width / height).toFixed(4);

  return (
    <div className="figure" style={{ "--ar": ratio } as CSSProperties}>
      <img
        className="figure__img"
        src={src}
        alt={decorative ? "" : alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
      {piece.reflect !== false && (
        <img
          className="figure__reflection"
          src={src}
          alt=""
          aria-hidden="true"
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
  );
}
