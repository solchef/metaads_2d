import React, { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { DoubleSide, TextureLoader, Vector3, BoxHelper } from 'three'
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useHelper,
} from '@react-three/drei'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { LoadingManager } from 'three'
import { Loader } from '../../utils/loader'
import { useAppSelector } from '../../components/store/hooks'
import { vertexShader, fragmentShader } from './shaders'
import {
  selectLand,
  selectViewState,
  selectZoomIn,
  selectZoomOut,
  select_3dMode,
  setLand,
  setParcel,
  setSelectedLand,
  setShowMenu,
  setViewState,
  setZoomLevel,
} from '../../components/reducers/Settings'
import { store } from '../../components/store'
import useSound from 'use-sound'
import axios from 'axios'

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

export const MapView = () => {
  const _3dMode = useAppSelector(select_3dMode)
  const land = useAppSelector(selectLand)
  const orbit = useRef()
  const zoomIn = useAppSelector(selectZoomIn)
  const zoomOut = useAppSelector(selectZoomOut)
  const viewState = useAppSelector(selectViewState)
  const [buyMode, setBuyMode] = useState(false)
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(true)
  let pointerIsDown = false

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
    getImage()
  }, [])

  const getImage = async () => {
    await axios.get('https://api.quadspace.io/adspsdace.json').then((data) => {
      setImage(data.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (orbit.current && store.getState().settings.zoomLevel <= 5) {
      orbit.current.object.position.y -= 290
      orbit.current.object.updateProjectionMatrix()
    }
  }, [zoomIn])

  useEffect(() => {
    if (orbit.current && store.getState().settings.zoomLevel >= 1) {
      orbit.current.object.position.y += 290
      orbit.current.object.updateProjectionMatrix()
    }
  }, [zoomOut])

  useEffect(() => {
    setBuyMode(true)
  }, [])
  return (
    <Canvas style={{ height: '100vh', width: '100%', backgroundColor: '#000' }}>
      <group>
        <Suspense fallback={<></>}>
          {loading ? (
            <ToolTip1 />
          ) : (
            <GreenSquare
              color="#f56f42"
              color2="#00707b"
              x={land.h}
              y={land.w}
              image={image}
            />
          )}
          <PerspectiveCamera position={[0, 1200, 0]} makeDefault />

          <OrbitControls
            ref={orbit}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.25}
            minAzimuthAngle={0}
            maxAzimuthAngle={0}
            minZoom={0}
            maxZoom={1600}
            minDistance={90}
            maxDistance={1200}
            enableDamping={false}
            mouseButtons={{ LEFT: 2, MIDDLE: 1, RIGHT: 0 }}
            onChange={() => {
              // if (orbit.current.object.position.x < -500) {
              //   if (orbit.current.object.position.x != -500)
              //     orbit.current.object.position.x = -490
              //   orbit.current.object.updateProjectionMatrix()
              // }
              // if (orbit.current.object.position.x > 500) {
              //   if (orbit.current.object.position.x != 500)
              //     orbit.current.object.position.x = 490
              //   orbit.current.object.updateProjectionMatrix()
              // }
              // if (orbit.current.object.position.z < -500) {
              //   if (orbit.current.object.position.z != -500)
              //     orbit.current.object.position.z = -490
              //   orbit.current.object.updateProjectionMatrix()
              // }
              // if (orbit.current.object.position.z > 500) {
              //   if (orbit.current.object.position.z != 500)
              //     orbit.current.object.position.z = 490
              //   orbit.current.object.updateProjectionMatrix()
              // }
            }}
            enablePan={buyMode}
            touches={{
              ONE: buyMode ? THREE.TOUCH.PAN : 2,
              TWO: THREE.TOUCH.DOLLY_PAN,
            }}
            enableRotate={_3dMode}
          />
        </Suspense>
        {/* <ToolTip1 /> */}
      </group>
      {/* <ambientLight /> */}
    </Canvas>
  )
}

