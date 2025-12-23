import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>🏠 Panel de Control</h1>
      <p>Selecciona una herramienta para comenzar a trabajar.</p>

      <div className="dashboard-grid">
        
        {/* Tarjeta 1: Generador QR */}
        <Link to="/qr-generator" className="tool-card">
          <span style={{ fontSize: '40px' }}>🔳</span>
          <h3>Generador QR</h3>
          <p>Crea códigos QR instantáneos para tus enlaces.</p>
        </Link>

        {/* Tarjeta 2: Generador de Claves */}
        <Link to="/pass-generator" className="tool-card">
          <span style={{ fontSize: '40px' }}>🔐</span>
          <h3>Generador de Claves</h3>
          <p>Crea contraseñas seguras y aleatorias al instante.</p>
        </Link>

        {/* Tarjeta 3: Próximamente (Placeholder) */}
        <div className="tool-card" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          <span style={{ fontSize: '40px' }}>🚧</span>
          <h3>Próximamente</h3>
          <p>Nueva herramienta en construcción...</p>
        </div>

      </div>
    </div>
  )
}

export default Home