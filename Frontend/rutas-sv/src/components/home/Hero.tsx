export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">TRANSPORTE PÚBLICO</span>
        <h1>Muévete por la ciudad <span>con confianza.</span></h1>
        <p>Encuentra rutas, consulta destinos y planifica tu próximo viaje de forma sencilla.</p>
      </div>

      <div className="hero-illustration" aria-label="Ilustración de autobús" role="img">
        <div className="sun"></div>
        <div className="road"></div>
        <div className="bus">
          <div className="bus-windows"><i></i><i></i><i></i></div>
          <div className="bus-front"></div>
          <b>RUTAS SV</b>
          <div className="wheel wheel-one"></div>
          <div className="wheel wheel-two"></div>
        </div>
        <span className="hero-route route-one">101</span>
        <span className="hero-route route-two">202</span>
      </div>
    </section>
  );
}
