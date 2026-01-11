'use client'

import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'

export default function CalmPlaylistPlayer() {
  const soundRef = useRef<Howl | null>(null)

  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [loopMode, setLoopMode] = useState<'track' | 'playlist'>('track')
  const playlist = [
    { id: 1, title: 'Calm Rain', src: '/calm-rain-ambience.mp3' },
    { id: 2, title: 'Forest Birds', src: '/forest-birds.mp3' },
    { id: 3, title: 'Ocean Waves', src: '/ocean-waves.mp3' },
  ]
  // Create / load sound
  useEffect(() => {
    soundRef.current?.unload()

    soundRef.current = new Howl({
      src: [playlist[index].src],
      volume,
      loop: loopMode === 'track',
      html5: true,
      onend: () => {
        if (loopMode === 'playlist') {
          next()
        }
      },
    })

    if (isPlaying) {
      soundRef.current.play()
    }

    return () => {
      soundRef.current?.unload()
    }
  }, [index])

  // Update volume
  useEffect(() => {
    soundRef.current?.volume(volume)
  }, [volume])

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

  const next = () => {
    setIsPlaying(true)
    setIndex((prev) => (prev + 1) % playlist.length)
  }

  const prev = () => {
    setIsPlaying(true)
    setIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1))
  }

  const toggleLoopMode = () => {
    setLoopMode((prev) => (prev === 'track' ? 'playlist' : 'track'))
  }

  return (
    <div style={{ maxWidth: 420, margin: 'auto', textAlign: 'center' }}>
      <h3>{playlist[index].title}</h3>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button onClick={prev}>⏮️</button>
        <button onClick={playPause}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={next}>⏭️</button>
        <button onClick={toggleLoopMode}>
          {loopMode === 'track' ? '🔁 Track' : '🔁 Playlist'}
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <label>
          Volume {Math.round(volume * 100)}%
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

      <ul style={{ marginTop: 20 }}>
        {playlist.map((track, i) => (
          <li key={track.id}>
            <button
              onClick={() => {
                setIndex(i)
                setIsPlaying(true)
              }}
              style={{
                fontWeight: i === index ? 'bold' : 'normal',
              }}
            >
              {track.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