const GreenSquare = ({ x, y, image }) => {
  const [playError] = useSound('./errorSound.mp3')
  const [playBuild] = useSound('./build.mp3')
  const boughtedLandListData = store.getState().settings.boughtedLandList
  const z = 2
  const widthMap = 1000
  const heightMap = 1000
  const [loading, setLoading] = useState(true)
  const [lands, setLands] = useState(true)
  const manager = new LoadingManager()
  manager.onStart = function () {
    setLoading(true)
  }
  manager.onLoad = function () {
    setLoading(false)
  }
  const texture = React.useMemo(
    () => new TextureLoader(manager).load(image),
    []
  )
  const texture2 = React.useMemo(
    () => new TextureLoader(manager).load('./blank.png'),
    []
  )
  const [boxPosition, setBoxPosition] = useState(new Vector3(0, 0, 0))
  const [viewLand, setViewLand] = useState(false)
  const [viewBox, setViewBox] = useState(false)
  const [landPosition, setLandPosition] = useState(new Vector3(0, 0, 0))
  const [moseDown, setMouseDown] = useState(false)
  const [moseUp, setMouseUp] = useState(false)
  const [moseMoved, setMouseMoved] = useState(false)
  const [parcels, setParcels] = useState([])

  useEffect(() => {
    axios.get('https://quadspace.io/api/metadata/parcels').then((parc) => {
      setParcels(parc.data.message)
    })
  }, [])
  const ref = useRef()

  const cubeRef = useRef()
  useHelper(ref, BoxHelper, 'blue')

  const onMove = (point) => {
    if (!viewLand) setViewBox(true)
    setBoxPosition(new Vector3(Math.floor(point.x), 0.5, Math.floor(point.z)))
    setMouseMoved(false)
  }

  // useEffect(() => {
  //   if (cubeRef.current) {
  //     console.log(cubeRef)
  //   }
  // }, [cubeRef.current])

  useEffect(() => {
    let result = 0
    if (oldx !== undefined) result = oldx - x
    // console.log(result)
    // console.log(landPosition)
    const selectedMap = getSelectedMap(landPosition)
    // console.log(selectedMap)
    if (selectedMap === undefined) {
      setLandPosition(
        new Vector3(landPosition.x - result / 2, landPosition.y, landPosition.z)
      )
    } else {
      playError()
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
      playError()
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
                0.01,
                Math.floor(point.z) + y / 2
              )
            )
            store.dispatch(setViewState(2))
            returnLand(
              boxPosition.x + widthMap / 2,
              boxPosition.z + heightMap / 2
            )
            store.dispatch(
              setLand({
                x: boxPosition.x + widthMap / 2,
                y: boxPosition.z + heightMap / 2,
                h: 1,
                w: 1,
              })
            )
            playBuild()
            setViewBox(false)
          } else {
            playError()
          }
        } else {
          playError()
        }
      } else {
        playError()
      }
      if (!isMobile) store.dispatch(setShowMenu(true))
    } else {
      store.dispatch(
        setLand({
          x: boxPosition.x + widthMap / 2,
          y: boxPosition.z + heightMap / 2,
          h: 1,
          w: 1,
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
    let landpoint = {
      data: false,
      name: 'TMDW Token',
      coords: x + ',' + y,
      width: 1,
      height: 1,
      image:
        'https://bafybeibaxec4sl7cbx4ey5djtofzdahowg7mv5vmfvkx3kxcfq7koecbx4.ipfs.nftstorage.link/',
      status: 'Available',
      url: '#',
      description: `This NFT gives you full ownership of block ${
        y * 1000 + x
      } on TheMillionDollarWebsite.com (TMDW) It hasn't been claimed yet so click mint to buy it now!`,
      position: y * 1000 + x,
    }
    store.dispatch(setViewState(2))
    parcels.forEach((land) => {
      if (
        findLand(
          land.coordX,
          land.coordY,
          land.coordX + land.parcelWidth,
          land.coordX + land.parcelHeight,
          x,
          y
        )
      ) {
        store.dispatch(setViewState(3))
        landpoint = {
          data: true,
          name: land.name,
          coords: x + ',' + y,
          width: land.parcelWidth,
          height: land.parcelHeight,
          image: `https://api.quadspace.io/${land.image_temp}`,
          status: 'booked',
          url: land.url,
          description: land.description
            ? land.description
            : `We created the Meta-Board the online version of your traditional billboard. www.TheMillionDollarWebsite.com (http://www.themilliondollarwebsite.com/) leads to the domain www.quadspace.io (http://www.quadspace.io/). Because Quadspace powers the Metaverse component of this project. Each pixel on the Meta-Board will also come with 1 parcel of land in the Quadspace metaverse as a BONUS!`,
          position: y * 1000 + x,
        }
        return
      }
    })

    store.dispatch(setParcel(landpoint))

    return landpoint
  }

  return (
    <>
      {loading ? (
        <ToolTip1 />
      ) : (
        <>
          <mesh
            ref={cubeRef}
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[1, 1, 1]}
            onClick={({ point, nativeEvent }) => {
              if (nativeEvent.which !== 3) onPointUp(point)
              setViewBox(false)
            }}
            // onPointerUp={({ point, nativeEvent }) => {
            //   if (nativeEvent.which !== 3) onPointUp(point)
            //   setViewBox(false)
            // }}
            onPointerDown={(e) => {
              setMouseMoved(true)
            }}
            onPointerOut={() => setViewBox(false)}
            onPointerMove={({ point, camera }) => {
              if (moseMoved) {
                setViewBox(true)
              }
              onMove(point)
            }}
            onWheel={({ camera }) => {
              if (camera.position.y < 978 && camera.position.y > 861)
                store.dispatch(setZoomLevel(1))
              if (camera.position.y < 861 && camera.position.y > 639)
                store.dispatch(setZoomLevel(2))
              if (camera.position.y < 639 && camera.position.y > 415)
                store.dispatch(setZoomLevel(3))
              if (camera.position.y < 415 && camera.position.y > 95)
                store.dispatch(setZoomLevel(4))
              if (camera.position.y <= 90) store.dispatch(setZoomLevel(5))
            }}
          >
            <planeBufferGeometry args={[widthMap, heightMap]} />
            <shaderMaterial
              uniforms={{
                // Feed the heightmap
                bumpTexture: { value: texture },
                bumpTexture2: { value: texture2 },
              }}
              // Feed the shaders as strings
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
              // side={DoubleSide}
            />
            {/* <meshBasicMaterial
              attach="material"
              // color={color}
              // displacementMap={texture}
              map={texture}
              side={DoubleSide}
            /> */}
          </mesh>
          {/* {viewBox && !store.getState().settings.selectMode ? (
            <mesh position={boxPosition} ref={ref}>
              <boxBufferGeometry args={[x, z, y]} attach="geometry" />
              <meshPhongMaterial color={color2} attach="material" />
            </mesh>
          ) : (
            ''
          )} */}
          {viewLand ? (
            <mesh
              position={landPosition}
              ref={ref}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              {/* <boxBufferGeometry args={[x, z, y]} attach="geometry" /> */}
              <planeBufferGeometry args={[x, y]} />
              <meshPhongMaterial
                // color={'#f56fff'}
                wireframe={false}
                opacity={0}
                transparent={true}
                attach="material"
              />
              <EffectComposer multisampling={8} autoClear={false}>
                <Outline
                  selection={ref}
                  selectionLayer={100}
                  width={950}
                  visibleEdgeColor="white"
                  edgeStrength={1000}
                />
              </EffectComposer>
            </mesh>
          ) : (
            ''
          )}
        </>
      )}
    </>
  )
}

function ToolTip1() {
  return (
    <Html center position={[-1, 1, -1]}>
      <Loader />
    </Html>
  )
}
