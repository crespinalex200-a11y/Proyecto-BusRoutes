export default function InfoBanner({ symbol, title, children }) {
  return (
    <div className="info-banner">
      <div className="info-symbol">{symbol}</div>
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}
