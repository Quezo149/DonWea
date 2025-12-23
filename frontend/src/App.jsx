import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PassGenerator from './pages/PassGenerator'
import QrGenerator from './pages/QRGenerator'
function App() {

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qr-generator" element={<QrGenerator />} />
          <Route path="/pass-generator" element={<PassGenerator />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
