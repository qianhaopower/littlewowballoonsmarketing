const STAR = "M12 2.8l2.84 5.76 6.36.92-4.6 4.49 1.09 6.33L12 17.31 6.31 20.3l1.09-6.33-4.6-4.49 6.36-.92z";
const LEFT_HALF = "M12 2.8v14.51L6.31 20.3l1.09-6.33-4.6-4.49 6.36-.92z";

export function Star({ fill }: { fill: 0 | 0.5 | 1 }) {
  return (
    <svg className="stars__star" viewBox="0 0 24 24" aria-hidden="true">
      <path className={fill === 1 ? "stars__full" : "stars__outline"} d={STAR} />
      {fill === 0.5 && <path className="stars__half" d={LEFT_HALF} />}
    </svg>
  );
}

/**
 * Difficulty in stars. Up to five, it is a row of five with the earned ones filled;
 * above five it is off the scale and reads "★ × 100".
 */
export function Stars({ value }: { value: number }) {
  if (value > 5) {
    return (
      <span className="stars" role="img" aria-label={`Difficulty: ${value} stars, off the scale`}>
        <Star fill={1} />
        <span className="stars__times">× {value}</span>
      </span>
    );
  }

  return (
    <span className="stars" role="img" aria-label={`Difficulty: ${value} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} fill={value >= n ? 1 : value >= n - 0.5 ? 0.5 : 0} />
      ))}
    </span>
  );
}
