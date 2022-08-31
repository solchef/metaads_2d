import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { DoubleSide, Vector3 } from 'three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import { useAppDispatch, useAppSelector } from '../../components/store/hooks'
import { vertexShader, fragmentShader } from './shaders'
import {
  selectLand,
  selectUpdateImage,
  selectZoomIn,
  selectZoomOut,
  select_3dMode,
  setLand,
  setMiniMapPosition,
  setSelectedLand,
  setShowMenu,
  setViewState,
  setZoomLevel,
} from '../../components/reducers/Settings'
import { store } from '../../components/store'
// import useSound from 'use-sound'
import { MetaadsContractUnsigned } from '../../utils/readOnly'
import { useWeb3Context } from '../../context'
import { returnLand } from '../../utils/returnLand'

let oldx, oldy

const isMobile = window.innerWidth <= 768
// const materialList = []
console.log(isMobile)
export const MiniMap = () => {
  // const imageStore = useAppSelector(selectImage)
  // const canvas = document.getElementById('mycanvas').children[0].children[0]
  // console.log(canvas)
  // const img = canvas.toDataURL('image/png')
  // console.log(img)
  // return (
  //   <div>
  //     <img
  //       src={img}
  //       style={{
  //         width: '250px',
  //         height: '250px',
  //         // background: 'url(blank.svg)',
  //         // backgroundSize: '250px 250px',
  //       }}
  //     />
  //     <ViewedAria zoomLevel={store.getState().settings.zoomLevel} />
  //   </div>
  // )
}

