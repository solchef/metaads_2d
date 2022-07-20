import React, { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { DoubleSide, TextureLoader, Vector3 } from 'three'
import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { LoadingManager } from 'three'
import { Loader } from '../../utils/loader'
import { useAppDispatch, useAppSelector } from '../../components/store/hooks'
import {
  selectLand,
  select_3dMode,
  setLand,
} from '../../components/reducers/Settings'
import { store } from '../../components/store'
import useSound from 'use-sound'
import { useControls } from 'leva'

export const MapView = () => {
  const _3dMode = useAppSelector(select_3dMode)
  const orbit = useRef()

  useEffect(() => {
    if (orbit.current) {
      orbit.current.enableRotate = _3dMode
      if (_3dMode) {
        orbit.current.minPolarAngle = 0.5
        orbit.current.maxPolarAngle = Math.PI / 2.25
      } else {
        orbit.current.minPolarAngle = 0
        orbit.current.maxPolarAngle = 0
        // Math.PI / 2.25
      }
    }
  }, [_3dMode])
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
          <GreenSquare color="#f56f42" color2="#00707b" />
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
            minDistance={100}
            maxDistance={1200}
            enableRotate={store.getState().settings._3dMode}
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

function GreenSquare({ color, color2 }) {
  const [playError] = useSound('./errorSound.mp3')
  const [playBuild] = useSound('./build.mp3')
  const landData = store.getState().settings.land
  const boughtedLandListData = store.getState().settings.boughtedLandList

  const [loading, setLoading] = useState(true)
  let x = landData.h,
    y = landData.w,
    z = 2
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
  const ref = useRef()

  const onMove = (point) => {
    setViewBox(true)
    let offSetX = 0.5
    if (x % 2 == 0) {
      offSetX = 0
    }
    let offSetY = 0
    if (y % 2 == 0) {
      offSetY = 0.5
    }
    setBoxPosition(
      new Vector3(
        Math.floor(point.x) + offSetX,
        0.5,
        Math.floor(point.z) + offSetY
      )
    )
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
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[1, 1, 1]}
            onPointerUp={({ uv, screenY, point }) => {
              if (!store.getState().settings.selectMode) {
                setViewLand(true)
                onMove(point)
                let offSetX = 0.5
                if (x % 2 == 0) {
                  offSetX = 0
                }
                let offSetY = 0
                if (y % 2 == 0) {
                  offSetY = 0.5
                }
                if (
                  Math.sign(boxPosition.x + widthMap / 2 - x / 2) !== -1 &&
                  Math.sign(boxPosition.z + heightMap / 2 - y / 2) !== -1
                ) {
                  if (
                    boxPosition.x + widthMap / 2 - x / 2 <= widthMap - x &&
                    boxPosition.z + heightMap / 2 - y / 2 <= heightMap - y
                  ) {
                    // console.log(boughtedLandListData)
                    // for (let x = 0; x < boughtedLandListData.length; x++) {
                    //   const element = boughtedLandListData[x]
                    //   console.log(boxPosition.x + widthMap / 2 - x / 2)
                    //   console.log(element.attributes[1].value)
                    // }
                    console.log(boughtedLandListData)
                    const result = boughtedLandListData.find(
                      (data) =>
                        data.attributes[0].value ===
                          Math.floor(point.x) +
                            offSetX +
                            widthMap / 2 -
                            x / 2 &&
                        data.attributes[1].value ===
                          boxPosition.z + heightMap / 2 - y / 2
                    )
                    console.log(boxPosition.x + widthMap / 2 - x / 2)
                    console.log(boxPosition.z + heightMap / 2 - y / 2)
                    console.log(result)
                    if (result === undefined) {
                      setLandPosition(
                        new Vector3(
                          Math.floor(point.x) + offSetX,
                          0.8,
                          Math.floor(point.z) + offSetY
                        )
                      )
                      store.dispatch(
                        setLand({
                          x: boxPosition.x + widthMap / 2 - x / 2,
                          y: boxPosition.z + heightMap / 2 - y / 2,
                          h: x,
                          w: y,
                        })
                      )
                      playBuild()
                    } else {
                      playError()
                    }
                  } else {
                    playError()
                  }
                } else {
                  playError()
                }

                // console.log({
                //   x: boxPosition.x + widthMap / 2 - x / 2,
                //   y: boxPosition.z + heightMap / 2 - y / 2,
                //   h: x,
                //   w: y,
                // });
              }
            }}
            onPointerOut={() => setViewBox(false)}
            onPointerMove={({ _uv, _screenY, point }) => {
              onMove(point)
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
              //displacementMap={texture}
              map={texture}
              side={DoubleSide}
            />
          </mesh>
          {viewBox && !store.getState().settings.selectMode ? (
            <mesh position={boxPosition} ref={ref}>
              <boxBufferGeometry args={[x, z, y]} attach="geometry" />
              <meshPhongMaterial color={color2} attach="material" />
            </mesh>
          ) : (
            ''
          )}
          {viewLand ? (
            <mesh position={landPosition} ref={ref}>
              <boxBufferGeometry args={[x, z, y]} attach="geometry" />
              <meshPhongMaterial color={color} attach="material" />
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
