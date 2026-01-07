'use client'
import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

const audioList = [
  { title: 'Calm Rain', src: '/calm-rain-ambience.mp3' },
  { title: 'Forest Birds', src: '/forest-birds.mp3' },
  { title: 'Ocean Waves', src: '/ocean-waves.mp3' },
]
interface props{
    title: string
    src :string
}

export default function Faviourted({title,src}:props) {
  const waveformRef = useRef<HTMLDivElement | null>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)


  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [loopMode, setLoopMode] = useState<'track' | 'playlist'>('track')

  // Initialize WaveSurfer
  useEffect(() => {
    if (!waveformRef.current) return

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#888',
      progressColor: '#1DB954',
      cursorColor: '#333',
      barWidth: 2,
      height: 100,
      normalize: true,
    })

    wavesurferRef.current.load(src)
    wavesurferRef.current.setVolume(volume)

    wavesurferRef.current.on('finish', () => {
      if (loopMode === 'track') {
        wavesurferRef.current?.play()
      } else {
     
      }
    })

    return () => {
      wavesurferRef.current?.destroy()
    }
  }, [])

  // Load new track when currentIndex changes
  useEffect(() => {
    wavesurferRef.current?.load(src)
    if (isPlaying) {
      wavesurferRef.current?.play()
    }
  }, [])

  // Update volume
  useEffect(() => {
    wavesurferRef.current?.setVolume(volume)
  }, [volume])

  const playPause = () => {
    if (!wavesurferRef.current) return
    wavesurferRef.current.playPause()
    setIsPlaying(wavesurferRef.current.isPlaying())
  }


  const toggleLoopMode = () => {
    setLoopMode((prev) => (prev === 'track' ? 'playlist' : 'track'))
  }


  return (
    <div style={{ maxWidth: 500, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h3>Now Playing: {title}</h3>

      {/* Waveform */}
      <div ref={waveformRef} style={{ marginBottom: 20 }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
      
        <button onClick={playPause}>{isPlaying ? '⏸️' : '▶️'}</button>
        
        <button onClick={toggleLoopMode}>
          {loopMode === 'track' ? '🔁 Track' : '🔁 Playlist'}
        </button>
      </div>

      {/* Volume */}
      <div>
        <label>
          Volume: {Math.round(volume * 100)}%
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  )
}
