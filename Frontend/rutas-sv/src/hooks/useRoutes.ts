
import { useEffect, useMemo, useState } from 'react';
import {
  obtenerRutas,
  crearRuta,
  actualizarRuta,
  eliminarRuta,
  type Ruta,
} from '../services/routesServices';

export const PAGE_SIZE = 5;

export function useRoutes() {
  const [routes, setRoutes] = useState<Ruta[]>([]);
  const [query, setQuery] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadRoutes() {
    try {
      setError('');
      const data = await obtenerRutas();
      setRoutes(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudieron cargar las rutas.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRoutes();
  }, []);

  const filteredRoutes = useMemo(
    () =>
      routes.filter((route) => {
        const text =
          `${route.code} ${route.name} ${route.origin} ${route.destination} ${route.status}`.toLowerCase();

        return (
          text.includes(query.toLowerCase()) &&
          (!originFilter || route.origin === originFilter) &&
          (!destinationFilter || route.destination === destinationFilter)
        );
      }),
    [routes, query, originFilter, destinationFilter]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRoutes.length / PAGE_SIZE)
  );

  const visibleRoutes = filteredRoutes.slice(
    (pageNumber - 1) * PAGE_SIZE,
    pageNumber * PAGE_SIZE
  );

  const origins = [...new Set(routes.map((route) => route.origin))];
  const destinations = [
    ...new Set(routes.map((route) => route.destination)),
  ];

  const activeCount = routes.filter(
    (route) => route.status === 'Activa'
  ).length;

  function changePage(nextPage: number) {
    setPageNumber(Math.min(Math.max(1, nextPage), totalPages));
  }

  function changeQuery(value: string) {
    setQuery(value);
    setPageNumber(1);
  }

  function changeOrigin(value: string) {
    setOriginFilter(value);
    setPageNumber(1);
  }

  function changeDestination(value: string) {
    setDestinationFilter(value);
    setPageNumber(1);
  }

  function clearFilters() {
    setQuery('');
    setOriginFilter('');
    setDestinationFilter('');
    setPageNumber(1);
  }

  // Registrar una ruta en MySQL.
  async function addRoute(form: Ruta): Promise<string | null> {
    const code = form.code.trim();
    const name = form.name.trim();
    const origin = form.origin.trim();
    const destination = form.destination.trim();

    if (!code || !name || !origin || !destination) {
      return 'Completa el código, nombre, origen y destino.';
    }

    if (
      routes.some(
        (route) => route.code.toLowerCase() === code.toLowerCase()
      )
    ) {
      return 'Ya existe una ruta con ese código. Prueba con otro.';
    }

    try {
      setError('');

      await crearRuta({
        code,
        name,
        origin,
        destination,
        time: Number(form.time),
        fare: Number(form.fare),
        status: form.status || 'Activa',
      });

      const updatedRoutes = await obtenerRutas();
      setRoutes(updatedRoutes);
      clearFilters();
      setPageNumber(
        Math.max(1, Math.ceil(updatedRoutes.length / PAGE_SIZE))
      );

      return null;
    } catch (err) {
      return err instanceof Error
        ? err.message
        : 'No se pudo registrar la ruta.';
    }
  }

  // Eliminar una ruta de MySQL utilizando su código.
  async function removeRoute(code: string): Promise<void> {
    const route = routes.find((item) => item.code === code);

    if (!route || route.id == null) {
      throw new Error('No se encontró el identificador de la ruta.');
    }

    setError('');
    await eliminarRuta(route.id);

    const updatedRoutes = await obtenerRutas();
    setRoutes(updatedRoutes);

    const newTotalPages = Math.max(
      1,
      Math.ceil(updatedRoutes.filter((item) => {
        const text =
          `${item.code} ${item.name} ${item.origin} ${item.destination} ${item.status}`.toLowerCase();

        return (
          text.includes(query.toLowerCase()) &&
          (!originFilter || item.origin === originFilter) &&
          (!destinationFilter || item.destination === destinationFilter)
        );
      }).length / PAGE_SIZE)
    );

    setPageNumber((current) => Math.min(current, newTotalPages));
  }

  async function toggleStatus(code: string): Promise<void> {
    const route = routes.find((item) => item.code === code);

    if (!route || route.id == null) {
      throw new Error('No se encontró el identificador de la ruta.');
    }

    const newStatus =
      route.status === 'Activa' ? 'En mantenimiento' : 'Activa';

    setError('');

    await actualizarRuta(route.id, {
      status: newStatus,
    });

    const updatedRoutes = await obtenerRutas();
    setRoutes(updatedRoutes);
  }

  return {
    routes,
    query,
    originFilter,
    destinationFilter,
    pageNumber,
    totalPages,
    filteredRoutes,
    visibleRoutes,
    origins,
    destinations,
    activeCount,
    loading,
    error,
    changePage,
    changeQuery,
    changeOrigin,
    changeDestination,
    clearFilters,
    addRoute,
    removeRoute,
    toggleStatus,
  };
}
