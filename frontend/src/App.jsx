import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Toolbox from './pages/ToolBox'
import QrGenerator from './pages/QRGenerator'
import PasswordGenerator from './pages/PasswordGenerator'

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toolbox" element={<Toolbox />} />
          <Route path="/qr-generator" element={<QrGenerator />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
        </Routes>
      </div>
    </div>
  )
}

export default App