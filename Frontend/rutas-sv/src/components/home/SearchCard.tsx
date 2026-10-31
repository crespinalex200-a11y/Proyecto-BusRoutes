export default function SearchCard({
  origins,
  destinations,
  originFilter,
  destinationFilter,
  onOriginChange,
  onDestinationChange,
  onSearch,
  onClear,
}) {
  return (
    <section className="search-card" aria-labelledby="route-search-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow blue">PLANIFICA TU VIAJE</span>
          <h2 id="route-search-title">¿A dónde quieres ir?</h2>
        </div>
        <span className="heading-icon">⌕</span>
      </div>

      <div className="search-fields">
        <label>
          Origen
          <select value={originFilter} onChange={(e) => onOriginChange(e.target.value)}>
            <option value="">Cualquier origen</option>
            {origins.map((origin) => <option key={origin}>{origin}</option>)}
          </select>
        </label>

        <label>
          Destino
          <select value={destinationFilter} onChange={(e) => onDestinationChange(e.target.value)}>
            <option value="">Cualquier destino</option>
            {destinations.map((destination) => <option key={destination}>{destination}</option>)}
          </select>
        </label>

        <label>
          Horario
          <select defaultValue="">
            <option value="">Cualquier horario</option>
            <option>Mañana</option>
            <option>Tarde</option>
            <option>Noche</option>
          </select>
        </label>

        <button className="btn btn-primary" onClick={onSearch}>⌕ Buscar rutas</button>
        <button className="btn btn-light" onClick={onClear}>Limpiar</button>
      </div>
    </section>
  );
}
