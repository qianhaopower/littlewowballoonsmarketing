"use client";

import { useRef } from "react";
import { Figure } from "@/components/Figure";
import type { Piece } from "@/content/pieces";

/** The large stage on a piece page. Click the piece, or "Enlarge", to see it full screen. */
export function PieceStage({ piece }: { piece: Piece }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();

  return (
    <div className="stage stage--piece">
      <div className="stage__floor" aria-hidden="true" />
      <div className="stage__box stage__box--zoom" onClick={open}>
        <Figure piece={piece} priority />
      </div>
      <button type="button" className="enlarge" onClick={open}>
        <svg aria-hidden="true" width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor">
          <path d="M6.5 0v13M0 6.5h13" />
        </svg>
        <span>Enlarge</span>
      </button>

      <dialog ref={dialog} className="lightbox" aria-label={`${piece.name}, enlarged`} onClick={close}>
        <img src={piece.image.src} alt={piece.image.alt} width={piece.image.width} height={piece.image.height} />
        <button type="button" className="lightbox__close" onClick={close}>
          Close
        </button>
      </dialog>
    </div>
  );
}
