import React, { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
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
import {
  selectLand,
  selectViewState,
  selectZoomIn,
  selectZoomOut,
  select_3dMode,
  setLand,
  setZoomLevel,
} from '../../components/reducers/Settings'
import { store } from '../../components/store'
import useSound from 'use-sound'

let oldx, oldy

export const MapView = () => {
  const _3dMode = useAppSelector(select_3dMode)
  const land = useAppSelector(selectLand)
  const orbit = useRef()
  const zoomIn = useAppSelector(selectZoomIn)
  const zoomOut = useAppSelector(selectZoomOut)
  const viewState = useAppSelector(selectViewState)
  const [buyMode, setBuyMode] = useState(false)
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
    console.log(viewState)
    if (viewState !== 1) setBuyMode(true)
    else setBuyMode(false)
  }, [viewState])
  return (
    <Canvas style={{ height: '100vh', width: '100%', backgroundColor: '#000' }}>
      {/*
           A group is used for grouping, kind og like
          groups in SVGs. The positioning of elements
          inside a group is relative to the group's
          position.
        */}
      <group>
        {/* All these are in the same group */}
        <Suspense fallback={<></>}>
          <GreenSquare color="#f56f42" color2="#00707b" x={land.h} y={land.w} />
          <PerspectiveCamera position={[0, 1200, 0]} makeDefault />
          {/*
          This lets you rotate the camera.
          We've associated our React ref with it
          like we would do for any React component
        */}
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
            mouseButtons={{ LEFT: 2, MIDDLE: 1, RIGHT: 0 }}
            onChange={() => {
              // console.log(orbit.current)
              let element = orbit.current.object.matrixWorldInverse.elements
              if (element[12] > 500) element = 500
              // console.log(orbit.current.object.matrixWorldInverse.elements)
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
      {/* Let there be light! */}
      <ambientLight />
      {/*
          Use a PerspectiveCamera.
          PerspectiveCameras work like real works cameras
          and provide depth perception.
        */}
    </Canvas>
  )
}
// const onMouseMove =  useCallback(e => console.log(e))
// This is the thing we are interested in
// The GreenSquare component renders a mesh.
// Meshes are objects that can have a shape and
// texture.

function GreenSquare({ color, color2, x, y }) {
  const [playError] = useSound('./errorSound.mp3')
  const [playBuild] = useSound('./build.mp3')
  const boughtedLandListData = store.getState().settings.boughtedLandList
  const [loading, setLoading] = useState(true)
  const z = 2
  const widthMap = 1000
  const heightMap = 1000
  const manager = new LoadingManager()
  manager.onStart = function () {
    setLoading(true)
  }
  manager.onLoad = function () {
    setLoading(false)
  }
  const texture = React.useMemo(
    () => new TextureLoader(manager).load('./adspace.png'),
    []
  )
  const [boxPosition, setBoxPosition] = useState(new Vector3(0, 0, 0))
  const [viewLand, setViewLand] = useState(false)
  const [viewBox, setViewBox] = useState(false)
  const [landPosition, setLandPosition] = useState(new Vector3(0, 0, 0))
  const [moseMoved, setMouseMoved] = useState(true)

  const ref = useRef()

  const cubeRef = useRef()
  useHelper(ref, BoxHelper, 'blue')

  const onMove = (point) => {
    if (!viewLand) setViewBox(true)
    console.log(new Vector3(Math.floor(point.x), 0.5, Math.floor(point.z)))
    setBoxPosition(new Vector3(Math.floor(point.x), 0.5, Math.floor(point.z)))
    setMouseMoved(false)
  }

  useEffect(() => {
    if (cubeRef.current) {
      console.log(cubeRef)
    }
  }, [cubeRef.current])

  useEffect(() => {
    let result = 0
    if (oldx !== undefined) result = oldx - x
    setLandPosition(
      new Vector3(landPosition.x - result / 2, landPosition.y, landPosition.z)
    )
    oldx = x
  }, [x])

  useEffect(() => {
    let result = 0
    if (oldy !== undefined) result = oldy - y
    setLandPosition(
      new Vector3(landPosition.x, landPosition.y, landPosition.z - result / 2)
    )
    oldy = y
  }, [y])

  const onPointUp = (point) => {
    console.log(moseMoved)
    // if (moseMoved) {
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
        const result = boughtedLandListData.find(
          (data) =>
            data.attributes[1].value >= Math.floor(point.x) + widthMap / 2 &&
            data.attributes[1].value < Math.floor(point.x) + widthMap / 2 + x &&
            data.attributes[0].value >= boxPosition.z + heightMap / 2 &&
            data.attributes[0].value < boxPosition.z + heightMap / 2 + y
        )
        if (result === undefined) {
          setLandPosition(
            new Vector3(
              Math.floor(point.x) + x / 2,
              0.01,
              Math.floor(point.z) + y / 2
            )
          )
          console.log(Math.floor(point.x) + x / 2)
          console.log(boxPosition.x + widthMap / 2)
          store.dispatch(
            setLand({
              x: boxPosition.x + widthMap / 2,
              y: boxPosition.z + heightMap / 2,
              h: x,
              w: y,
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
      console.log('first')
    }
    // } else {
    //   store.dispatch(
    //     setLand({
    //       x: boxPosition.x + widthMap / 2,
    //       y: boxPosition.z + heightMap / 2,
    //       h: x,
    //       w: y,
    //     })
    //   )
    // }
    setMouseMoved(true)
  }

  return (
    // The mesh is at the origin
    // Since it is inside a group, it is at the origin
    // of that group
    // It's rotated by 90 degrees along the X-axis
    // This is because, by default, planes are rendered
    // in the X-Y plane, where Y is the up direction
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
            onPointerUp={({ uv, screenY, point, nativeEvent }) => {
              if (nativeEvent.which !== 3) onPointUp(point)
              setViewBox(false)
            }}
            onPointerDown={(e) => {
              setMouseMoved(true)
            }}
            onPointerOut={() => setViewBox(false)}
            onPointerMove={({ _uv, _screenY, point }) => {
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
            {/*
        The thing that gives the mesh its shape
        In this case the shape is a flat plane
      */}
            <planeBufferGeometry args={[widthMap, heightMap]} />
            {/*
        The material gives a mesh its texture or look.
        In this case, it is just a uniform green
      */}
            <meshBasicMaterial
              attach="material"
              // color={color}
              //   displacementMap={texture}
              map={texture}
              side={DoubleSide}
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
          {viewLand ? (
            <mesh
              position={landPosition}
              ref={ref}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              {/* <boxBufferGeometry args={[x, z, y]} attach="geometry" /> */}
              <planeBufferGeometry args={[x, y]} />
              <meshPhongMaterial
                color={'#f56fff'}
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

// The rest of the components are just tooltips
// Drei's Html component lets you render any HTML
// inside the 3d scene. It follows the same rules
// as everything else when it comes to positioning,
// but is not actually rendered inside the canvas

function ToolTip1() {
  return (
    <Html center position={[-1, 1, -1]}>
      <Loader />
    </Html>
  )
}

function ToolTip2() {
  return (
    <Html center position={[1, -1, -1]}>
      <p>Scroll to zoom in and out</p>
    </Html>
  )
}

function ToolTip3() {
  return (
    <Html center position={[-1, -1, 1]}>
      <p>{"<== Code's on the left, with details in the comments"}</p>
    </Html>
  )
}
