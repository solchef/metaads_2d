/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { ReactSVGPanZoom } from 'react-svg-pan-zoom'
import {
  selectLand,
  selectUpdateImage,
  selectZoomIn,
  setLand,
  setShowMenu,
  setViewState,
  setZoomLevel,
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
import { Loader } from '../../utils/loader'

const CanvasGrid = ({ setLoaded, loaded }) => {
  const [tool, setTool] = useState('auto')
  const Viewer = useRef(null)
  const [value, setValue] = useState({
    SVGMinX: 0,
    SVGMinY: 0,
    miniatureOpen: false,
    preventPanOutside: true,
    focus: true,
    lastAction: 'zoom',
    d: 0.042
  })
  const [selector, setSelector] = useState<any>()
  const [imagePreview, setImagePreview] = useState<any>(null)
  const [parcels, setParcels] = useState([])
  const [minProps, setMinProps] = useState({
    position: 'none',
    background: '#fff',
    height: 200,
    width: 200,
  })
  const [toolProps, setToolProps] = useState({ position: 'none' })
  const [moved, setMoved] = useState(false)
  const [pinched, setPinched] = useState(false)
  const { address } = useWeb3Context()
  const [zoomed, setZoomed] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [strokeWidth, setStrokeWidth] = useState(1)
  const land = useAppSelector(selectLand)
  const imageStore = useAppSelector(selectUpdateImage)
  const zoomLevel = useAppSelector(selectZoomLevel)
  const zoomIn = useAppSelector(selectZoomIn)
  const zoomOut = useAppSelector(selectZoomOut)

  useEffect(() => {
    window.innerWidth >= 768
      ? Viewer.current.zoom(600, 10, 0.08)
      : Viewer.current.zoom(0, 100, 0.042) && setIsMobile(true)
  }, [])

  useEffect(() => {
    zoomed && Viewer.current.zoomOnViewerCenter(1.5)
  }, [zoomIn])

  useEffect(() => {
    zoomed && Viewer.current.zoomOnViewerCenter(0.68)
  }, [zoomOut])

  useEffect(() => {
    if(loaded){
      const zoomRanges = [
        0.08, 0.12, 0.18, 0.27, 0.405, 0.605, 0.9112, 1.3668, 2.05, 2.9,
     ]
     let currZoom = 1
     zoomRanges.forEach((element, i) => {
       if (value.d > (window.innerWidth <= 768 ?  element/1.9 : element)) currZoom = i + 1
     })
     store.dispatch(setZoomLevel(currZoom))
    }
  
  }, [value])

  useEffect(() => {
    zoomLevel > 0 && setZoomed(true)
    zoomLevel <= 4 && setStrokeWidth(3)
    zoomLevel > 4 && setStrokeWidth(1)
    zoomLevel >= 7 && setStrokeWidth(0.7)
  }, [zoomLevel])

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
    setMoved(false)
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
    // setLoaded(true)
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
  // console.log(loaded)
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
      <div style={{ display: loaded ? 'none' : 'block' }}>
        <Loader />
      </div>
      <ReactSVGPanZoom
        ref={Viewer}
        width={window.innerWidth}
        height={window.innerHeight}
        background={'black'}
        SVGBackground={'black'}
        onClick={(event: { x: any; y: any }) =>
          returnSelector(event.x, event.y)
        }
        onTouchStart={(e: any) => 
           setPinched(e.originalEvent.targetTouches.length === 2)
           }

        onTouchMove={(e: any) => 
            setMoved( e.value.startX !== e.value.endX &&
              e.value.startY !== e.value.endY )
        }

        onTouchEnd={(event: {
          changedPoints: any
        }) => {
            if(moved == false && pinched == false){
              returnSelector(
                event.changedPoints[0].x,
                event.changedPoints[0].y
              )
            }else{
              setMoved(false)
            }
  
        }}
        miniatureProps={minProps}
        toolbarProps={toolProps}
        tool={tool}
        toolBar="none"
        onChangeTool={(tool: React.SetStateAction<string>) => setTool(tool)}
        value={value}
        onChangeValue={(value: React.SetStateAction<any>) => setValue(value)}
        scaleFactorMax={window.innerWidth <= 768 ? 1.5 : 3.075}
        scaleFactorMin={window.innerWidth <= 768 ? 0.042 : 0.08}
        scaleFactor={1.1}
        scaleFactorOnWheel={1.1}
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
                  strokeWidth={strokeWidth}
                />
              </pattern>
              <pattern
                id="b"
                width={100}
                height={100}
                patternUnits="userSpaceOnUse"
              >
                <path fill="url(#a)" d="M0 0h100v100H0z" />
                <path
                  d="M100 0H0v100"
                  fill="none"
                  stroke="#a301b9"
                  strokeWidth={strokeWidth * 1.5}
                />
              </pattern>
            </defs>
            <rect style={{ width: '100%', height: '100%' }} fill="url(#b)" />
            <image
              xlinkHref="https://api.quadspace.io/uploads/adspsdace.png"
              x="0"
              y="0"
              width={10000}
              height={10000}
              onLoad={() => setLoaded(true)}
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
