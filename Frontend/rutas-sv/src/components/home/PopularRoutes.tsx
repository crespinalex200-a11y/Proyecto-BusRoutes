import { money } from '../../utils/format';

export default function PopularRoutes({ routes, onSeeAll }) {
  return (
    <section className="popular-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow blue">DESCUBRE</span>
          <h2>Rutas populares</h2>
        </div>
        <button className="text-link" onClick={onSeeAll}>Ver todas las rutas →</button>
      </div>

      <div className="popular-grid">
        {routes.slice(0, 4).map((route, i) => (
          <article className={`popular-card color-${i % 4}`} key={route.code}>
            <div className="popular-top">
              <span className="route-icon">▣</span>
              <span className={`status-dot ${route.status === 'Activa' ? 'dot-green' : 'dot-amber'}`}></span>
            </div>
            <span className="route-code">RUTA {route.code}</span>
            <h3>{route.name}</h3>
            <p>{route.origin} <span>→</span> {route.destination}</p>
            <div className="popular-bottom">
              <strong>{money(route.fare)}</strong>
              <small>{route.time} min aprox.</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
