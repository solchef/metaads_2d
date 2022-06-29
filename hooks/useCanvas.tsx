import { useEffect, useRef, useState } from 'react'

import { fabric } from 'fabric'
import { HtmlProps } from 'next/dist/shared/lib/html-context'
// import { cloneIcon, deleteIcon } from '../components/CanvasAssets'

// const deleteImg = document.createElement('img')
// deleteImg.src = deleteIcon

// const cloneImg = document.createElement('img')
// cloneImg.src = cloneIcon

const squreInfoDefault = {
  x: '-',
  y: '-',
  Price: '0',
  Status: 'Available',
  owner: 'For Sale',
  link: 'quadspace.io',
  area: '1 X 1',
}

export default function useCanvas() {
  const cAreaRef = useRef<HTMLDivElement>()
  const cMiniRef = useRef<HTMLDivElement>()
  const [adCanvas, setAdCanvas] = useState<HTMLCanvasElement>(null)
  const [selectorElem, setSelector] = useState()
  // const [minimap, setMiniMap] = useState()
  const [selectorWidth, setWidth] = useState(1)
  const [group, setGroup] = useState()
  const [selectorHeight, setHeight] = useState(1)
  const [capturedFileBuffer, setCapturedFileBuffer] = useState()
  const [squreInfo, setSqureInfo] = useState(squreInfoDefault)
  // const [selectedSqures, setSelectedSqures] = useState([])

  const grid = 1

  const initCanvas = () =>
    // console.log(cAreaRef.current.offsetWidth)
    new fabric.Canvas('adcanvas', {
      containerClass: 'boardd',
      backgroundColor: '',
      width: cAreaRef.current ? cAreaRef?.current.offsetWidth : 1200,
      height: cAreaRef.current ? cAreaRef?.current.offsetWidth : 1200,
    })

  // const initMini = () =>
  //   new fabric.Canvas('minimap', {
  //     containerClass: '',
  //     backgroundColor: '#f50070',
  //     width: cMiniRef.current ? cMiniRef?.current.offsetWidth : 100,
  //     height: cMiniRef.current ? cMiniRef?.current.offsetWidth : 100,
  //     top: '100',
  //   })
  fabric.Object.prototype.hasRotatingPoint = false

  const rect = new fabric.Rect({
    height: grid,
    width: grid,
    top: 0 - 0.5,
    left: 0 - 0.5,
    centeredRotation: false,
    hasRotatingPoint: false,
    name: 'defaultSelector',
    fill: '#f50070',
    subTargetCheck: true,
    // visible: false,
  })

  useEffect(() => {
    setAdCanvas(initCanvas())
  }, [])

  useEffect(() => {
    deleteCanvasItems()
    createGrid(adCanvas)
    // if (adCanvas) {
    //   setSelector(adCanvas.add(rect))
    //   adCanvas.centerObject(rect)
    // }
  }, [adCanvas])

  useEffect(() => {
    // console.log(squreInfo)
  }, [squreInfo])

  function deleteCanvasItems() {
    if (adCanvas) {
      // const canvasObjects = adCanvas.getObjects()
      // alert('we got ' + canvasObjects.length)
      // while (canvasObjects.length != 0) {
      //   adCanvas.remove(canvasObjects[0])
      //   adCanvas.discardActiveGroup()
      // }
    }
  }

  const createGrid = (adBoard) => {
    if (adBoard) {
      const gridlines = []
      for (let i = 0; i < 1000 / grid; i++) {
        const horiz = new fabric.Line([i * grid, 0, i * grid, 1000], {
          stroke: '#a301b9',
          selectable: false,
          strokeWidth: 0.1,
          objectCaching: false,
        })
        gridlines.push(horiz)

        const vertical = new fabric.Line([0, i * grid, 1000, i * grid], {
          stroke: '#a301b9',
          selectable: false,
          strokeWidth: 0.1,
          objectCaching: false,
        })

        gridlines.push(vertical)
        // console.log({ squre: i, cords: { x: i * grid, y: i * grid } })
      }

      const purchased = [
        [1, 2],
        [4, 5],
        [36, 89],
        [4, 6],
        [702, 45],
        [8, 9],
        [8, 10],
        [8, 11],
        [8, 15],
        [8, 18],
        [8, 9],
        [8, 29],
        [8, 39],
        [8, 49],
        [8, 39],
        [8, 19],
      ]

      const owned = [
        [5, 2],
        [4, 5],
        [36, 89],
        [4, 6],
        [23, 45],
        [8, 9],
        [29, 10],
        [29, 11],
        [29, 15],
        [29, 19],
        [9, 29],
        [29, 29],
        [9, 39],
        [229, 49],
        [29, 39],
        [29, 19],
      ]

      const rects = []

      purchased.forEach((purchase) => {
        const rect2 = new fabric.Rect({
          top: purchase[0] * grid - 0.5,
          left: purchase[1] * grid - 0.5,
          height: grid,
          width: grid,
          fill: '#f0ad4e',
          selection: false,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
          lockUniScaling: true,
          lockScalingY: false,
          lockScalingX: false,
        })
        rects.push(rect2)
      })

      owned.forEach((purchase) => {
        const rect2 = new fabric.Rect({
          top: purchase[0] * grid - 0.5,
          left: purchase[1] * grid - 0.5,
          height: grid,
          width: grid,
          fill: 'green',
          selection: false,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
          lockUniScaling: true,
          lockScalingY: false,
          lockScalingX: false,
        })
        rects.push(rect2)
      })

      const adGroup = new fabric.Group([...gridlines, ...rects], {
        objectCaching: false,
        selectable: true,
      })

      setGroup(adGroup)

      adBoard.add(adGroup)
      adBoard.add(rect)
      adBoard.zoomToPoint({ x: 0, y: 0 }, adBoard.getZoom() * 20)

      adBoard.renderAll()

      // initMinimap(adBoard, minimap)
    }
  }

  // function createCanvasEl(adCanvas, minimap) {
  //   if (adCanvas) {
  //     const designSize = {
  //       width: adCanvas.getWidth(),
  //       height: adCanvas.getHeight(),
  //     }

  //     const originalVPT = adCanvas.viewportTransform
  //     const designRatio = fabric.util.findScaleToFit(designSize, adCanvas)
  //     const minimapRatio = fabric.util.findScaleToFit(adCanvas, minimap)

  //     const scaling = minimap.getRetinaScaling()

  //     const finalWidth = designSize.width * designRatio
  //     const finalHeight = designSize.height * designRatio

  //     adCanvas.viewportTransform = [
  //       designRatio,
  //       0,
  //       0,
  //       designRatio,
  //       (adCanvas.getWidth() - finalWidth) / 2,
  //       (adCanvas.getHeight() - finalHeight) / 2,
  //     ]
  //     const canvas = adCanvas.toCanvasElement(minimapRatio * scaling)
  //     adCanvas.viewportTransform = originalVPT
  //     return canvas
  //   }
  // }

  // function updateMiniMap(minimap) {
  //   const canvas = createCanvasEl(adCanvas, minimap)
  //   minimap.backgroundImage._element = canvas
  //   minimap.requestRenderAll()
  // }

  // const updateMiniMapVP = (adCanvas, minimap) => {
  //   if (adCanvas && minimap) {
  //     const designSize = { width: minimap.width, height: minimap.height }
  //     const rect = minimap.getObjects()[0]
  //     const designRatio = fabric.util.findScaleToFit(designSize, adCanvas)
  //     const totalRatio = fabric.util.findScaleToFit(designSize, minimap)
  //     const finalRatio = designRatio / adCanvas.getZoom()
  //     rect.scaleX = finalRatio
  //     rect.scaleY = finalRatio
  //     rect.top =
  //       minimap.backgroundImage.top -
  //       (adCanvas.viewportTransform[5] * totalRatio) / adCanvas.getZoom()
  //     rect.left =
  //       minimap.backgroundImage.left -
  //       (adCanvas.viewportTransform[4] * totalRatio) / adCanvas.getZoom()
  //     minimap.requestRenderAll()
  //   }
  // }

  // const initMinimap = (adCanvas, minimap) => {
  //   if (adCanvas && minimap) {
  //     const canvas = createCanvasEl(adCanvas, minimap)
  //     const backgroundImage = new fabric.Image(canvas)
  //     setCapturedFileBuffer(canvas.toDataURL())

  //     backgroundImage.scaleX = 1
  //     backgroundImage.scaleY = 1
  //     minimap.centerObject(backgroundImage)
  //     minimap.backgroundColor = 'black'
  //     minimap.backgroundImage = backgroundImage
  //     minimap.requestRenderAll()

  //     const minimapView = new fabric.Rect({
  //       top: backgroundImage.top,
  //       left: backgroundImage.left,
  //       width: backgroundImage.width,
  //       height: backgroundImage.height,
  //       fill: 'rgba(0, 0, 255, 0.3)',
  //       cornerSize: 6,
  //       transparentCorners: false,
  //       cornerColor: 'blue',
  //       strokeWidth: 0,
  //     })
  //     minimapView.controls = {
  //       br: fabric.Object.prototype.controls.br,
  //     }
  //     minimap.add(minimapView)
  //   }
  // }

  const addSelector = () => {
    rect.left = squreInfo.x + 0.5
    rect.top = squreInfo.y + 0.5
    rect.width = selectorWidth
    rect.height = selectorHeight
    rect.visible = true

    adCanvas.add(rect)
    setSelector(rect)
    adCanvas.renderAll()
  }

  function CenterCoord(adCanvas) {
    return {
      x:
        fabric.util.invertTransform(adCanvas.viewportTransform)[4] +
        adCanvas.width / adCanvas.getZoom() / 2,
      y:
        fabric.util.invertTransform(adCanvas.viewportTransform)[5] +
        adCanvas.height / adCanvas.getZoom() / 2,
    }
  }

  const zoomIn = () => {
    if (adCanvas) {
      zoomInCanvas(adCanvas)
    }
  }

  const zoomInCanvas = (adBoard: any) => {
    if (adBoard) {
      adBoard.setZoom(adBoard.getZoom() * 0.9)
    }
  }

  const zoomOut = () => {
    if (adCanvas) {
      zoomOutCanvas(adCanvas)
    }
  }

  const zoomOutCanvas = (adBoard: any) => {
    if (adBoard) {
      adBoard.setZoom(adBoard.getZoom() * 1.1)
    }
  }

  useEffect(() => {
    if (adCanvas) {
      adCanvas.on(
        'mouse:wheel',
        function (opt) {
          const delta = opt.e.wheelDelta / 60
          let zoom = adCanvas.getZoom()
          zoom *= 0.999 ** delta
          if (zoom > 20) zoom = 20
          if (zoom < 0.01) zoom = 0.01
          adCanvas.setZoom(zoom)
          opt.e.preventDefault()
          opt.e.stopPropagation()
        },
        { passive: true }
      )

      adCanvas.on('mouse:up', function (o) {
        adCanvas.setActiveObject(adCanvas.getObjects()[1])
      })

      adCanvas.on(
        'mouse:down',
        function (o) {
          adCanvas.selection = true
          const pointer = adCanvas.getPointer(o.e)
          const squreInfoDefault = {
            x: Math.round(pointer.x / grid) * grid,
            y: Math.round(pointer.y / grid) * grid,
            Price: 1,
            Status: 'Available',
            owner: 'For Sale',
            link: 'quadspace.io',
            area: '1 X 1',
          }

          setSqureInfo(squreInfoDefault)
          updateSelector(
            squreInfoDefault.x - 0.5 * grid,
            squreInfoDefault.y * grid - 0.5
          )
        },
        { passive: true }
      )

      adCanvas.on('object:moving', function (options) {
        options.target.set({
          left: Math.round(options.target.left / grid) * grid,
          top: Math.round(options.target.top / grid) * grid,
        })
      })
    }
  }, [adCanvas, selectorElem, group])

  const setSelectorWidth = (e) => {
    const elem = adCanvas.getObjects()[1]
    elem.width = grid * e
    setWidth(grid * e)
    adCanvas.renderAll()
  }

  const setSelectorHeight = (e) => {
    const elem = adCanvas.getObjects()[1]
    elem.height = grid * e
    setHeight(grid * e)
    adCanvas.renderAll()
  }

  const updateSelector = (x, y) => {
    const elem = adCanvas.getObjects()[1]
    if (elem) {
      console.log(elem.left)
      elem.left = x
      elem.top = y
      // elem.bringFoward()
      adCanvas.renderAll()
    }
  }

  return {
    cAreaRef,
    squreInfo,
    setSqureInfo,
    zoomIn,
    adCanvas,
    zoomOut,
    cMiniRef,
    selectorHeight,
    selectorWidth,
    setSelectorWidth,
    setSelectorHeight,
    addSelector,
    capturedFileBuffer,
  }
}
