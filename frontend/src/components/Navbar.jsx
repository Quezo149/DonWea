import { Link } from 'react-router-dom'
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <h2><Link to="/">DonWea</Link></h2>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/qr-generator">QR Generator</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
