import { useState, useEffect } from 'react'

function YoutubeDownloader() {
  const [url, setUrl] = useState('')
  const [videoInfo, setVideoInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Estados para la configuración de descarga
  const [downloadType, setDownloadType] = useState('video') // 'video' o 'audio'
  const [selectedFormat, setSelectedFormat] = useState('mp4')

  // Opciones disponibles
  const formatOptions = {
    video: ['mp4', 'mkv', 'webm'],
    audio: ['mp3', 'm4a', 'wav', 'flac', 'aac']
  }

  // Efecto: Cuando cambiamos entre Video/Audio, reseteamos el formato al primero de la lista
  useEffect(() => {
    setSelectedFormat(formatOptions[downloadType][0])
  }, [downloadType])

  async function handleSearch() {
    if (!url) return
    setLoading(true)
    setError('')
    setVideoInfo(null)

    try {
      const response = await fetch(`http://127.0.0.1:8000/video-info?url=${encodeURIComponent(url)}`)
      if (!response.ok) throw new Error('No se pudo encontrar el video.')
      const data = await response.json()
      setVideoInfo(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleDownload() {
      if (!url) return
      
      // Construimos la URL mágica del backend
      // encodeURIComponent es vital para que los símbolos (&, ?) de la URL de YT no rompan todo
      const downloadUrl = `http://127.0.0.1:8000/download?url=${encodeURIComponent(url)}&type=${downloadType}&format=${selectedFormat}`
      
      // Truco clásico: Redirigir el navegador a esa URL fuerza la descarga
      window.location.href = downloadUrl
      
      // Opcional: Avisar visualmente que empezó
      alert("🚀 La descarga ha comenzado en el servidor.\nDependiendo del largo del video, puede tardar unos segundos en aparecer el archivo.")
    }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2>📺 Descargador Flexible</h2>
      <p style={{ color: '#888', marginBottom: '20px' }}>Pega el enlace y configura tu salida.</p>

      {/* Buscador */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="https://www.youtube.com/watch?v=..." 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #444', background: '#222', color: 'white' }}
        />
        <button onClick={handleSearch} disabled={loading} style={{ padding: '12px 20px', cursor: 'pointer' }}>
          {loading ? 'Buscando...' : '🔍 Buscar'}
        </button>
      </div>

      {error && <div style={{ color: '#ff6b6b', marginBottom: '20px' }}>⚠️ {error}</div>}

      {videoInfo && (
        <div style={{ background: '#2a2a2a', padding: '20px', borderRadius: '15px', border: '1px solid #444', animation: 'fadeIn 0.5s' }}>
          
          <img src={videoInfo.thumbnail} alt="Miniatura" style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{videoInfo.title}</h3>
          <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>
             {videoInfo.duration} • {parseInt(videoInfo.views).toLocaleString()} vistas
          </p>

          {/* ZONA DE CONFIGURACIÓN */}
          <div style={{ background: '#333', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
            
            {/* 1. Selector Tipo (Video vs Audio) */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px' }}>
              <label style={{ cursor: 'pointer', background: downloadType === 'video' ? '#646cff' : '#444', padding: '8px 15px', borderRadius: '5px' }}>
                <input 
                  type="radio" 
                  name="type" 
                  checked={downloadType === 'video'} 
                  onChange={() => setDownloadType('video')} 
                  style={{ display: 'none' }}
                />
                🎬 Video
              </label>
              <label style={{ cursor: 'pointer', background: downloadType === 'audio' ? '#646cff' : '#444', padding: '8px 15px', borderRadius: '5px' }}>
                <input 
                  type="radio" 
                  name="type" 
                  checked={downloadType === 'audio'} 
                  onChange={() => setDownloadType('audio')} 
                  style={{ display: 'none' }}
                />
                🎵 Audio
              </label>
            </div>

            {/* 2. Selector Formato */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span>Formato:</span>
              <select 
                value={selectedFormat} 
                onChange={(e) => setSelectedFormat(e.target.value)}
                style={{ padding: '8px', borderRadius: '5px', background: '#222', color: 'white', border: '1px solid #555' }}
              >
                {formatOptions[downloadType].map(fmt => (
                  <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
                ))}
              </select>
            </div>

          </div>

          <button 
            onClick={handleDownload}
            style={{ 
              background: '#2ecc71', color: 'white', border: 'none', 
              padding: '15px 40px', borderRadius: '8px', fontSize: '1rem', 
              fontWeight: 'bold', cursor: 'pointer', width: '100%' 
            }}
          >
            Descargar {downloadType === 'video' ? 'Video' : 'Audio'} ({selectedFormat.toUpperCase()})
          </button>
        </div>
      )}
    </div>
  )
}

export default YoutubeDownloader