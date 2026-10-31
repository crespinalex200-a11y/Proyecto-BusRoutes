import StatusBadge from '../common/StatusBadge';
import { money } from '../../utils/format';

export default function RoutesTable({ routes, onToggleStatus, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre de ruta</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Tiempo</th>
            <th>Tarifa</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.code}>
              <td><span className="code-pill">{route.code}</span></td>
              <td className="route-name-cell">{route.name}</td>
              <td>{route.origin}</td>
              <td>{route.destination}</td>
              <td>{route.time} min</td>
              <td>{money(route.fare)}</td>
              <td><StatusBadge status={route.status} /></td>
              <td>
                <div className="row-actions">
                  <button
                    className="action-btn edit"
                    title="Cambiar estado"
                    aria-label={`Cambiar estado de ${route.code}`}
                    onClick={() => onToggleStatus(route.code)}
                  >
                    ↻
                  </button>
                  <button
                    className="action-btn delete"
                    title="Eliminar ruta"
                    aria-label={`Eliminar ruta ${route.code}`}
                    onClick={() => onDelete(route.code)}
                  >
                    ×
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {routes.length === 0 && (
            <tr>
              <td colSpan={8} className="empty-state">No se encontraron rutas. Prueba con otra búsqueda.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
