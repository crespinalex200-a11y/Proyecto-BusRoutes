import Hero from '../components/home/Hero';
import SearchCard from '../components/home/SearchCard';
import StatsGrid from '../components/home/StatsGrid';
import PopularRoutes from '../components/home/PopularRoutes';
import InfoBanner from '../components/common/InfoBanner';

export default function HomePage({ catalog, stopsCount, onSearch, onSeeAll }) {
  return (
    <>
      <Hero />
      <SearchCard
        origins={catalog.origins}
        destinations={catalog.destinations}
        originFilter={catalog.originFilter}
        destinationFilter={catalog.destinationFilter}
        onOriginChange={catalog.changeOrigin}
        onDestinationChange={catalog.changeDestination}
        onSearch={onSearch}
        onClear={catalog.clearFilters}
      />
      <StatsGrid
        routesCount={catalog.routes.length}
        activeCount={catalog.activeCount}
        stopsCount={stopsCount}
      />
      <PopularRoutes routes={catalog.routes} onSeeAll={onSeeAll} />
      <InfoBanner symbol="i" title="Viaja con información clara">
        Los horarios, tarifas y recorridos de esta maqueta son datos ilustrativos y deben confirmarse con el operador correspondiente.
      </InfoBanner>
      <section className="useful-links">
        <span className="eyebrow blue">INFORMACIÓN PARA TU VIAJE</span>
        <h2>Enlaces útiles</h2>
        <p>Consulta noticias y recursos relacionados con el transporte.</p>

        <div className="useful-links-grid">
          <a
            className="useful-link"
            href="https://www.facebook.com/VMTElSalvador/"
            target="_blank"
            rel="noreferrer"
          >
            <span>📢</span>
            <strong>Noticias de tránsito</strong>
            <small>Facebook del VMT El Salvador ↗</small>
          </a>

          <a
            className="useful-link"
            href="#horarios"
            onClick={(e) => {
              e.preventDefault();
              alert('Próximamente: consulta de horarios.');
            }}
          >
            <span>🕒</span>
            <strong>Horarios de buses</strong>
            <small>Consultar horarios ↗</small>
          </a>

          <a
            className="useful-link"
            href="#avisos"
            onClick={(e) => {
              e.preventDefault();
              alert('Próximamente: avisos de rutas y desvíos.');
            }}
          >
            <span>🚧</span>
            <strong>Avisos viales</strong>
            <small>Ver cierres y desvíos ↗</small>
          </a>

          <a
            className="useful-link"
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              alert('Próximamente: directorio de transporte.');
            }}
          >
            <span>📞</span>
            <strong>Contactos de transporte</strong>
            <small>Ver directorio ↗</small>
          </a>
        </div>
      </section>
    </>
  );
}
