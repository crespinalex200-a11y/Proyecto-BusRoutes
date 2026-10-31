function StatCard({ icon, tone, label, value, hint }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{hint}</small>
      </div>
    </article>
  );
}

export default function StatsGrid({ routesCount, activeCount, stopsCount }) {
  return (
    <section className="stats-grid" aria-label="Resumen de rutas">
      <StatCard icon="▣" tone="blue-bg" label="Rutas registradas" value={routesCount} hint="En el catálogo de prueba" />
      <StatCard icon="✓" tone="green-bg" label="Rutas activas" value={activeCount} hint="Disponibles en la maqueta" />
      <StatCard icon="⌖" tone="amber-bg" label="Paradas registradas" value={stopsCount} hint="Ubicaciones de ejemplo" />
    </section>
  );
}
