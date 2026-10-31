export default function Topbar({ query, onQueryChange, onGoHome, onNotifications }) {
  return (
    <header className="topbar">
      <button className="mobile-brand" onClick={onGoHome}>▣ Rutas SV</button>

      <div className="global-search">
        <span>⌕</span>
        <input
          aria-label="Buscar en la aplicación"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar rutas, destinos..."
        />
      </div>

      <div className="top-actions">
        <button className="icon-button" title="Notificaciones" onClick={onNotifications}>♧</button>
        <span className="top-avatar">US</span>
      </div>
    </header>
  );
}
