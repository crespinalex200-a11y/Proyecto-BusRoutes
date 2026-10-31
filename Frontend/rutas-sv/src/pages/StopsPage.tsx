export default function StopsPage({ stops, query, onRegister }) {
  const text = query.toLowerCase();
  const visibleStops = stops.filter((stop) =>
    `${stop.code} ${stop.name} ${stop.routes} ${stop.location}`.toLowerCase().includes(text)
  );

  return (
    <section className="panel">
      <div className="page-title-row">
        <div>
          <span className="eyebrow blue">UBICACIONES</span>
          <h1>Gestión de paradas</h1>
          <p>Listado ilustrativo de paradas asociadas a rutas.</p>
        </div>
        <button className="btn btn-primary" onClick={onRegister}>＋ Registrar parada</button>
      </div>

      <div className="table-toolbar">
        <span>{stops.length} paradas registradas</span>
        <span>Datos de ejemplo</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre de la parada</th>
              <th>Ruta(s)</th>
              <th>Ubicación</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {visibleStops.map((stop) => (
              <tr key={stop.code}>
                <td><span className="code-pill">{stop.code}</span></td>
                <td className="route-name-cell">{stop.name}</td>
                <td>{stop.routes}</td>
                <td>{stop.location}</td>
                <td><span className="status status-active">Registrada</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
