import { useState } from 'react'
import QRCode from 'react-qr-code'
import '../App.css'

function QrGenerator() {
    const [text, setText] = useState('https://donwea.cl')
    function handleChange(e) {
        setText(e.target.value)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h2>Generador de Código QR</h2>
            
            <input 
                type="text" 
                placeholder="Escribe aquí tu enlace o texto..." 
                value={text}
                onChange={handleChange}
                style={{ padding: '10px', width: '300px', fontSize: '16px' }}
            />

            <div style={{ background: 'white', padding: '16px', marginTop: '20px' }}>
                {text && (
                <QRCode 
                    value={text} 
                    size={256}
                />
                )}
            </div>
        </div>
    )
}
export default QrGenerator