import { TileAttributes } from '@/shared/interfaces/TileAttributes'
import React, {
  FunctionComponent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { BsFillBrushFill } from 'react-icons/bs'
import { MdOpenInNew } from 'react-icons/md'

type Props = {
  singleTile: TileAttributes
  tiles: TileAttributes[]
  setTiles: (value: TileAttributes[]) => void
  selectedTileWindowRef: MutableRefObject<Window | null | undefined>
}
const SingleTilePreviewContainer: FunctionComponent<Props> = ({
  singleTile,
  tiles,
  setTiles,
  selectedTileWindowRef,
}) => {
  const [updatedColor, setUpdatedColor] = useState('')
  const colorInputRef = useRef<HTMLInputElement>(null)

  const handleFocusWindowClick = useCallback(() => {
    if (singleTile.popupWindow && !singleTile.popupWindow?.closed) {
      singleTile.popupWindow.focus()
      selectedTileWindowRef.current = singleTile.popupWindow
    } else {
      const newWindow = window.open(
        '/tile',
        '_blank',
        `width=300,height=300,left=${singleTile.left},top=${singleTile.top}`
      )

      if (newWindow) {
        newWindow.onload = () => {
          newWindow.postMessage({ color: singleTile.color }, '*')
          singleTile.popupWindow?.focus()
          singleTile.popupWindow = newWindow
          selectedTileWindowRef.current = newWindow
        }
      }
    }
  }, [selectedTileWindowRef, singleTile])
  useEffect(() => {
    if (selectedTileWindowRef.current && updatedColor !== '') {
      setTiles(
        tiles.map((tile) =>
          tile.id === singleTile.id ? { ...tile, color: updatedColor } : tile
        )
      )
      selectedTileWindowRef.current.postMessage(
        { color: updatedColor },
        window.location.origin
      )
      setUpdatedColor('')
    }
  }, [updatedColor, tiles, setTiles, singleTile.id, selectedTileWindowRef])
  return (
    <div
      className='d-flex flex-row justify-content-end align-items-end'
      style={{
        width: 120,
        height: 120,
        backgroundColor: singleTile.color,
        left: singleTile.left,
        top: singleTile.top,
      }}
    >
      <div className='d-flex flex-row justify-content-end align-items-end gap-2 mx-2'>
        <MdOpenInNew
          onClick={handleFocusWindowClick}
          style={{
            cursor: 'pointer',
            fontSize: '30px',
            color: '#ffffff',
          }}
        />

        <div
          style={{
            fontSize: '30px',
          }}
        >
          <input
            type='color'
            ref={colorInputRef}
            value={singleTile.color}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUpdatedColor(event.target.value)
            }
            style={{
              visibility: 'hidden',
            }}
          />
          <BsFillBrushFill
            onClick={() => {
              selectedTileWindowRef.current = singleTile.popupWindow
              if (colorInputRef.current) {
                colorInputRef.current.click()
              }
            }}
            style={{
              cursor: 'pointer',
              fontSize: '30px',
              color: '#ffffff',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SingleTilePreviewContainer
