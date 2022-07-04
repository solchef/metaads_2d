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
  const [enableBuy, setEnableBuy] = useState(true)

  const grid = 1
  const snap = 1
  const initCanvas = () => {
    setAdCanvas(
      new fabric.Canvas('adcanvas', {
        containerClass: '',
        backgroundColor: '',
        width: window.innerWidth,
        height: window.innerWidth,
        name: 'quadspace',
        objectCaching: false,
      })
    )
  }

  fabric.Object.prototype.hasRotatingPoint = false

  const rect = new fabric.Rect({
    height: selectorWidth,
    width: selectorHeight,
    top: 500 - 0.5,
    left: 500 - 0.5,
    centeredRotation: false,
    hasRotatingPoint: false,
    name: 'defaultSelector',
    fill: '##00707b',
    subTargetCheck: true,
    borderColor: ' #000',
    cornerColor: '#a301b9',
    objectCaching: false,
    lockRotation: true,
    lockUniScaling: true,
    lockScalingY: true,
    lockScalingX: true,
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

  const getQuadrant = (data, n, quad) => {
    var result = []
    for (var i = 0; i < data.length; i += n) {
      var p = i + n / 2

      if (quad == 0 && i < data.length / 2) result.push(...data.slice(i, p))
      if (quad == 1 && i < data.length / 2) result.push(...data.slice(p, i + n))
      if (quad == 2 && i >= data.length / 2) result.push(...data.slice(i, p))
      if (quad == 3 && i >= data.length / 2)
        result.push(...data.slice(p, i + n))
    }
    return result
  }

  const createGrid = (adBoard) => {
    setCreateGrid(true)
    if (adBoard) {
      const gridlines = []
      for (let i = 0; i < 1000 / grid; i++) {
        const horiz = new fabric.Line([i * grid, 0, i * grid, 1000], {
          stroke: '#a301b9',
          selectable: false,
          strokeWidth: 0.05,
          objectCaching: false,
        })
        gridlines.push(horiz)

        const vertical = new fabric.Line([0, i * grid, 1000, i * grid], {
          stroke: '#a301b9',
          selectable: false,
          strokeWidth: 0.05,
          objectCaching: false,
        })

        gridlines.push(vertical)
        // console.log({ squre: i, cords: { x: i * grid, y: i * grid } })
      }

      var data = Array.from(Array(1000000), (e, i) => (e = i))

      console.log(JSON.stringify(getQuadrant(data, 10, 0)))
      console.log(JSON.stringify(getQuadrant(data, 10, 1)))
      console.log(JSON.stringify(getQuadrant(data, 10, 3)))

      const purchased = []

      const owned = [
        [0, 0],
        [900, 900],
        [900, 0],
        [0, 900],
        [450, 450],
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
          height: 100,
          width: 100,
          fill: '#7b0000',
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
      adBoard.zoomToPoint({ x: 0, y: 0 }, adBoard.getZoom() * 1.3)
      // adBoard.zoomToPoint(new fabric.Point(0, 0), adBoard.getZoom() * 10)

      adBoard.renderAll()

      // initMinimap(adBoard, minimap)
    }
  }

  const resetPlane = () => {
    adCanvas.zoomToPoint(new fabric.Point(0, 0), 10)
    adCanvas.renderAll()
  }

  const addSelector = () => {
    const elem = adCanvas.getObjects()[1]
    elem.height = 10
    elem.height = 10
    elem.visible = true
    setSelector(elem)
    adCanvas.renderAll()
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
            qty: 1,
          }

          setSqureInfo(squreInfoDefault)
          console.log(enableBuy)
          updateSelector(
            Math.round(pointer.y / grid) - 0.5 * grid,
            Math.round(pointer.x / grid) * grid - 0.5
          )
        },
        { passive: true }
      )

      // adCanvas.on('object:moving', function (options) {
      //   // console.log(adCanvas.getObjects())
      //   options.target.set({
      //     left: Math.round(options.target.left / grid - 0.5) * grid,
      //     top: Math.round(options.target.top / grid - 0.5) * grid,
      //   })
      // })

      adCanvas.on('object:moving', function (options) {
        // Sets corner position coordinates based on current angle, width and height
        options.target.setCoords()

        // Don't allow objects off the canvas
        if (options.target.getLeft() < snap) {
          options.target.setLeft(0)
        }

        if (options.target.getTop() < snap) {
          options.target.setTop(0)
        }

        if (
          options.target.getWidth() + options.target.getLeft() >
          adCanvas.width - snap
        ) {
          options.target.setLeft(adCanvas.width - options.target.getWidth())
        }

        if (
          options.target.getHeight() + options.target.getTop() >
          adCanvas.height - snap
        ) {
          options.target.setTop(adCanvas.height - options.target.getHeight())
        }

        // Loop through objects
        adCanvas.forEachObject(function (obj) {
          if (obj === options.target) return

          // If objects intersect
          if (
            options.target.isContainedWithinObject(obj) ||
            options.target.intersectsWithObject(obj) ||
            obj.isContainedWithinObject(options.target)
          ) {
            var distX =
              (obj.getLeft() + obj.getWidth()) / 2 -
              (options.target.getLeft() + options.target.getWidth()) / 2
            var distY =
              (obj.getTop() + obj.getHeight()) / 2 -
              (options.target.getTop() + options.target.getHeight()) / 2

            // Set new position
            findNewPos(distX, distY, options.target, obj)
          }

          // Snap objects to each other horizontally

          // If bottom points are on same Y axis
          if (
            Math.abs(
              options.target.getTop() +
                options.target.getHeight() -
                (obj.getTop() + obj.getHeight())
            ) < snap
          ) {
            // Snap target BL to object BR
            if (
              Math.abs(
                options.target.getLeft() - (obj.getLeft() + obj.getWidth())
              ) < snap
            ) {
              options.target.setLeft(obj.getLeft() + obj.getWidth())
              options.target.setTop(
                obj.getTop() + obj.getHeight() - options.target.getHeight()
              )
            }

            // Snap target BR to object BL
            if (
              Math.abs(
                options.target.getLeft() +
                  options.target.getWidth() -
                  obj.getLeft()
              ) < snap
            ) {
              options.target.setLeft(obj.getLeft() - options.target.getWidth())
              options.target.setTop(
                obj.getTop() + obj.getHeight() - options.target.getHeight()
              )
            }
          }

          // If top points are on same Y axis
          if (Math.abs(options.target.getTop() - obj.getTop()) < snap) {
            // Snap target TL to object TR
            if (
              Math.abs(
                options.target.getLeft() - (obj.getLeft() + obj.getWidth())
              ) < snap
            ) {
              options.target.setLeft(obj.getLeft() + obj.getWidth())
              options.target.setTop(obj.getTop())
            }

            // Snap target TR to object TL
            if (
              Math.abs(
                options.target.getLeft() +
                  options.target.getWidth() -
                  obj.getLeft()
              ) < snap
            ) {
              options.target.setLeft(obj.getLeft() - options.target.getWidth())
              options.target.setTop(obj.getTop())
            }
          }

          // Snap objects to each other vertically

          // If right points are on same X axis
          if (
            Math.abs(
              options.target.getLeft() +
                options.target.getWidth() -
                (obj.getLeft() + obj.getWidth())
            ) < snap
          ) {
            // Snap target TR to object BR
            if (
              Math.abs(
                options.target.getTop() - (obj.getTop() + obj.getHeight())
              ) < snap
            ) {
              options.target.setLeft(
                obj.getLeft() + obj.getWidth() - options.target.getWidth()
              )
              options.target.setTop(obj.getTop() + obj.getHeight())
            }

            // Snap target BR to object TR
            if (
              Math.abs(
                options.target.getTop() +
                  options.target.getHeight() -
                  obj.getTop()
              ) < snap
            ) {
              options.target.setLeft(
                obj.getLeft() + obj.getWidth() - options.target.getWidth()
              )
              options.target.setTop(obj.getTop() - options.target.getHeight())
            }
          }

          // If left points are on same X axis
          if (Math.abs(options.target.getLeft() - obj.getLeft()) < snap) {
            // Snap target TL to object BL
            if (
              Math.abs(
                options.target.getTop() - (obj.getTop() + obj.getHeight())
              ) < snap
            ) {
              options.target.setLeft(obj.getLeft())
              options.target.setTop(obj.getTop() + obj.getHeight())
            }

            // Snap target BL to object TL
            if (
              Math.abs(
                options.target.getTop() +
                  options.target.getHeight() -
                  obj.getTop()
              ) < snap
            ) {
              options.target.setLeft(obj.getLeft())
              options.target.setTop(obj.getTop() - options.target.getHeight())
            }
          }
        })

        options.target.setCoords()

        // If objects still overlap

        var outerAreaLeft = null,
          outerAreaTop = null,
          outerAreaRight = null,
          outerAreaBottom = null

        adCanvas.forEachObject(function (obj) {
          if (obj === options.target) return

          if (
            options.target.isContainedWithinObject(obj) ||
            options.target.intersectsWithObject(obj) ||
            obj.isContainedWithinObject(options.target)
          ) {
            var intersectLeft = null,
              intersectTop = null,
              intersectWidth = null,
              intersectHeight = null,
              intersectSize = null,
              targetLeft = options.target.getLeft(),
              targetRight = targetLeft + options.target.getWidth(),
              targetTop = options.target.getTop(),
              targetBottom = targetTop + options.target.getHeight(),
              objectLeft = obj.getLeft(),
              objectRight = objectLeft + obj.getWidth(),
              objectTop = obj.getTop(),
              objectBottom = objectTop + obj.getHeight()

            // Find intersect information for X axis
            if (targetLeft >= objectLeft && targetLeft <= objectRight) {
              intersectLeft = targetLeft
              intersectWidth = obj.getWidth() - (intersectLeft - objectLeft)
            } else if (objectLeft >= targetLeft && objectLeft <= targetRight) {
              intersectLeft = objectLeft
              intersectWidth =
                options.target.getWidth() - (intersectLeft - targetLeft)
            }

            // Find intersect information for Y axis
            if (targetTop >= objectTop && targetTop <= objectBottom) {
              intersectTop = targetTop
              intersectHeight = obj.getHeight() - (intersectTop - objectTop)
            } else if (objectTop >= targetTop && objectTop <= targetBottom) {
              intersectTop = objectTop
              intersectHeight =
                options.target.getHeight() - (intersectTop - targetTop)
            }

            // Find intersect size (this will be 0 if objects are touching but not overlapping)
            if (intersectWidth > 0 && intersectHeight > 0) {
              intersectSize = intersectWidth * intersectHeight
            }

            // Set outer snapping area
            if (obj.getLeft() < outerAreaLeft || outerAreaLeft == null) {
              outerAreaLeft = obj.getLeft()
            }

            if (obj.getTop() < outerAreaTop || outerAreaTop == null) {
              outerAreaTop = obj.getTop()
            }

            if (
              obj.getLeft() + obj.getWidth() > outerAreaRight ||
              outerAreaRight == null
            ) {
              outerAreaRight = obj.getLeft() + obj.getWidth()
            }

            if (
              obj.getTop() + obj.getHeight() > outerAreaBottom ||
              outerAreaBottom == null
            ) {
              outerAreaBottom = obj.getTop() + obj.getHeight()
            }

            // If objects are intersecting, reposition outside all shapes which touch
            if (intersectSize) {
              var distX =
                outerAreaRight / 2 -
                (options.target.getLeft() + options.target.getWidth()) / 2
              var distY =
                outerAreaBottom / 2 -
                (options.target.getTop() + options.target.getHeight()) / 2

              // Set new position
              findNewPos(distX, distY, options.target, obj)
            }
          }
        })
      })
    }
  }, [adCanvas, selectorElem, group])

  function findNewPos(distX, distY, target, obj) {
    // See whether to focus on X or Y axis
    if (Math.abs(distX) > Math.abs(distY)) {
      if (distX > 0) {
        target.setLeft(obj.getLeft() - target.getWidth())
      } else {
        target.setLeft(obj.getLeft() + obj.getWidth())
      }
    } else {
      if (distY > 0) {
        target.setTop(obj.getTop() - target.getHeight())
      } else {
        target.setTop(obj.getTop() + obj.getHeight())
      }
    }
  }

  const setSelectorWidth = (e) => {
    const elem = adCanvas.getItemByName('defaultSelector')
    // const scale = elem.getObjectScaling()
    // elem.set('width', grid * e)
    // console.log(e)
    setWidth(grid * e)
    elem.width = grid * e
    adCanvas.renderAll()
  }

  const setSelectorHeight = (e) => {
    const elem = adCanvas.getItemByName('defaultSelector')
    // elem.set('height', grid * e)

    elem.height = grid * e
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
    if (enableBuy) {
      elem.set({
        left: grid * y,
        top: grid * x,
      })
    } else {
      elem.set({
        left: 0,
        top: 0,
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
    enableBuy,
    setEnableBuy,
  }
}
