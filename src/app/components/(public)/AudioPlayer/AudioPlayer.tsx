'use client'
import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

const audioList = [
  { title: 'Calm Rain', src: '/calm-rain-ambience.mp3' },
  { title: 'Forest Birds', src: '/forest-birds.mp3' },
  { title: 'Ocean Waves', src: '/ocean-waves.mp3' },
]

export default function WaveformPlayer() {
  const waveformRef = useRef<HTMLDivElement | null>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [loopMode, setLoopMode] = useState<'track' | 'playlist'>('track')
  const [favorites, setFavorites] = useState<number[]>([]) // store favorited track indices

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

    wavesurferRef.current.load(audioList[currentIndex].src)
    wavesurferRef.current.setVolume(volume)

    wavesurferRef.current.on('finish', () => {
      if (loopMode === 'track') {
        wavesurferRef.current?.play()
      } else {
        nextTrack()
      }
    })

    return () => {
      wavesurferRef.current?.destroy()
    }
  }, [])

  // Load new track when currentIndex changes
  useEffect(() => {
    wavesurferRef.current?.load(audioList[currentIndex].src)
    if (isPlaying) {
      wavesurferRef.current?.play()
    }
  }, [currentIndex])

  // Update volume
  useEffect(() => {
    wavesurferRef.current?.setVolume(volume)
  }, [volume])

  const playPause = () => {
    if (!wavesurferRef.current) return
    wavesurferRef.current.playPause()
    setIsPlaying(wavesurferRef.current.isPlaying())
  }

  const nextTrack = () => {
    setIsPlaying(false)
    
    setCurrentIndex((prev) => (prev + 1) % audioList.length)
    setIsPlaying(true)
  }

  const prevTrack = () => {
    setIsPlaying(false)
    setCurrentIndex((prev) => (prev === 0 ? audioList.length - 1 : prev - 1))
    setIsPlaying(true)
  }

  const toggleLoopMode = () => {
    setLoopMode((prev) => (prev === 'track' ? 'playlist' : 'track'))
  }

  const toggleFavorite = (index: number) => {
    setFavorites((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <div style={{ maxWidth: 500, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h3>Now Playing: {audioList[currentIndex].title}</h3>

      {/* Waveform */}
      <div ref={waveformRef} style={{ marginBottom: 20 }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={prevTrack}>⏮️</button>
        <button onClick={playPause}>{isPlaying ? '⏸️' : '▶️'}</button>
        <button onClick={nextTrack}>⏭️</button>
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

      {/* Playlist */}
      <h4>Playlist:</h4>
      <ul>
        {audioList.map((track, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <button
              onClick={() => {
                // is play stop audio the play
                setCurrentIndex(i)
                setIsPlaying(true)
              }}
            >
              {currentIndex === i ? '🎵 ' : ''}{track.title}
            </button>
            <button
              onClick={() => toggleFavorite(i)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {favorites.includes(i) ? '❤️' : '🤍'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
