import { useEffect, useRef, useState } from 'react'

import { fabric } from 'fabric'
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
  const cAreaRef = useRef()
  const cMiniRef = useRef()
  const [adCanvas, setAdCanvas] = useState<HTMLCanvasElement>(null)
  const [selectorElem, setSelector] = useState()
  const [minimap, setMiniMap] = useState()
  const [selectorWidth, setWidth] = useState(1)
  const [selectorHeight, setHeight] = useState(1)
  const [squreInfo, setSqureInfo] = useState(squreInfoDefault)
  const grid = 5

  const initCanvas = () =>
    // console.log(cAreaRef.current.offsetWidth)
    new fabric.Canvas('adcanvas', {
      containerClass: 'boardd',
      backgroundColor: '',
      width: cAreaRef.current ? cAreaRef?.current.offsetWidth : 1200,
      height: cAreaRef.current ? cAreaRef?.current.offsetWidth : 1200,
    })

  const initMini = () =>
    new fabric.Canvas('minimap', {
      containerClass: '',
      backgroundColor: '#f50070',
      width: cMiniRef.current ? cMiniRef?.current.offsetWidth : 100,
      height: cMiniRef.current ? cMiniRef?.current.offsetWidth : 100,
      top: '100',
    })

  const rect = new fabric.Rect({
    height: grid * selectorHeight,
    width: grid * selectorWidth,
    originX: 'left',
    originY: 'top',
    centeredRotation: true,
    name: 'defaultSelector',
    fill: '#f50070',
    // visible: false,
  })

  useEffect(() => {
    setAdCanvas(initCanvas())
    setMiniMap(initMini())
  }, [])

  useEffect(() => {
    createGrid(adCanvas)
    // if (adCanvas) {
    //   setSelector(adCanvas.add(rect))
    //   adCanvas.centerObject(rect)
    // }
  }, [adCanvas])

  useEffect(() => {
    // console.log(squreInfo)
  }, [squreInfo])

  const createGrid = (adBoard) => {
    if (adBoard) {
      const gridlines = []
      for (let i = 0; i < 1000 / grid; i++) {
        const horiz = new fabric.Line([i * grid, grid, i * grid, 1000], {
          stroke: 'white',
          selectable: false,
          width: 0.1,
        })

        const vertical = new fabric.Line([0, i * grid, 1000, i * grid], {
          stroke: 'white',
          selectable: false,
          width: 0.1,
        })

        gridlines.push(horiz)
        gridlines.push(vertical)
        // console.log({ squre: i, cords: { x: i * grid, y: i * grid } })
      }

      const adGroup = new fabric.Group(gridlines, {
        strokeWidth: 1,
        objectCaching: false,
        selectable: true,
      })

      adBoard.add(adGroup)
      adBoard.add(rect)
      adBoard.zoomToPoint({ x: 0, y: 0 }, adBoard.getZoom() * 3)

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
      const designSize = { width: minimap.width, height: minimap.height }
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
      minimap.backgroundColor = 'black'
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

  const addSelector = () => {
    rect.left = CenterCoord(adCanvas).y
    rect.top = CenterCoord(adCanvas).x
    rect.visible = true

    adCanvas.add(rect)
    setSelector(rect)
    // adCanvas.centerObject(rect)
    let grid = adCanvas.getObjects()[0]
    adCanvas.renderAll()
    grid.sendBackwards()

    updateMiniMap(minimap)
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

      adCanvas.on(
        'mouse:down',
        function (o) {
          adCanvas.selection = true
          const pointer = adCanvas.getPointer(o.e)
          const squreInfoDefault = {
            x: Math.round(pointer.x / grid),
            y: Math.round(pointer.y / grid),
            Price: 1,
            Status: 'Available',
            owner: 'For Sale',
            link: 'quadspace.io',
            area: '1 X 1',
          }
          setSqureInfo(squreInfoDefault)
          updateSelector(squreInfoDefault.x * grid, squreInfoDefault.y * grid)
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
    const elem = adCanvas.getObjects()[1]
    // console.log(adCanvas)
    // if (elem) {
    elem.width = grid * e
    setWidth(grid * e)
    // adCanvas.centerObject(elem)
    adCanvas.renderAll()
    // }
    // adCanvas.centerObject(rect)
    // adCanvas.renderAll()
  }

  const setSelectorHeight = (e) => {
    const elem = adCanvas.getObjects()[1]
    // console.log(adCanvas)
    // if (elem) {
    elem.height = grid * e
    setHeight(grid * e)
    // adCanvas.centerObject(elem)
    adCanvas.renderAll()
    // }
  }

  const updateSelector = (x, y) => {
    const elem = adCanvas.getObjects()[1]
    if (elem) {
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
  }
}
