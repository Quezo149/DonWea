import { Link } from 'react-router-dom'
import { FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa'

function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '40px 20px' }}>
      
      {/* SECCIÓN PRINCIPAL */}
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>DonWea<span style={{ color: '#646cff' }}>.cl</span></h1>
      <h2 style={{ color: '#888', fontWeight: 'normal', marginBottom: '40px' }}>Plataforma de Desarrollo & Utilidades</h2>

      <div style={{ textAlign: 'left', background: '#2a2a2a', padding: '30px', borderRadius: '15px', border: '1px solid #444', marginBottom: '40px' }}>
        <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
          Bienvenido. Este es un entorno controlado diseñado para centralizar herramientas digitales de uso cotidiano.
        </p>
        <p style={{ lineHeight: '1.6', fontSize: '1.1rem', marginTop: '15px' }}>
          El proyecto busca combinar la <strong>eficiencia técnica</strong> con una arquitectura limpia. Aquí encontrarás soluciones prácticas desarrolladas bajo la filosofía de la simplicidad.
        </p>
      </div>

      <Link to="/toolbox">
        <button style={{ padding: '15px 40px', fontSize: '1.2rem', cursor: 'pointer', marginBottom: '60px' }}>
          Explorar Herramientas 🚀
        </button>
      </Link>

      {/* REDES SOCIALES (Footer) */}
      <div style={{ borderTop: '1px solid #444', paddingTop: '30px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#ccc' }}>Contacto & Redes</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* Instagram */}
          <a 
            href="https://instagram.com/quezito.net_149" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaInstagram size={30} color="#E1306C" /> 
            <span>Instagram</span>
          </a>

          {/* GitHub */}
          <a 
            href="https://github.com/Quezo149" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaGithub size={30} color="white" /> 
            <span>GitHub</span>
          </a>

        </div>
        
        <p style={{ marginTop: '30px', color: '#666', fontSize: '0.9rem' }}>
          © 2025 Felipe Quezada. Built with React & Vite.
        </p>
      </div>

    </div>
  )
}

export default Home