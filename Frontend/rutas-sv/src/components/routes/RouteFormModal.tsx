import { useState } from 'react';
import { EMPTY_ROUTE_FORM, ROUTE_STATUSES } from '../../data/routes';

export default function RouteFormModal({ error, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY_ROUTE_FORM);
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <div>
            <span className="eyebrow blue">NUEVO REGISTRO</span>
            <h2 id="modal-title">Registrar ruta</h2>
            <p>Completa los datos de la nueva ruta.</p>
          </div>
          <button className="close-modal" onClick={onClose} aria-label="Cerrar formulario">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Código de ruta *
              <input value={form.code} onChange={update('code')} placeholder="Ej. 808" required />
            </label>
            <label>
              Nombre de ruta *
              <input value={form.name} onChange={update('name')} placeholder="Ej. Centro – Terminal" required />
            </label>
            <label>
              Origen *
              <input value={form.origin} onChange={update('origin')} placeholder="Punto de salida" required />
            </label>
            <label>
              Destino *
              <input value={form.destination} onChange={update('destination')} placeholder="Punto de llegada" required />
            </label>
            <label>
              Tiempo estimado (min)
              <input type="number" min="1" value={form.time} onChange={update('time')} required />
            </label>
            <label>
              Tarifa ($)
              <input type="number" min="0" step="0.01" value={form.fare} onChange={update('fare')} required />
            </label>
            <label className="full-field">
              Estado
              <select value={form.status} onChange={update('status')}>
                {ROUTE_STATUSES.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-light" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar ruta</button>
          </div>

          <p className="form-help">* Campos obligatorios. Los datos solo se guardan mientras la página permanezca abierta.</p>
        </form>
      </section>
    </div>
  );
}
