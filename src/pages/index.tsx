import SingleTilePreviewContainer from '@/components/SingleTilePreviewContainer'
import { TileAttributes } from '@/shared/interfaces/TileAttributes'
import { NextPage } from 'next'
import { useCallback, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const LandingPage: NextPage = () => {
  const [tiles, setTiles] = useState<TileAttributes[]>([])
  const [chosenColor, setChosenColor] = useState('#00FFFF')
  const selectedTileWindowRef = useRef<Window | null | undefined>()
  const handleNewTileClick = useCallback(() => {
    let left = 0
    let top = 0

    if (tiles.length > 0) {
      const lastPosition = tiles[tiles.length - 1]
      top = lastPosition.top + 400
      left = lastPosition.left
      if (lastPosition.top + 700 >= window.innerHeight) {
        top = 0
        left = lastPosition.left + 550
      }
    }

    const newWindow = window.open(
      '/tile',
      '_blank',
      `width=300,height=300,left=${left},top=${top}`
    )

    if (newWindow) {
      newWindow.onload = () => {
        selectedTileWindowRef.current = newWindow
        newWindow.postMessage({ color: chosenColor }, '*')
        setTiles([
          ...tiles,
          {
            id: uuidv4(),
            color: chosenColor,
            left,
            top,
            popupWindow: newWindow,
          },
        ])
      }
    }
  }, [chosenColor, tiles])

  return (
    <div className='d-flex flex-column gap-3 mx-4'>
      <div
        style={{
          width: '100vw',
        }}
      >
        <h1 className='my-4'>Create external tiles!</h1>
        <div className='d-flex flex-row gap-3 align-items-center '>
          <h3 className='my-4'>Chose a color</h3>
          <input
            type='color'
            value={chosenColor}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setChosenColor(event.target.value)
            }
            style={{
              cursor: 'pointer',
            }}
          />
        </div>
        <button className='btn btn-primary' onClick={handleNewTileClick}>
          Click Here
        </button>
      </div>
      <div>
        <h2 className='my-4'>Tiles</h2>
        <div className='d-flex flex-row flex-wrap gap-3 align-items-center gap-3'>
          {tiles.map((singleTile) => (
            <SingleTilePreviewContainer
              key={singleTile.id}
              singleTile={singleTile}
              tiles={tiles}
              setTiles={setTiles}
              selectedTileWindowRef={selectedTileWindowRef}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default LandingPage
