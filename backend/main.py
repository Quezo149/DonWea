import os
import glob
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import yt_dlp
import shutil

app = FastAPI()

# --- LIMPIEZA ---
if os.path.exists("downloads"):
    print("🧹 Limpieza de arranque: Borrando archivos temporales antiguos...")
    shutil.rmtree("downloads")
    os.makedirs("downloads")
else:
    os.makedirs("downloads")

# --- CONFIGURACIÓN ---
origins = ["http://localhost:5173", "https://donwea.cl", "https://www.donwea.cl"]

FAKE_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear carpeta downloads si no existe
if not os.path.exists("downloads"):
    os.makedirs("downloads")

def cleanup_file(path: str):
    try:
        if os.path.exists(path):
            os.remove(path)
            print(f"🧹 Archivo temporal eliminado: {path}")
    except Exception as e:
        print(f"⚠️ No se pudo borrar: {e}")

@app.get("/")
def home():
    return {"status": "OK", "message": "API DonWea V1"}

@app.get("/video-info")
def get_video_info(url: str):
    ydl_opts = {
        'quiet': True, 'no_warnings': True, 'format': 'best',
        'force_ipv4': True, 'socket_timeout': 15,
        'extract_flat': True, 'user_agent': FAKE_USER_AGENT,
        'noplaylist': True,
        'cookiefile': 'cookies.txt',
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            return {
                "title": info.get('title'),
                "thumbnail": info.get('thumbnail'),
                "duration": info.get('duration_string'),
                "views": info.get('view_count'),
                "author": info.get('uploader')
            }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error Info: {str(e)}")

@app.get("/download")
def download_video(url: str, type: str, format: str, background_tasks: BackgroundTasks):
    try:
        if type == 'audio' and format == 'aac':
            print("💡 Convirtiendo solicitud AAC -> M4A para soportar carátulas.")
            format = 'm4a'

        filename_template = "downloads/%(title)s.%(ext)s"
        
        # Lista de formatos que soportan carátula
        formats_with_thumbnail = ['mp3', 'mkv', 'mka', 'ogg', 'opus', 'flac', 'm4a', 'mp4', 'm4v', 'mov']
        
        should_embed_thumbnail = format in formats_with_thumbnail

        ydl_opts = {
            'outtmpl': filename_template,
            'quiet': True, 'restrictfilenames': True,
            'writethumbnail': should_embed_thumbnail, 
            'add_metadata': True,
            'force_ipv4': True, 'socket_timeout': 60,
            'user_agent': FAKE_USER_AGENT, 'noplaylist': True,
            'cookiefile': 'cookies.txt',
        }

        # Construcción de postprocesadores
        postprocessors = []

        if type == 'audio':
            ydl_opts['format'] = 'bestaudio/best'
            postprocessors.append({
                'key': 'FFmpegExtractAudio',
                'preferredcodec': format,
                'preferredquality': '192',
            })
        else:
            ydl_opts['format'] = f"bestvideo+bestaudio/best"
            ydl_opts['merge_output_format'] = format

        # Metadatos siempre
        postprocessors.append({'key': 'FFmpegMetadata'})

        # Miniatura solo si el formato lo aguanta
        if should_embed_thumbnail:
            postprocessors.append({'key': 'EmbedThumbnail'})
        
        ydl_opts['postprocessors'] = postprocessors

        print(f"⬇️ Iniciando descarga ({type}/{format})...")
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            temp_name = ydl.prepare_filename(info)
            base_name = os.path.splitext(temp_name)[0]

        # Búsqueda agnóstica de la extensión final
        found_files = glob.glob(f"{base_name}.*")
        final_file = None
        for f in found_files:
            if not f.lower().endswith(('.jpg', '.webp', '.png', '.json', '.part', '.ytdl')):
                final_file = f
                break

        if not final_file or not os.path.exists(final_file):
            raise Exception(f"No se encontró el archivo final para base: {base_name}")

        filename = os.path.basename(final_file)
        background_tasks.add_task(cleanup_file, final_file)
        
        print(f"✅ Enviando archivo: {filename}")
        return FileResponse(path=final_file, filename=filename, media_type='application/octet-stream')

    except Exception as e:
        print(f"❌ Error descarga: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")