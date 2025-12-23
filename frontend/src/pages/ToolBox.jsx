import { Link } from 'react-router-dom'

function Toolbox() {
  return (
    <div>
      <h1>🧰 Caja de Herramientas</h1>
      <p>Selecciona una utilidad para comenzar.</p>

      <div className="dashboard-grid">
        {/* Tarjeta 1: QR */}
        <Link to="/qr-generator" className="tool-card">
          <span style={{ fontSize: '40px' }}>🔳</span>
          <h3>Generador QR</h3>
          <p>Crea códigos QR instantáneos con descarga PNG.</p>
        </Link>

        {/* Tarjeta 2: Password */}
        <Link to="/password-generator" className="tool-card">
          <span style={{ fontSize: '40px' }}>🔐</span>
          <h3>Generador de Claves</h3>
          <p>Crea contraseñas seguras y aleatorias al instante.</p>
        </Link>
        
        {/* Tarjeta 3: Placeholder */}
        <div className="tool-card" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          <span style={{ fontSize: '40px' }}>🚧</span>
          <h3>Próximamente</h3>
          <p>Más utilidades en construcción...</p>
        </div>
      </div>
    </div>
  )
}

export default Toolbox