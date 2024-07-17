import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

const Tile: NextPage = () => {
  const [backgroundColor, setBackgroundColor] = useState('')
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return

      const { color } = event.data
      if (color) {
        setBackgroundColor(color)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        width: '100vw',
        height: '100vh',
      }}
    >
      New Tile
    </div>
  )
}

export default Tile
