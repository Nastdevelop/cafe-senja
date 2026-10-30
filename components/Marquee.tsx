const WORDS = [
  "Freshly roasted",
  "Manual brew",
  "Pastry harian",
  "Live music Jumat",
  "Single origin",
  "Ruang kreatif",
];

export function Marquee() {
  const track = (
    <div className="marquee__group">
      {WORDS.map((word) => (
        <span className="marquee__item" key={word}>
          {word}
          <span className="marquee__dot" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee">
        <div className="marquee__track">
          {track}
          {track}
        </div>
      </div>
    </div>
  );
}
