export default function AlertBanner({ message, onClose }) {
  return (
    <div className="alert" role="status">
      <span>ⓘ</span>
      <p>{message}</p>
      <button onClick={onClose} aria-label="Cerrar alerta">×</button>
    </div>
  );
}
