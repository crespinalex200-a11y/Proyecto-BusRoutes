export const initialRoutes = [
  { code: '101', name: 'Centro – Universidad', origin: 'Centro', destination: 'UES', time: 30, fare: 0.45, status: 'Activa' },
  { code: '202', name: 'Centro – Santa Tecla', origin: 'Centro', destination: 'Santa Tecla', time: 45, fare: 0.50, status: 'Activa' },
  { code: '303', name: 'San Salvador – Apopa', origin: 'San Salvador', destination: 'Apopa', time: 60, fare: 0.60, status: 'Activa' },
  { code: '404', name: 'San Salvador – Soyapango', origin: 'San Salvador', destination: 'Soyapango', time: 40, fare: 0.50, status: 'Activa' },
  { code: '505', name: 'Mejicanos – Centro', origin: 'Mejicanos', destination: 'Centro', time: 25, fare: 0.40, status: 'En mantenimiento' },
  { code: '606', name: 'Ilopango – Centro', origin: 'Ilopango', destination: 'Centro', time: 50, fare: 0.55, status: 'Activa' },
  { code: '707', name: 'Terminal – Mercado', origin: 'Terminal', destination: 'Mercado', time: 20, fare: 0.35, status: 'Suspendida' },
];

export const initialStops = [
  { code: 'P001', name: 'Centro Histórico', routes: '101, 202', location: 'Centro' },
  { code: 'P002', name: 'Plaza Barrios', routes: '101', location: 'San Salvador' },
  { code: 'P003', name: 'Universidad de El Salvador', routes: '101', location: 'Universidad' },
  { code: 'P004', name: 'Santa Tecla', routes: '202', location: 'Santa Tecla' },
  { code: 'P005', name: 'Apopa', routes: '303', location: 'Apopa' },
  { code: 'P006', name: 'Soyapango', routes: '404', location: 'Soyapango' },
];

export const navItems = [
  { id: 'Inicio', icon: '⌂' },
  { id: 'Rutas', icon: '▣' },
  { id: 'Paradas', icon: '⌖' },
  { id: 'Tarifas', icon: '＄' },
];

export const ROUTE_STATUSES = ['Activa', 'En mantenimiento', 'Suspendida'];

export const EMPTY_ROUTE_FORM = {
  code: '',
  name: '',
  origin: '',
  destination: '',
  time: '30',
  fare: '0.45',
  status: 'Activa',
};
