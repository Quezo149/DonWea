import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <h2><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Quezito's Tools</Link></h2>
      <ul>
        <li>
          <Link to="/toolbox">Herramientas</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar