// Traduce el estado de una ruta a la clase CSS (status-active, status-off, status-maintenance).
export function statusClass(status) {
  if (status === 'Activa') return 'active';
  if (status === 'Suspendida') return 'off';
  return 'maintenance';
}
