export default function Footer({ onMessage }) {
  const showMessage = (text) => (e) => {
    e.preventDefault();
    onMessage(text);
  };

  return (
    <footer className="footer">
      <span>© 2026 Rutas SV · Maqueta académica</span>
      <div>
        <a href="#acerca" onClick={showMessage('Rutas SV es un proyecto académico de demostración.')}>
          Acerca del proyecto
        </a>
        <a href="#ayuda" onClick={showMessage('Para esta maqueta, consulta las indicaciones de tu docente.')}>
          Ayuda
        </a>
      </div>
    </footer>
  );
}
