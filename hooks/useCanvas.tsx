import { useEffect, useRef, useState } from 'react'

import { fabric } from 'fabric'

const squreInfoDefault = {
  x: -1,
  y: -1,
  Price: 0,
  Status: 'Available',
  owner: '0.000942',
  link: 'quadspace.io',
  area: '1 X 1',
  qty: 1,
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
  const [userMode, setUserMode] = useState(1)

  //user modes

  // 1. Viewing and moving around
  // 2. Purchase mode. Allows user to define the purchase area

  const grid = 1
  // console.log(cAreaRef?.current?.clientWidth)
  const initCanvas = () => {
    // canvas-box
    setAdCanvas(
      new fabric.Canvas('adcanvas', {
        containerClass: '',
        backgroundColor: '',
        width: window.innerWidth,
        height: window.innerWidth,
        name: 'quadspace',
        objectCaching: false,
        renderOnAddRemove: true,
      })
    )
  }

  fabric.Object.prototype.hasRotatingPoint = false

  const rect = new fabric.Rect({
    height: selectorWidth,
    width: selectorHeight,
    top: squreInfo.x,
    left: squreInfo.y,
    centeredRotation: false,
    hasRotatingPoint: false,
    name: 'defaultSelector',
    fill: '#f50070',
    subTargetCheck: true,
    borderColor: ' #000',
    cornerColor: '#DDD',
    objectCaching: false,
  })

  useEffect(() => {
    initCanvas()
  }, [])

  useEffect(() => {
    // deleteCanvasItems()
    if (adCanvas) {
      // console.log(gridCreated)
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
          subTargetCheck: true,
        })
        gridlines.push(horiz)

        const vertical = new fabric.Line([0, i * grid, 1000, i * grid], {
          stroke: '#a301b9',
          selectable: false,
          strokeWidth: 0.1,
          objectCaching: false,
          subTargetCheck: true,
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
        subTargetCheck: true,
        objectCaching: false,
        selectable: true,
      })

      setGroup(adGroup)

      adBoard.add(adGroup)
      adBoard.add(rect)

      adBoard.renderAll()

      setUserMode(1)
    }
  }

  useEffect(() => {
    if (adCanvas) {
      defaultZoom()
    }
  }, [adCanvas])

  useEffect(() => {
    // console.log(userMode)
    if (adCanvas) {
      const elem = adCanvas.getItemByName('defaultSelector')
      if (userMode == 1) {
        adCanvas.sendToBack(elem)
      } else {
        adCanvas.bringToFront(elem)
      }

      adCanvas.renderAll()
    }
  }, [userMode])

  const resetPlane = () => {
    var matrix = adCanvas.getObjects()[0].calcTransformMatrix()
    var options = fabric.util.qrDecompose(matrix)
    // console.log(options.translateX, options.translateY)

    // defaultZoom()
    // console.log(adCanvas)
  }

  const addSelector = () => {
    // console.log(adCanvas.getCoords())
    adCanvas.add(rect)
    adCanvas.renderAll()
  }

  const getSelector = () => {}

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

  const defaultZoom = () => {
    if (adCanvas) {
      adCanvas.zoomToPoint(new fabric.Point(0, 0), adCanvas.getZoom() * 10)
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
        // console.log(adCanvas.getObjects()[0].getPointer(o.e))
        try {
          const elem = adCanvas.getObjects()[1]
          adCanvas.setActiveObject(elem)
        } catch (e) {
          // console.log('error')
        }
      })

      // if (group) {
      //   group.on('mousedown', (e) => {
      //     console.log('clicked on image')
      //     console.log(e)

      //     if (e.subTargets[0] && e.subTargets[0].type === 'line') {
      //       // console.log('clicked on image')
      //     }
      //   })
      // }

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
            qty: 1,
          }

          // let group = adCanvas.getObjects()[0]

          // console.log(group)

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
    userMode,
    setUserMode,
  }
}
