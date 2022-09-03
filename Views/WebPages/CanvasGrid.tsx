import React, { useEffect, useRef, useState } from 'react'
import {
  ReactSVGPanZoom,
  fitSelection,
  zoomOnViewerCenter,
  fitToViewer,
} from 'react-svg-pan-zoom'
import {
  selectLand,
  selectUpdateImage,
  selectZoomIn,
  setLand,
  setShowMenu,
  setViewState,
} from '../../components/reducers/Settings'
import { store } from '../../components/store'
import { useAppSelector } from '../../components/store/hooks'
import { useWeb3Context } from '../../context'
import { MetaadsContractUnsigned } from '../../utils/readOnly'
import { returnLand } from '../../utils/returnLand'
import {
  selectZoomLevel,
  selectZoomOut,
  selectShowMenu,
} from '../../components/reducers/Settings'

const CanvasGrid = (props: any) => {
  const [tool, setTool] = useState('auto')
  const Viewer = useRef(null)
  const [value, setValue] = useState({
    SVGMinX: 0,
    SVGMinY: 0,
    miniatureOpen: true,
    preventPanOutside: true,
    focus: true,
    lastAction: 'zoom',
  })
  const [selector, setSelector] = useState<any>()
  const [imagePreview, setImagePreview] = useState<any>(null)
  const [parcels, setParcels] = useState([])
  const [minProps, setMinProps] = useState({
    position: 'right',
    background: '#fff',
    height: 200,
    width: 200,
  })
  const [toolProps, setToolProps] = useState({ position: 'none' })
  const [moved, setMoved] = useState(false)
  const { address } = useWeb3Context()
  const [loaded, setLoaded] = useState(false)
  const land = useAppSelector(selectLand)
  const imageStore = useAppSelector(selectUpdateImage)
  const zoomLevel = useAppSelector(selectZoomLevel)
  const zoomIn = useAppSelector(selectZoomIn)
  const zoomOut = useAppSelector(selectZoomOut)

  useEffect(() => {
    Viewer.current.zoom(500, 0, 0.08)
  }, [])

  useEffect(() => {
    if (loaded) Viewer.current.zoomOnViewerCenter(1.1 * zoomLevel)
  }, [zoomOut])

  useEffect(() => {
    if (loaded) Viewer.current.zoomOnViewerCenter(0.08 * zoomLevel)
  }, [zoomIn])

  /* Read all the available methods in the documentation */
  const _zoomOnViewerCenter1 = () => Viewer.current.zoomOnViewerCenter(1.1)
  const _zoomOnViewerCenter3 = () => Viewer.current.zoomOnViewerCenter(0.9)

  const _fitSelection1 = () => Viewer.current.fitSelection(40, 40, 200, 200)
  const _fitToViewer1 = () => Viewer.current.fitToViewer()

  /* keep attention! handling the state in the following way doesn't fire onZoom and onPam hooks */
  const _zoomOnViewerCenter2 = () => setValue(zoomOnViewerCenter(value, 1.1))
  const _fitSelection2 = () => setValue(fitSelection(value, 40, 40, 200, 200))
  const _fitToViewer2 = () => setValue(fitToViewer(value))

  useEffect(() => {
    MetaadsContractUnsigned.getParcels().then((list) => {
      if (list.length > 0) setParcels(list)
      else {
        setParcels([])
      }
    })
  }, [])

  const handleSelectionEvents = async (x: number, y: number) => {
    returnLand(x, y, parcels, address)
    store.dispatch(
      setLand({
        x: x,
        y: y,
        h: land.h,
        w: land.h,
      })
    )
  }

  const returnSelector = (x: number, y: number) => {
    setLoaded(true)
    store.dispatch(setViewState(2))
    const coordX = Math.floor(x / 10) * 10
    const coordY = Math.floor(y / 10) * 10
    setSelector(
      <rect
        x={coordX}
        y={coordY}
        height={land.h * 10}
        width={land.w * 10}
        style={{ fill: '#fff' }}
      />
    )
    handleSelectionEvents(coordX / 10, coordY / 10)
  }

  useEffect(() => {
    setSelector(
      <rect
        x={land.x * 10}
        y={land.y * 10}
        height={land.h * 10}
        width={land.w * 10}
        style={{ fill: '#fff' }}
      />
    )
  }, [land.h, land.w])

  useEffect(() => {
    if (imagePreview) {
      setImagePreview(
        <image
          xlinkHref={imageStore}
          x={land.x * 10}
          y={land.y * 10}
          height={land.h * 10}
          width={land.w * 10}
        />
      )
    }
  }, [imageStore])

  return (
    <>
      <ReactSVGPanZoom
        ref={Viewer}
        width={'97vw'}
        height={'92vh'}
        background={'black'}
        SVGBackground={'black'}
        onClick={(event: { x: any; y: any }) =>
          returnSelector(event.x, event.y)
        }
        onTouchEnd={(event: { changedPoints: any; x: any; y: any }) =>
          {!moved ? returnSelector(event?.changedPoints[0]?.x, event?.changedPoints[0]?.y) : setMoved(false)}
        }
        onTouchMove={(e:any) => {setMoved(true)}}
        miniatureProps={minProps}
        toolbarProps={toolProps}
        tool={tool}
        toolBar="none"
        onChangeTool={(tool: React.SetStateAction<string>) => setTool(tool)}
        value={value}
        onChangeValue={(value: React.SetStateAction<{}>) => setValue(value)}
        scaleFactorMax={10}
        scaleFactorMin={0.07}
        scaleFactor={1.1}
        detectAutoPan={false}
        preventPanOutside={true}
      >
        <svg>
          <svg width={10001} height={10001} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="a"
                width={10}
                height={10}
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M10 0H0v10"
                  fill="none"
                  stroke="#a301b9"
                  strokeWidth="1"
                />
              </pattern>
              <pattern
                id="b"
                width={100}
                height={100}
                patternUnits="userSpaceOnUse"
              >
                <path fill="url(#a)" d="M0 0h100v100H0z" />
                <path d="M100 0H0v100" fill="none" stroke="#a301b9" />
              </pattern>
            </defs>
            <rect style={{ width: '100%', height: '100%' }} fill="url(#b)" />
            <image
              xlinkHref="https://api.quadspace.io/uploads/adspsdace.png"
              x="0"
              y="0"
              width={10000}
              height={10000}
            />
            {selector}
            {imagePreview}
          </svg>
        </svg>
      </ReactSVGPanZoom>
    </>
  )
}

export default CanvasGrid