export const MapView = ({ minMap, texture1, texture2, texture3 }) => {
  const _3dMode = useAppSelector(select_3dMode)
  const land = useAppSelector(selectLand)
  const imageStore = useAppSelector(selectUpdateImage)
  const orbit = useRef()
  const zoomIn = useAppSelector(selectZoomIn)
  const zoomOut = useAppSelector(selectZoomOut)
  const [buyMode, setBuyMode] = useState(false)
  const [image, setImageState] = useState()
  const [ownerLandList, SetOwnerLandList] = useState([])
  const [parcels, setParcels] = useState([])
  const dispatch = useAppDispatch()

  //
  const { address } = useWeb3Context()

  useEffect(() => {
    if (orbit.current) {
      orbit.current.enableRotate = _3dMode
      if (_3dMode) {
        orbit.current.minPolarAngle = 0.5
        orbit.current.maxPolarAngle = Math.PI / 2.25
      } else {
        orbit.current.minPolarAngle = 0
        orbit.current.maxPolarAngle = 0
      }
    }
  }, [_3dMode])

  useEffect(() => {
    MetaadsContractUnsigned.getParcels().then((list) => {
      if (list.length > 0) setParcels(list)
      else {
        setParcels([])
      }
    })
  }, [])

  // load user Lands
  useEffect(() => {
    let markedOwned = []
    parcels.forEach((land) => {
      if (address) {
        if (address.toLowerCase() == land.owner.toLowerCase()) {
          let x = Number(land.coord) % 1000
          let y = Math.ceil(Number(land.coord) / 1000)
          markedOwned.push({
            landPosition: new Vector3(x - 1, 1, y - 1),
            landSize: { w: Number(land.width), h: Number(land.width) },
          })
        }
      }
    })
    SetOwnerLandList(markedOwned)
    // console.log(markedOwned)
  }, [])

  useEffect(() => {
    let zoomNumber = 143
    if (isMobile) zoomNumber = 209
    if (orbit.current && store.getState().settings.zoomLevel <= 10) {
      if (orbit.current.object.position.y - zoomNumber > 20)
        orbit.current.object.position.y -= zoomNumber
      else orbit.current.object.position.y = 20

      orbit.current.update()
    }
  }, [zoomIn])

  useEffect(() => {
    let zoomNumber = 143
    if (isMobile) zoomNumber = 209
    if (orbit.current && store.getState().settings.zoomLevel >= 1) {
      orbit.current.object.position.y += zoomNumber
      orbit.current.update()
    }
  }, [zoomOut])

  useEffect(() => {
    setBuyMode(true)
  }, [])

  //landPosition = new Vector3(x,y,z) y always = 0.5
  // landSize = { w:width, h:height }
  const OwnerLans = (landPosition, landSize) => {
    // console.log(landPosition)
    return (
      <mesh
        position={[
          landPosition.x - 500 + 0.5,
          0.02,
          landPosition.y - 500 + 0.5,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeBufferGeometry args={[landSize.w, landSize.h]} />
        <meshBasicMaterial map={texture3} attach="material" side={DoubleSide} />
      </mesh>
    )
  }

  return (
    <Canvas
      flat
      linear
      gl={{ preserveDrawingBuffer: true }}
      style={
        minMap
          ? {
              height: '250px',
              width: '250px',
              backgroundColor: '#000',
            }
          : { height: '100vh', width: '100%', backgroundColor: '#000' }
      }
    >
      <group>
        <Suspense fallback={<></>}>
          <>
            <GreenSquare
              x={land.h}
              y={land.w}
              miniMap={minMap}
              texture2={texture2}
              texture={texture1}
              uploadImage={imageStore}
              address={address}
              parcels={parcels}
            />
            <group>
              {ownerLandList.map((data, index) => {
                return (
                  <OwnerLans
                    key={index}
                    texture={data.texture}
                    landPosition={data.landPosition}
                    landSize={data.landSize}
                  />
                )
              })}
            </group>
          </>
          <PerspectiveCamera
            position={[0, isMobile ? 1900 : 1300, 0]}
            makeDefault
          />
          <OrbitControls
            ref={orbit}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.25}
            minAzimuthAngle={0}
            maxAzimuthAngle={0}
            minZoom={0}
            maxZoom={1600}
            minDistance={90}
            maxDistance={isMobile ? 1900 : 1300}
            enableDamping={false}
            mouseButtons={{ LEFT: 2, MIDDLE: 1, RIGHT: 0 }}
            onChange={() => {
              onWheel(orbit.current.object)
              dispatch(
                setMiniMapPosition({
                  x: orbit.current.object.position.x,
                  y: orbit.current.object.position.z,
                })
              )
            }}
            enablePan={!minMap}
            touches={{
              ONE: buyMode ? 1 : 2,
              TWO: 2,
            }}
            enableRotate={false}
          />
        </Suspense>
      </group>
      <ambientLight />
    </Canvas>
  )
}

const GreenSquare = ({
  x,
  y,
  miniMap,
  texture,
  texture2,
  uploadImage,
  address,
  parcels,
}) => {
  // const [playError] = useSound('./errorSound.mp3')
  const ref = useRef()
  const land = useRef()
  const boughtedLandListData = store.getState().settings.boughtedLandList
  const widthMap = 1000
  const heightMap = 1000
  const { gl } = useThree()
  THREE.Cache.enabled = true

  if (isMobile) gl.setPixelRatio(1)
  if (miniMap) gl.setPixelRatio(0.4)

  const [boxPosition, setBoxPosition] = useState(new Vector3(0, 0, 0))
  const [viewLand, setViewLand] = useState(false)
  const [owned, setOwned] = useState([])

  const [landPosition, setLandPosition] = useState(new Vector3(0, 0, 0))
  const [moseMoved, setMouseMoved] = useState(false)

  const cubeRef = useRef()
  const onMove = (point) => {
    setBoxPosition(new Vector3(Math.floor(point.x), 0.5, Math.floor(point.z)))
    setMouseMoved(false)
  }

  useEffect(() => {
    let result = 0
    if (oldx !== undefined) result = oldx - x
    const selectedMap = getSelectedMap(landPosition)
    if (selectedMap === undefined) {
      setLandPosition(
        new Vector3(landPosition.x - result / 2, landPosition.y, landPosition.z)
      )
    } else {
      // playError()
    }
    oldx = x
  }, [x])

  useEffect(() => {
    let result = 0
    if (oldy !== undefined) result = oldy - y
    const selectedMap = getSelectedMap(landPosition)
    if (selectedMap === undefined)
      setLandPosition(
        new Vector3(landPosition.x, landPosition.y, landPosition.z - result / 2)
      )
    else {
      // playError()
    }
    oldy = y
  }, [y])

  const getSelectedMap = (point) => {
    return boughtedLandListData.find(
      (data) =>
        data.attributes[1].value >= Math.floor(point.x) + widthMap / 2 &&
        data.attributes[1].value < Math.floor(point.x) + widthMap / 2 + x &&
        data.attributes[0].value >= boxPosition.z + heightMap / 2 &&
        data.attributes[0].value < boxPosition.z + heightMap / 2 + y
    )
  }

  const onPointUp = async (point) => {
    if (moseMoved || isMobile) {
      setViewLand(true)
      onMove(point)
      if (
        Math.sign(boxPosition.x + widthMap / 2) !== -1 &&
        Math.sign(boxPosition.z + heightMap / 2) !== -1
      ) {
        if (
          boxPosition.x + widthMap / 2 <= widthMap - x &&
          boxPosition.z + heightMap / 2 <= heightMap - y
        ) {
          const result = getSelectedMap(point)
          if (result !== undefined) {
            store.dispatch(setSelectedLand(result))
            store.dispatch(setViewState(3))
          } else if (
            result === undefined ||
            store.getState().settings.viewState !== 1
          ) {
            setLandPosition(
              new Vector3(
                Math.floor(point.x) + x / 2,
                0.05,
                Math.floor(point.z) + y / 2
              )
            )
            store.dispatch(setViewState(2))
            returnLand(
              Math.floor(point.x) + widthMap / 2,
              Math.floor(point.z) + heightMap / 2,
              parcels,
              address
            )
            store.dispatch(
              setLand({
                x: boxPosition.x + widthMap / 2,
                y: boxPosition.z + heightMap / 2,
                h: x,
                w: y,
              })
            )
            //playBuild()
          } else {
            // playError()
          }
        } else {
          // playError()
        }
      } else {
        // playError()
      }
      store.dispatch(setShowMenu(true))
    } else {
      store.dispatch(
        setLand({
          x: boxPosition.x + widthMap / 2,
          y: boxPosition.z + heightMap / 2,
          h: x,
          w: y,
        })
      )
    }

    setMouseMoved(true)
  }

  return (
    <>
      <mesh
        ref={cubeRef}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1, 1, 1]}
        onClick={({ point, nativeEvent }) => {
          if (nativeEvent.which !== 3) onPointUp(point)
        }}
        onPointerDown={(e) => {
          setMouseMoved(true)
        }}
        onPointerMove={({ point }) => {
          onMove(point)
        }}
      >
        <planeBufferGeometry args={[widthMap, heightMap]} />
        <shaderMaterial
          uniforms={{
            bumpTexture: { value: texture },
            bumpTexture2: { value: texture2 },
            // bumpTexture3: { value: texture },
            brightness: { value: 1.9 },
            // bumpScale: { value: 100 },
            // color: { value: '0xffffff' },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          // side={DoubleSide}
        />
      </mesh>
      {/* {viewBox && !store.getState().settings.selectMode ? (
            <mesh position={boxPosition} ref={ref}>
              <boxBufferGeometry args={[x, z, y]} attach="geometry" />
              <meshPhongMaterial color={color2} attach="material" />
            </mesh>
          ) : (
            ''
          )} */}
      {/* {console.log(uploadImge)} */}
      {viewLand ? (
        <mesh position={landPosition} ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
          <planeBufferGeometry args={[x, y]} />
          <meshBasicMaterial
            ref={land}
            map={uploadImage}
            color="#ffffff"
            attach="material"
            side={DoubleSide}
          />
        </mesh>
      ) : (
        ''
      )}
      {/* {miniMap ? (
        <ViewedAria zoomLevel={store.getState().settings.zoomLevel} />
      ) : (
        ''
      )} */}
    </>
  )
}
const ViewedAria = (zoomLevel) => {
  const [xPosition, setXPosition] = useState(0)
  const [yPosition, setYPosition] = useState(0)
  const fullWidth = 1000
  const fullHeight = 1000
  const conWidth = document.getElementById('mini-map-container')?.clientWidth
  const conHeight = document.getElementById('mini-map-container')?.clientHeight
  const [width, setWidth] = useState(conWidth)
  const [height, setHight] = useState(conHeight)

  const getResize = (zoom) => {
    setXPosition(store.getState().settings.miniMapPosition.x)
    setYPosition(store.getState().settings.miniMapPosition.y)
    if (zoom === 10) {
      setWidth(350)
      setHight(250)
    }
    if (zoom === 9) {
      setWidth(300)
      setHight(225)
    }
    if (zoom === 8) {
      setWidth(250)
      setHight(200)
    }
    if (zoom === 7) {
      setWidth(200)
      setHight(175)
    }
    if (zoom === 6) {
      setWidth(150)
      setHight(150)
    }
    if (zoom === 5) {
      setWidth(100)
      setHight(100)
    }
    if (zoom === 4) {
      setWidth(75)
      setHight(75)
    }
    if (zoom === 3) {
      setWidth(50)
      setHight(50)
    }
    if (zoom === 2) {
      setWidth(25)
      setHight(25)
    }
    if (zoom === 1) {
      setWidth(0)
      setHight(0)
    }
  }

  useEffect(() => {
    getResize(zoomLevel.zoomLevel)
  }, [])

  store.subscribe(() => {
    getResize(store.getState().settings.zoomLevel)
  })

  return (
    <div
      id="main"
      style={{
        backgroundColor: '#00000000',
        width: fullWidth,
        height: fullHeight,
        top: -375 + yPosition / 5,
        left: -375 + xPosition / 10,
        position: 'absolute',
      }}
    >
      <div
        id="top"
        style={{
          backgroundColor: '#0000007d',
          width: fullWidth,
          height: 375 + height / 2,
        }}
      ></div>
      <div
        id="center"
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          id="left"
          style={{
            backgroundColor: '#0000007d',
            width: conWidth + width,
            height: conHeight - height,
            float: 'left',
          }}
        ></div>
        <div
          id="view"
          style={{
            border: 'solid 2px red',
            width: conWidth - width,
            height: conHeight - height,
            // height: window.innerHeight / 5,
          }}
        ></div>
        <div
          id="right"
          style={{
            backgroundColor: '#0000007d',
            width: conWidth + width,
            height: conHeight - height,
            float: 'right',
          }}
        ></div>
      </div>
      <div
        id="buttom"
        style={{
          backgroundColor: '#0000007d',
          width: fullWidth,
          height: 375 + height / 2,
        }}
      ></div>
    </div>
  )
}
const onWheel = (camera) => {
  if (!isMobile) {
    if (camera.position.y < 1300 && camera.position.y > 1164)
      store.dispatch(setZoomLevel(1))
    else if (camera.position.y < 1164 && camera.position.y > 1021)
      store.dispatch(setZoomLevel(2))
    else if (camera.position.y < 1021 && camera.position.y > 878)
      store.dispatch(setZoomLevel(3))
    else if (camera.position.y < 878 && camera.position.y > 735)
      store.dispatch(setZoomLevel(4))
    else if (camera.position.y < 735 && camera.position.y > 592)
      store.dispatch(setZoomLevel(5))
    else if (camera.position.y < 592 && camera.position.y > 449)
      store.dispatch(setZoomLevel(6))
    else if (camera.position.y < 449 && camera.position.y > 306)
      store.dispatch(setZoomLevel(7))
    else if (camera.position.y < 306 && camera.position.y > 263)
      store.dispatch(setZoomLevel(8))
    else if (camera.position.y < 163 && camera.position.y > 140)
      store.dispatch(setZoomLevel(9))
    else if (camera.position.y >= 20 && camera.position.y < 100) {
      store.dispatch(setZoomLevel(10))
    }
  } else {
    if (camera.position.y < 1900 && camera.position.y > 1712)
      store.dispatch(setZoomLevel(1))
    else if (camera.position.y < 1712 && camera.position.y > 1592)
      store.dispatch(setZoomLevel(2))
    else if (camera.position.y < 1592 && camera.position.y > 1383)
      store.dispatch(setZoomLevel(3))
    else if (camera.position.y < 1383 && camera.position.y > 1174)
      store.dispatch(setZoomLevel(4))
    else if (camera.position.y < 1174 && camera.position.y > 965)
      store.dispatch(setZoomLevel(5))
    else if (camera.position.y < 965 && camera.position.y > 756)
      store.dispatch(setZoomLevel(6))
    else if (camera.position.y < 756 && camera.position.y > 547)
      store.dispatch(setZoomLevel(7))
    else if (camera.position.y < 547 && camera.position.y > 338)
      store.dispatch(setZoomLevel(8))
    else if (camera.position.y < 338 && camera.position.y > 209)
      store.dispatch(setZoomLevel(9))
    else if (camera.position.y >= 20 && camera.position.y < 140) {
      store.dispatch(setZoomLevel(10))
    }
  }
}
export const ErrorReload = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
      }}
      onClick={() => location.reload()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="160"
        height="160"
        fill="currentColor"
        className="bi bi-arrow-clockwise"
        viewBox="0 0 16 16"
        color="#f90070"
      >
        <path
          fillRule="evenodd"
          d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
        />
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
      </svg>

      <h3> Reload Page</h3>
      <h4>Network Error</h4>
    </div>
  )
}
