import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { DoubleSide, Vector3 } from 'three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
// import { LoadingManager } from 'three'
// import { Loader } from '../../utils/loader'
import { useAppDispatch, useAppSelector } from '../../components/store/hooks'
import { vertexShader, fragmentShader } from './shaders'
import {
  // selectImage,
  // selectImage2,
  selectLand,
  selectUpdateImage,
  selectZoomIn,
  selectZoomOut,
  select_3dMode,
  // setImage,
  setLand,
  setMiniMapPosition,
  setParcel,
  setSelectedLand,
  setShowMenu,
  setViewState,
  setZoomLevel,
} from '../../components/reducers/Settings'
import { store } from '../../components/store'
// import useSound from 'use-sound'
import axios from 'axios'
import { MetaadsContractUnsigned } from '../../utils/readOnly'
import { useWeb3Context } from '../../context'

let oldx, oldy
var isMobile = false //initiate as false
// device detection
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true
}
// const materialList = []

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

export const MapView = ({ minMap, texture1, texture2 }) => {
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
  // const [load2, setLoad2] = useState(false)
  // const [reload, setReload] = useState(false)
  // const [textuerData, setTextuerData] = useState()
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
      if (address == land.owner) {
        let x = Number(land.coord) % 1000
        let y = Math.ceil(Number(land.coord) / 1000)
        markedOwned.push({
          landPosition: new Vector3(x - 1, 1, y - 1),
          landSize: { w: Number(land.width), h: Number(land.width) },
        })
      }
    })
    SetOwnerLandList(markedOwned)
    console.log(markedOwned)
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
        <meshBasicMaterial
          // map={textureBox}
          color="#f5de00"
          attach="material"
          side={DoubleSide}
        />
      </mesh>
    )
  }

  return (
    <Canvas
      flat
      linear
      gl={{ preserveDrawingBuffer: true }}
      // onCreated={({ gl }) => {
      //   gl.gammaInput = true
      //   gl.toneMapping = THREE.ACESFilmicToneMapping
      // }}
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
      <group
        dispose={() => {
          console.log('hoi')
        }}
      >
        <Suspense fallback={<></>}>
          <>
            <GreenSquare
              color="#f56f42"
              color2="#00707b"
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
            minDistance={20}
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
      {/* <ambientLight /> */}
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
              Math.floor(point.z) + heightMap / 2
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

  const findLand = (x1, y1, x2, y2, x, y) => {
    if (x > x1 && x < x2 && y > y1 && y < y2) return true

    return false
  }

  const returnLand = async (x, y) => {
    let pos = y * 1000 + x
    pos = pos

    let landpoint = {
      data: false,
      name: 'TMDW Token',
      coords: x + ',' + y,
      width: 1,
      height: 1,
      image: 'https://api.quadspace.io/uploads/tmdw.jpg',
      status: 'Available',
      url: '#',
      description: `This NFT gives you full ownership of block ${pos} on TheMillionDollarWebsite.com (TMDW) It hasn't been claimed yet so click mint to buy it now!`,
      position: pos,
    }

    parcels.forEach((land) => {
      let cx = Number(land.coord) % 1000
      let cy = Math.ceil(Number(land.coord) / 1000)

      if (
        findLand(
          cx - 1,
          cy - 1,
          cx + Number(land.width),
          cy + Number(land.height),
          x + 1,
          y + 1
        )
      ) {
        landpoint = {
          data: true,
          name: land.name,
          coords: x + ',' + y,
          width: Number(land.width),
          height: Number(land.height),
          image: `https://api.quadspace.io/uploads/tmdw.jpg`, //temporary compressed served image of parcel
          status: 'Bought',
          url: land.url,
          description: land.description
            ? land.description
            : `This NFT  ${pos} on TheMillionDollarWebsite.com (TMDW) has been claimed.`,
          position: pos,
        }
        // console.log(land.owner)

        if (address == land.owner) {
          store.dispatch(setViewState(6))
          store.dispatch(setParcel(landpoint))
        } else {
          store.dispatch(setViewState(3))
          store.dispatch(setParcel(landpoint))
        }
      }
    })

    store.dispatch(setParcel(landpoint))
    return landpoint
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
    else if (camera.position.y < 306 && camera.position.y > 163)
      store.dispatch(setZoomLevel(8))
    else if (camera.position.y < 163 && camera.position.y > 40)
      store.dispatch(setZoomLevel(9))
    else if (camera.position.y >= 20 && camera.position.y < 40) {
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
    else if (camera.position.y < 338 && camera.position.y > 109)
      store.dispatch(setZoomLevel(9))
    else if (camera.position.y >= 20 && camera.position.y < 40) {
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
