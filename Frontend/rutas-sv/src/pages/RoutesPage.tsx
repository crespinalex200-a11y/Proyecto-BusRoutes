import RoutesTable from '../components/routes/RoutesTable';
import Pagination from '../components/common/Pagination';
import { PAGE_SIZE } from '../hooks/useRoutes';

export default function RoutesPage({ catalog, onAdd, onToggleStatus, onDelete }) {
  const { filteredRoutes, visibleRoutes, pageNumber, totalPages, changePage } = catalog;
  const total = filteredRoutes.length;
  const from = total ? (pageNumber - 1) * PAGE_SIZE + 1 : 0;
  const to = Math.min(pageNumber * PAGE_SIZE, total);

  return (
    <section className="panel">
      <div className="page-title-row">
        <div>
          <span className="eyebrow blue">CATÁLOGO</span>
          <h1>Gestión de rutas</h1>
          <p>Consulta y administra las rutas de autobuses registradas.</p>
        </div>
        <button className="btn btn-primary" onClick={onAdd}>＋ Registrar ruta</button>
      </div>

      <div className="table-toolbar">
        <label>
          Mostrar <select value={PAGE_SIZE} disabled><option>{PAGE_SIZE}</option></select> registros
        </label>
        <span>{total} resultado(s)</span>
      </div>

      <RoutesTable routes={visibleRoutes} onToggleStatus={onToggleStatus} onDelete={onDelete} />

      <div className="table-footer">
        <span>Mostrando {from}–{to} de {total} registros</span>
        <Pagination pageNumber={pageNumber} totalPages={totalPages} onChange={changePage} />
      </div>

      <p className="prototype-note">
      </p>
    </section>
  );
}
