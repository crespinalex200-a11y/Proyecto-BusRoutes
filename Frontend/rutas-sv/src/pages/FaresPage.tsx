import StatusBadge from '../components/common/StatusBadge';
import InfoBanner from '../components/common/InfoBanner';
import { money } from '../utils/format';

export default function FaresPage({ routes }) {
  return (
    <section className="panel">
      <div className="page-title-row">
        <div>
          <span className="eyebrow blue">PRECIOS REFERENCIALES</span>
          <h1>Tarifas por ruta</h1>
          <p>Consulta las tarifas de ejemplo del catálogo.</p>
        </div>

        <span className="pill-neutral">
          USD · Dólares estadounidenses
        </span>
      </div>

      <div className="fare-list">
        {routes.map((route) => (
          <article className="fare-list-item" key={route.code}>
            <div className="fare-list-info">
              <div className="fare-list-heading">
                <h2>{route.name}</h2>
                <span className="code-pill">{route.code}</span>
              </div>

              <p className="fare-list-route">
                {route.origin} <span>→</span> {route.destination}
              </p>

              <div className="fare-list-details">
                <span>
                  Tiempo estimado: <strong>{route.time} minutos</strong>
                </span>

                <span className="fare-list-status">
                  Estado: <StatusBadge status={route.status} />
                </span>
              </div>
            </div>

            <div className="fare-list-price">
              <strong>{money(route.fare)}</strong>
              <small>por viaje</small>
            </div>
          </article>
        ))}
      </div>

      <InfoBanner symbol="!" title="Importante">
        Las tarifas son ficticias y se incluyen únicamente para demostrar
        el diseño de la interfaz.
      </InfoBanner>
    </section>
  );
}