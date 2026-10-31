import { navItems } from '../../data/routes';

export default function Sidebar({ page, onNavigate, onGoHome }) {
  return (
    <aside className="sidebar">
      <button className="brand" onClick={onGoHome} aria-label="Ir al inicio">
        <span className="brand-mark">▣</span>
        <span>
          <strong>Bus Routes</strong>
          <small>Tu ruta, más cerca</small>
        </span>
      </button>

      <p className="menu-label">MENÚ PRINCIPAL</p>
      <nav className="main-nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-link ${page === item.id ? 'selected' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.id}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="avatar">AD</div>
        <span>
          <strong>Administrador</strong>
          <small>Modo demostración</small>
        </span>
      </div>
    </aside>
  );
}
