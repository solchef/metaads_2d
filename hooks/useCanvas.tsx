import { useEffect, useRef, useState } from 'react'

import { fabric } from 'fabric'
// import { cloneIcon, deleteIcon } from '../components/CanvasAssets'

// const deleteImg = document.createElement('img')
// deleteImg.src = deleteIcon

// const cloneImg = document.createElement('img')
// cloneImg.src = cloneIcon

export default function useCanvas() {
  const cAreaRef = useRef()
  const [adCanvas, setAdCanvas] = useState()
  const [selectorElem, setSelector] = useState()
  const [minimap, setMiniMap] = useState()
  const [selectorWidth, setWidth] = useState(10)
  const [selectorHeight, setHeight] = useState(10)
  const grid = 10
  const unitScale = 10
  const canvasWidth = 100 * unitScale
  const canvasHeight = 100 * unitScale

  const initCanvas = () =>
    // console.log(cAreaRef.current.offsetWidth)
    new fabric.Canvas('adcanvas', {
      containerClass: 'canvas-box grid-box ratio ratio-1x1',
      backgroundColor: '',
      width: cAreaRef?.current.offsetWidth,
      height: cAreaRef?.current.offsetHeight,
    })

  const initMini = () =>
    new fabric.Canvas('minimap', {
      containerClass: 'map-box ratio ratio-1x1',
      backgroundColor: '#f50070',
      width: '400',
      height: '450',
      top: '100',
    })

  const rect = new fabric.Rect({
    height: grid * selectorHeight,
    width: grid * selectorWidth,
    originX: 'left',
    originY: 'top',
    centeredRotation: true,
    fill: '#f50070',
    // visible: false,
  })

  useEffect(() => {
    setAdCanvas(initCanvas())
    setMiniMap(initMini())
  }, [])

  useEffect(() => {
    createGrid(adCanvas)
    if (adCanvas) {
      setSelector(adCanvas.add(rect))
      adCanvas.centerObject(rect)
    }
  }, [adCanvas, selectorElem])

  const createGrid = (adBoard) => {
    if (adBoard) {
      for (let i = 0; i < 10000 / grid; i++) {
        adBoard.add(
          new fabric.Line([i * grid, grid, i * grid, 10000], {
            stroke: 'white',
            selectable: false,
          })
        )
        adBoard.add(
          new fabric.Line([0, i * grid, 10000, i * grid], {
            stroke: 'white',
            selectable: false,
          })
        )

        // console.log({ squre: i, cords: { x: i * grid, y: i * grid } })
      }
      adBoard.renderAll()

      // const cols = 100
      // const rows = 100
      // const cells = rows * cols
      // const size = 25
      // const grids = []

      // for (let i = 0; i < cells; ++i) {
      //   if (Math.random() < 0.5) {
      //     grid.push('#FF8ED6')
      //   } else {
      //     grid.push('#8ED6FF')
      //   }
      // }

      // for (let i = 0; i < cols; ++i) {
      //   for (let j = 0; j < rows; ++j) {
      //     const rect2 = new fabric.Rect({
      //       top: j * size,
      //       left: i * size,
      //       height: size,
      //       width: size,
      //       // fill: '#000000',
      //       selection: false,
      //       lockMovementX: true,
      //       lockMovementY: true,
      //       lockRotation: true,
      //       lockUniScaling: true,
      //       lockScalingY: true,
      //       lockScalingX: true,
      //     })
      //     adBoard.add(rect2)
      //   }
      // }

      adBoard.renderAll()

      initMinimap(adBoard, minimap)
    }
  }

  function createCanvasEl(adCanvas, minimap) {
    if (adCanvas) {
      const designSize = {
        width: adCanvas.getWidth(),
        height: adCanvas.getHeight(),
      }

      const originalVPT = adCanvas.viewportTransform
      const designRatio = fabric.util.findScaleToFit(designSize, adCanvas)
      const minimapRatio = fabric.util.findScaleToFit(adCanvas, minimap)

      const scaling = minimap.getRetinaScaling()

      const finalWidth = designSize.width * designRatio
      const finalHeight = designSize.height * designRatio

      adCanvas.viewportTransform = [
        designRatio,
        0,
        0,
        designRatio,
        (adCanvas.getWidth() - finalWidth) / 2,
        (adCanvas.getHeight() - finalHeight) / 2,
      ]
      const canvas = adCanvas.toCanvasElement(minimapRatio * scaling)
      adCanvas.viewportTransform = originalVPT
      return canvas
    }
  }

  function updateMiniMap(minimap) {
    const canvas = createCanvasEl(adCanvas, minimap)
    minimap.backgroundImage._element = canvas
    minimap.requestRenderAll()
  }

  const updateMiniMapVP = (adCanvas, minimap) => {
    if (adCanvas && minimap) {
      const designSize = { width: 800, height: 600 }
      const rect = minimap.getObjects()[0]
      const designRatio = fabric.util.findScaleToFit(designSize, adCanvas)
      const totalRatio = fabric.util.findScaleToFit(designSize, minimap)
      const finalRatio = designRatio / adCanvas.getZoom()
      rect.scaleX = finalRatio
      rect.scaleY = finalRatio
      rect.top =
        minimap.backgroundImage.top -
        (adCanvas.viewportTransform[5] * totalRatio) / adCanvas.getZoom()
      rect.left =
        minimap.backgroundImage.left -
        (adCanvas.viewportTransform[4] * totalRatio) / adCanvas.getZoom()
      minimap.requestRenderAll()
    }
  }

  const initMinimap = (adCanvas, minimap) => {
    if (adCanvas && minimap) {
      const canvas = createCanvasEl(adCanvas, minimap)
      const backgroundImage = new fabric.Image(canvas)
      backgroundImage.scaleX = 1 / adCanvas.getRetinaScaling()
      backgroundImage.scaleY = 1 / adCanvas.getRetinaScaling()
      minimap.centerObject(backgroundImage)
      minimap.backgroundColor = 'white'
      minimap.backgroundImage = backgroundImage
      minimap.requestRenderAll()
      const minimapView = new fabric.Rect({
        top: backgroundImage.top,
        left: backgroundImage.left,
        width: backgroundImage.width / adCanvas.getRetinaScaling(),
        height: backgroundImage.height / adCanvas.getRetinaScaling(),
        fill: 'rgba(0, 0, 255, 0.3)',
        cornerSize: 6,
        transparentCorners: false,
        cornerColor: 'blue',
        strokeWidth: 0,
      })
      minimapView.controls = {
        br: fabric.Object.prototype.controls.br,
      }
      minimap.add(minimapView)
    }
  }

  function renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      const size = fabric.Object.cornerSize
      ctx.save()
      ctx.translate(left, top)
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
      ctx.drawImage(icon, -size / 2, -size / 2, size, size)
      ctx.restore()
    }
  }

  // drawingCanvas.on('object:modified', function () {
  //   updateMiniMap()
  // })

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
          console.log('wheel')
          const delta = opt.e.wheelDelta / 60
          let zoom = adCanvas.getZoom()
          zoom *= 0.999 ** delta
          if (zoom > 20) zoom = 20
          if (zoom < 0.01) zoom = 0.01
          adCanvas.setZoom(zoom)
          // updateMiniMapVP(adc)
          opt.e.preventDefault()
          opt.e.stopPropagation()
        },
        { passive: true }
      )

      adCanvas.on(
        'mouse:down',
        function (o) {
          adCanvas.selection = true
          const pointer = adCanvas.getPointer(o.e)
          // setOrigX(Math.round(pointer.x / grid) * grid)
          // setOrigY(Math.round(pointer.y / grid) * grid)
          // console.log(selectorElem)
          if (selectorElem) {
            selectorElem.set({
              x: Math.round(pointer.x / grid) * grid,
              y: Math.round(pointer.y / grid) * grid,
              visible: true,
            })
          } else {
            console.log('oops. no selector added')
          }
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
  }, [adCanvas, selectorElem])

  const setSelectorWidth = (e) => {
    selectorElem.width = grid * e
    setWidth(grid * e)
    adCanvas.renderAll()
  }

  const setSelectorHeight = (e) => {
    selectorElem.height = grid * e
    setHeight(grid * e)
    adCanvas.renderAll()
  }

  return {
    cAreaRef,
    canvasWidth,
    canvasHeight,
    zoomIn,
    adCanvas,
    zoomOut,
    selectorHeight,
    selectorWidth,
    setSelectorWidth,
    setSelectorHeight,
  }
}
