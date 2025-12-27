import { useState } from 'react'
import QRCode from 'react-qr-code'

function QrGenerator() {
  const [text, setText] = useState('https://donwea.cl')

  function handleChange(e) {
    setText(e.target.value)
  }

  // Función para descargar el SVG como PNG
  function downloadQR() {
    const svg = document.getElementById("qr-code-svg")
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData)
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = "mi-qr.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <h2>Generador de Código QR</h2>
      
      <input 
        type="text" 
        placeholder="Escribe aquí..." 
        value={text}
        onChange={handleChange}
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />

      <div style={{ background: 'white', padding: '16px', marginTop: '20px' }}>
        {text && (
          <QRCode 
            id="qr-code-svg"
            value={text} 
            size={256}
          />
        )}
      </div>

      {text && (
        <button onClick={downloadQR} style={{ marginTop: '10px' }}>
          📥 Descargar PNG
        </button>
      )}
    </div>
  )
}

export default QrGenerator