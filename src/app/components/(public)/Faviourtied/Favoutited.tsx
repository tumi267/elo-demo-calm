'use client'

import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'

interface Props {
  title: string
  src: string
}

export default function Faviourted({ title, src }: Props) {
  const soundRef = useRef<Howl | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [loopMode, setLoopMode] = useState<'track' | 'playlist'>('track')

  // Init Howler
  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      volume,
      loop: loopMode === 'track',
      html5: true, // important for mobile / Netlify
      onend: () => {
        if (loopMode === 'track') {
          soundRef.current?.play()
        }
      },
    })

    return () => {
      soundRef.current?.unload()
    }
  }, [src])

  // Update volume
  useEffect(() => {
    soundRef.current?.volume(volume)
  }, [volume])

  // Update loop mode
  useEffect(() => {
    soundRef.current?.loop(loopMode === 'track')
  }, [loopMode])

  const playPause = () => {
    if (!soundRef.current) return

    if (soundRef.current.playing()) {
      soundRef.current.pause()
      setIsPlaying(false)
    } else {
      soundRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleLoopMode = () => {
    setLoopMode((prev) => (prev === 'track' ? 'playlist' : 'track'))
  }

  return (
    <div style={{ maxWidth: 500, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h3>{title}</h3>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={playPause}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <button onClick={toggleLoopMode}>
          {loopMode === 'track' ? '🔁 Track' : '🔁 No Loop'}
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
