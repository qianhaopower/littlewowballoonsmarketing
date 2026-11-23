import Link from "next/link";
import { Figure } from "@/components/Figure";
import { Stars } from "@/components/Stars";
import { pieceNumber, type Piece } from "@/content/pieces";

export function PieceTile({ piece, index }: { piece: Piece; index: number }) {
  return (
    <Link href={`/pieces/${piece.slug}`} className="tile">
      <div className="stage">
        <div className="stage__box">
          <Figure piece={piece} decorative />
        </div>
      </div>
      <div className="tile__caption">
        <div className="tile__id">
          <span className="tile__meta">
            <span className="no">No. {pieceNumber(index)}</span>
            <Stars value={piece.difficulty} />
          </span>
          <span className="tile__name">{piece.name}</span>
        </div>
        {piece.nameZh && (
          <span className="zh" lang="zh-Hans">
            {piece.nameZh}
          </span>
        )}
      </div>
    </Link>
  );
}
