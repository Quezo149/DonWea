import { useState, useEffect } from 'react'

function PasswordGenerator() {
  const [length, setLength] = useState(12)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')
  
  // Estado para la fuerza visual
  const [strength, setStrength] = useState('') 
  const [strengthColor, setStrengthColor] = useState('')

  function generatePassword() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-='

    if (includeNumbers) characters += numbers
    if (includeSymbols) characters += symbols

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      newPassword += characters[randomIndex]
    }
    setPassword(newPassword)
  }

  function evaluateStrength(pass) {
    let score = 0
    if (!pass) return

    if (pass.length > 8) score += 1
    if (pass.length > 12) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1

    if (score <= 2) {
      setStrength('Débil')
      setStrengthColor('#e74c3c') // Rojo
    } else if (score === 3 || score === 4) {
      setStrength('Media')
      setStrengthColor('#f1c40f') // Amarillo
    } else {
      setStrength('Fuerte')
      setStrengthColor('#2ecc71') // Verde
    }
  }

  useEffect(() => {
    generatePassword()
  }, [length, includeNumbers, includeSymbols])

  useEffect(() => {
    evaluateStrength(password)
  }, [password])

  function copyToClipboard() {
    if (password) {
      navigator.clipboard.writeText(password)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>🔐 Generador Pro</h2>
      
      <div style={{ background: '#333', padding: '20px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '1.4rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>{password}</span>
          <button onClick={copyToClipboard} style={{ marginLeft: '10px', fontSize: '0.9rem', padding: '5px 10px' }}>Copiar</button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', fontSize: '0.9rem' }}>
           <span>Seguridad:</span>
           <span style={{ color: strengthColor, fontWeight: 'bold' }}>{strength}</span>
           <div style={{ flex: 1, height: '6px', background: '#555', borderRadius: '3px', overflow: 'hidden' }}>
             <div style={{ width: strength === 'Fuerte' ? '100%' : strength === 'Media' ? '60%' : '30%', height: '100%', background: strengthColor, transition: 'all 0.3s ease' }} />
           </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', background: '#2a2a2a', padding: '20px', borderRadius: '12px' }}>
        <label>
          Largo: <b>{length}</b>
          <input type="range" min="6" max="30" value={length} onChange={(e) => setLength(parseInt(e.target.value))} style={{ width: '100%', accentColor: strengthColor }} />
        </label>
        <label style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
          <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} /> Incluir Números
        </label>
        <label style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
          <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} /> Incluir Símbolos
        </label>
      </div>

      <button onClick={generatePassword} style={{ marginTop: '10px', padding: '15px', background: '#444', fontWeight: 'bold' }}>🔄 Regenerar</button>
    </div>
  )
}

export default PasswordGenerator