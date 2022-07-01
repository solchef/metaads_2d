import { useEffect, useRef, useState } from 'react'

import { fabric } from 'fabric'

const squreInfoDefault = {
  x: -1,
  y: -1,
  Price: 0,
  Status: 'Available',
  owner: 'For Sale',
  link: 'quadspace.io',
  area: '1 X 1',
}

export default function useCanvas() {
  const cAreaRef = useRef<HTMLDivElement>()
  const cMiniRef = useRef<HTMLDivElement>()
  const [adCanvas, setAdCanvas] = useState(null)
  const [selectorElem, setSelector] = useState()
  const [objPos, setObjPos] = useState({ left: 0, top: 0 })
  // const [minimap, setMiniMap] = useState()
  const [selectorWidth, setWidth] = useState(1)
  const [group, setGroup] = useState()
  const [selectorHeight, setHeight] = useState(1)
  const [squreInfo, setSqureInfo] = useState(squreInfoDefault)
  const [gridCreated, setCreateGrid] = useState(false)
  // const [selectedSqures, setSelectedSqures] = useState([])

  const grid = 1
  // console.log(cAreaRef?.current?.clientWidth)
  const initCanvas = () =>
    setAdCanvas(
      new fabric.Canvas('adcanvas', {
        containerClass: '',
        backgroundColor: '',
        width: 1500,
        height: 1500,
        name: 'quadspace',
        objectCaching: false,
      })
    )

  fabric.Object.prototype.hasRotatingPoint = false

  const rect = new fabric.Rect({
    height: selectorWidth,
    width: selectorHeight,
    top: 500 - 0.5,
    left: 500 - 0.5,
    centeredRotation: false,
    hasRotatingPoint: false,
    name: 'defaultSelector',
    fill: '#f50070',
    subTargetCheck: true,
    borderColor: ' #000',
    cornerColor: '#DDD',
    objectCaching: true,
  })

  useEffect(() => {
    initCanvas()
  }, [])

  useEffect(() => {
    // deleteCanvasItems()
    if (adCanvas) {
      console.log(gridCreated)
      if (!gridCreated) createGrid(adCanvas)
    }
  }, [adCanvas])

  const createGrid = (adBoard) => {
    setCreateGrid(true)
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

      const purchased = []

      const owned = []

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
      // adBoard.zoomToPoint({ x: 0, y: 0 }, adBoard.getZoom() * 30)
      adBoard.zoomToPoint(new fabric.Point(500, 500), adBoard.getZoom() * 10)

      adBoard.renderAll()

      // initMinimap(adBoard, minimap)
    }
  }

  const resetPlane = () => {
    adCanvas.zoomToPoint(new fabric.Point(500, 500), 10)
    adCanvas.renderAll()
  }

  const addSelector = () => {
    const elem = adCanvas.getObjects()[1]

    // elem.left = squreInfo.x + 0.5
    // elem.top = squreInfo.y + 0.5
    elem.scaleX = 10
    elem.scaleY = 10
    elem.visible = true
    // adCanvas.add(rect)
    setSelector(elem)
    adCanvas.renderAll()

    console.log(elem)
  }

  const getCurrentXoYo = () => {
    const obj = adCanvas.getObjects()[0]
    setObjPos({
      left: obj.left,
      top: obj.top,
    })

    return {
      left: obj.left,
      top: obj.top,
    }
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
          const delta = opt.e.wheelDelta / 20
          let zoom = adCanvas.getZoom()
          zoom *= 0.999 ** delta
          if (zoom > 60) zoom = 20
          if (zoom < 0.01) zoom = 0.01
          adCanvas.setZoom(zoom)
          opt.e.preventDefault()
          opt.e.stopPropagation()

          adCanvas.renderAll()
        },
        { passive: true }
      )

      adCanvas.on('mouse:up', function (o) {
        const elem = adCanvas.getObjects()[1]
        adCanvas.setActiveObject(elem)
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
            Math.round(pointer.y / grid) - 0.5 * grid,
            Math.round(pointer.x / grid) * grid - 0.5
          )
        },
        { passive: true }
      )

      adCanvas.on('object:moving', function (options) {
        // console.log(adCanvas.getObjects())
        options.target.set({
          left: Math.round(options.target.left / grid - 0.5) * grid,
          top: Math.round(options.target.top / grid - 0.5) * grid,
        })
      })
    }
  }, [adCanvas, selectorElem, group])

  const setSelectorWidth = (e) => {
    const elem = adCanvas.getItemByName('defaultSelector')
    // const scale = elem.getObjectScaling()
    // elem.set('width', grid * e)
    // console.log(e)
    setWidth(grid * e)
    elem.scaleX = grid * e
    adCanvas.renderAll()
  }

  const setSelectorHeight = (e) => {
    const elem = adCanvas.getItemByName('defaultSelector')
    // elem.set('height', grid * e)

    elem.scaleY = grid * e
    setHeight(grid * e)
    adCanvas.renderAll()
  }

  const getMintImage = () => {
    return adCanvas.toDataURL()
  }

  fabric.Canvas.prototype.getItemByName = function (name) {
    var object = null,
      objects = this.getObjects()

    for (var i = 0, len = this.size(); i < len; i++) {
      if (objects[i].name && objects[i].name === name) {
        object = objects[i]
        break
      }
    }

    return object
  }

  const updateSelector = (x, y) => {
    const elem = adCanvas.getItemByName('defaultSelector')

    //chage and update centerpoint of object
    if (elem) {
      elem.set({
        left: grid * y,
        top: grid * x,
      })
    }
    adCanvas.renderAll()
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
    getMintImage,
    resetPlane,
    getCurrentXoYo,
  }
}
