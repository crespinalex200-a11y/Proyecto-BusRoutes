
const API_URL = 'http://localhost:3000/api/rutas';

export interface Ruta {
  id?: number;
  code: string;
  name: string;
  origin: string;
  destination: string;
  time: number;
  fare: number;
  status: 'Activa' | 'En mantenimiento' | 'Suspendida';
}

async function comprobarRespuesta(response: Response) {
  if (!response.ok) {
    let mensaje = `Error del servidor (${response.status}).`;

    try {
      const data = await response.json();
      mensaje = data.mensaje || data.message || mensaje;
    } catch {
      // La respuesta no contenía JSON.
    }

    throw new Error(mensaje);
  }
}

export async function obtenerRutas(): Promise<Ruta[]> {
  const response = await fetch(API_URL);
  await comprobarRespuesta(response);

  const data = await response.json();

  return data.map((ruta: any) => ({
    id: ruta.id,
    code: ruta.code,
    name: ruta.name,
    origin: ruta.origin,
    destination: ruta.destination,
    time: Number(ruta.time),
    fare: Number(ruta.fare),
    status: ruta.status,
  }));
}

export async function crearRuta(ruta: Omit<Ruta, 'id'>): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ruta),
  });

  await comprobarRespuesta(response);
}

export async function actualizarRuta(
  id: number,
  cambios: Partial<Omit<Ruta, 'id'>>
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cambios),
  });

  await comprobarRespuesta(response);
}

export async function eliminarRuta(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  await comprobarRespuesta(response);
}
