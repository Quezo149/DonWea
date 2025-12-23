import { useEffect, useState } from "react";

function PassGenerator() {
    const [length, setLength] = useState(12);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState("");

    function generatePassword() {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let numbers = "0123456789";
        let symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
        
        if (includeNumbers) characters += numbers;
        if (includeSymbols) characters += symbols;

        let newPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            newPassword += characters[randomIndex]
        }
        setPassword(newPassword);
    }

    useEffect(() => {
    generatePassword()
    }, [length, includeNumbers, includeSymbols])

    function copyToClipboard() {
    if (password) {
      navigator.clipboard.writeText(password)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>🔐 Generador de Passwords</h2>
            
            {/* Pantalla de resultado */}
            <div style={{ background: '#333', padding: '15px', borderRadius: '8px', wordBreak: 'break-all', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontFamily: 'monospace' }}>
                {password || 'Haz click en Generar'}
                </span>
                {password && (
                <button onClick={copyToClipboard} style={{ marginLeft: '10px', fontSize: '0.8rem' }}>Copiar</button>
                )}
            </div>

            {/* Controles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                <label>
                Largo: <b>{length}</b>
                <input 
                    type="range" min="6" max="30" 
                    value={length} 
                    onChange={(e) => setLength(e.target.value)}
                    style={{ width: '100%' }}
                />
                </label>

                <label style={{ display: 'flex', gap: '10px' }}>
                <input 
                    type="checkbox" 
                    checked={includeNumbers} 
                    onChange={(e) => setIncludeNumbers(e.target.checked)} 
                />
                Incluir Números
                </label>

                <label style={{ display: 'flex', gap: '10px' }}>
                <input 
                    type="checkbox" 
                    checked={includeSymbols} 
                    onChange={(e) => setIncludeSymbols(e.target.checked)} 
                />
                Incluir Símbolos
                </label>
            </div>

            <button onClick={generatePassword} style={{ marginTop: '10px', padding: '10px', background: '#444' }}>
            🔄 Regenerar otra
            </button>
        </div>
    )
}

export default PassGenerator
