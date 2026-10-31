
import { useState } from 'react';
import { initialStops } from './data/routes';
import { useRoutes } from './hooks/useRoutes';

import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Footer from './components/layout/Footer';
import AlertBanner from './components/common/AlertBanner';
import RouteFormModal from './components/routes/RouteFormModal';

import HomePage from './pages/HomePage';
import RoutesPage from './pages/RoutesPage';
import StopsPage from './pages/StopsPage';
import FaresPage from './pages/FaresPage';

function App() {
  const [page, setPage] = useState('Inicio');
  const [stops] = useState(initialStops);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState('');

  const catalog = useRoutes();

  const goHome = () => setPage('Inicio');

  function navigate(id) {
    setPage(id);
    setNotice('');
  }

  function searchRoutes() {
    setPage('Rutas');
    catalog.changePage(1);
  }

  function openForm() {
    setShowForm(true);
    setNotice('');
  }

  async function saveRoute(form) {
    const error = await catalog.addRoute(form);

    if (error) {
      setNotice(error);
      return;
    }

    setShowForm(false);
    setPage('Rutas');
    setNotice('La ruta se agregó correctamente.');
  }

  async function deleteRoute(code) {
    try {
      await catalog.removeRoute(code);
      setNotice(`La ruta ${code} se eliminó correctamente.`);
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : 'No se pudo eliminar la ruta.'
      );
    }
  }

  async function toggleRouteStatus(code) {
    try {
      await catalog.toggleStatus(code);
      setNotice(`Se actualizó el estado de la ruta ${code}.`);
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : 'No se pudo actualizar el estado de la ruta.'
      );
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        onNavigate={navigate}
        onGoHome={goHome}
      />

      <main className="main-area">
        <Topbar
          query={catalog.query}
          onQueryChange={catalog.changeQuery}
          onGoHome={goHome}
          onNotifications={() =>
            setNotice('No tienes notificaciones nuevas.')
          }
        />

        <div className="content">
          {notice && (
            <AlertBanner
              message={notice}
              onClose={() => setNotice('')}
            />
          )}

          {page === 'Inicio' && (
            <HomePage
              catalog={catalog}
              stopsCount={stops.length}
              onSearch={searchRoutes}
              onSeeAll={() => setPage('Rutas')}
            />
          )}

          {page === 'Rutas' && (
            <RoutesPage
              catalog={catalog}
              onAdd={openForm}
              onToggleStatus={toggleRouteStatus}
              onDelete={deleteRoute}
            />
          )}

          {page === 'Paradas' && (
            <StopsPage
              stops={stops}
              query={catalog.query}
              onRegister={() =>
                setNotice(
                  'En una versión futura podrás registrar nuevas paradas.'
                )
              }
            />
          )}

          {page === 'Tarifas' && (
            <FaresPage routes={catalog.routes} />
          )}

          <Footer onMessage={setNotice} />
        </div>
      </main>

      {showForm && (
        <RouteFormModal
          error={notice}
          onSave={saveRoute}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;
