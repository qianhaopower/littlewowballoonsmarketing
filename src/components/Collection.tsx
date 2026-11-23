"use client";

import { useSyncExternalStore } from "react";
import { PieceTile } from "@/components/PieceTile";
import { Star } from "@/components/Stars";
import { difficultyBand, difficultyName, pieces } from "@/content/pieces";

/**
 * The chosen difficulty lives in the address (?difficulty=3), so it survives going into a
 * piece and back, and a filtered view can be shared as a link.
 */
const PARAM = "difficulty";
const CHANGED = "littlewow:difficulty";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(CHANGED, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(CHANGED, onChange);
  };
}

const readAddress = () => new URLSearchParams(window.location.search).get(PARAM);
const readOnServer = () => null;

function choose(band: number | null) {
  const url = new URL(window.location.href);
  if (band === null) url.searchParams.delete(PARAM);
  else url.searchParams.set(PARAM, String(bandStars(band)));
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(CHANGED));
}

const numbered = pieces.map((piece, index) => ({ piece, index, band: difficultyBand(piece.difficulty) }));
const bands = [...new Set(numbered.map((entry) => entry.band))].sort((a, b) => a - b);

/** The stars a band is known by: its own number, or the real figure for the one off the scale. */
const bandStars = (band: number) =>
  band > 5 ? Math.max(...numbered.filter((entry) => entry.band === band).map((entry) => entry.piece.difficulty)) : band;

export function Collection() {
  const requested = Number(useSyncExternalStore(subscribe, readAddress, readOnServer));
  const active = requested >= 1 ? (bands.find((band) => band === difficultyBand(requested)) ?? null) : null;
  const shown = active === null ? numbered : numbered.filter((entry) => entry.band === active);

  return (
    <>
      <div className="filter" role="group" aria-label="Filter by difficulty">
        <span className="filter__label">Difficulty</span>
        <div className="filter__chips">
          <button type="button" className="chip" aria-pressed={active === null} onClick={() => choose(null)}>
            All
          </button>
          {bands.map((band) => (
            <button
              key={band}
              type="button"
              className="chip"
              aria-pressed={active === band}
              aria-label={`${bandStars(band)} ${band === 1 ? "star" : "stars"}: ${difficultyName(bandStars(band))}`}
              onClick={() => choose(active === band ? null : band)}
            >
              {bandStars(band)}
              <Star fill={1} />
            </button>
          ))}
        </div>
        <span className="filter__count" aria-live="polite">
          {active === null
            ? "One star is a first twist; five is the hardest"
            : `${difficultyName(bandStars(active))} · ${shown.length} of ${numbered.length}`}
        </span>
      </div>

      <div className="grid">
        {shown.map(({ piece, index }) => (
          <PieceTile key={piece.slug} piece={piece} index={index} />
        ))}
        {Array.from({ length: (3 - (shown.length % 3)) % 3 }, (_, i) => (
          <div key={`three-${i}`} className="tile tile--blank tile--blank-3" aria-hidden="true" />
        ))}
        {shown.length % 2 === 1 && <div className="tile tile--blank tile--blank-2" aria-hidden="true" />}
      </div>
    </>
  );
}
