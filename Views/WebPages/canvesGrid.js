import { fabric } from 'fabric'
import { setLand, setLandData } from '../../components/reducers/Settings'
import { store } from '../../components/store'
let h = 10,
  w = 10
let x = 0,
  y = 0
let c
let mouseIsDown = false
let buyStatuse = false
let mouseIsMoved = false
let recMove = false
let adGroup
const rectlist = []
const owned = [
  [0, 0],
  [900, 900],
  [900, 0],
  [0, 900],
  [450, 450],
]

const rect = new fabric.Rect({
  height: h,
  width: w,
  top: 500,
  left: 500,
  centeredRotation: false,
  hasRotatingPoint: false,
  name: 'defaultSelector',
  fill: '#00707b',
  subTargetCheck: true,
  borderColor: ' #000',
  cornerColor: '#a301b9',
  objectCaching: false,
  lockRotation: true,
  hasControls: false,
  lockUniScaling: true,
  lockScalingY: true,
  lockScalingX: true,
})

export const loadGrid = () => {
  const size = document.getElementById('container').getBoundingClientRect()
  c = new fabric.Canvas('adcanvass', {
    selection: false,
    height: size.width,
    width: size.width,
  })
  var options = {
      distance: 1,
      height: 1000,
      width: 1000,
      param: {
        stroke: '#a301b9',
        selectable: false,
        strokeWidth: 0.1,
        objectCaching: false,
      },
    },
    gridLen = options.width / options.distance
  c.on(
    'mouse:wheel',
    function (opt) {
      const delta = opt.e.wheelDelta / 20
      let zoom = c.getZoom()
      //   console.log(zoom)
      zoom *= 0.999 ** delta
      if (zoom > 60) zoom = 20
      if (zoom < 0.01) zoom = 0.01
      if (zoom > 2.35 && zoom < 15) c.zoomToPoint({ x: 0, y: 0 }, zoom)
      opt.e.preventDefault()
      opt.e.stopPropagation()

      c.renderAll()
    },
    { passive: true }
  )
  c.on('object:moving', function (options) {
    let offsetNumberX = 0
    let offsetNumberY = 0
    if (!w % 2 == 0) {
      offsetNumberX = 0.5
    }
    if (!h % 2 == 0) {
      offsetNumberY = 0.5
    }
    x = Math.round(options.target.left / 1) * 1 - offsetNumberX
    y = Math.round(options.target.top / 1) * 1 - offsetNumberY
    if (options.target.name === undefined) {
      const maxNumberX = c.vptCoords.br.x - 1001
      const maxNumberY = c.vptCoords.br.y - 1001

      // console.log(options.target.ownMatrixCache.value)
      // console.log(options.target.left)
      // console.log(options.target.top)
      //   console.log(rect)
      //   console.log('..........................')

      // console.log(options.target)
      if (options.target.left >= maxNumberX) {
        if (Math.sign(options.target.left) !== 1) {
          options.target.set({
            left: x,
          })
        } else {
          //   console.log(options.target.oCoords)
          //   console.log(Math.abs(options.target.oCoords.tl.x))
          options.target.set({
            left: 0,
          })
        }
      } else {
        options.target.set({
          left: maxNumberX,
        })
      }
      if (options.target.top >= maxNumberY) {
        if (Math.sign(options.target.top) !== 1) {
          options.target.set({
            top: y,
          })
        } else
          options.target.set({
            top: 0,
          })
      } else {
        options.target.set({
          top: maxNumberY,
        })
      }
    } else {
      options.target.set({
        top: y,
        left: x,
      })
    }
    c.renderAll()
  })
  c.on(
    'mouse:down',
    function (o) {
      //   console.log(o.target)
      //   var activegroup = o.target.getActiveGroup()
      //   console.log(adGroup.getObjects())

      if (o.target.name === 'defaultSelector') {
        c.remove(rect)
        c.remove(adGroup)
        rect.set({
          left: rect.left - 500,
          top: rect.top - 500,
        })
        adGroup.add(rect)
        c.add(adGroup)
        c.renderAll()
      }
      //   console.log(activegroup)
      mouseIsMoved = false
      mouseIsDown = true
      c.selection = true
      const pointer = c.getPointer(o.e)
      let offsetNumberX = 0.5
      let offsetNumberY = 0.5
      if (h % 2 != 0) {
        offsetNumberX = 0
      }
      if (w % 2 != 0) {
        offsetNumberY = 0
      }
      x = Math.round(pointer.x / 1) * 1 - w / 2 - offsetNumberY
      y = Math.round(pointer.y / 1) - (h / 2) * 1 - offsetNumberX
      console.log(x)
      const elem = c.getItemByName('defaultSelector')
      console.log(elem)
      if (elem !== null)
        if (x - 500 >= elem.left && x - 500 <= elem.left + elem.height) {
          if (y - 500 >= elem.top && y - 500 <= elem.top + elem.width) {
            // recMove = true
          }
        }
      if (mouseIsMoved) {
        //   setSqureInfo(squreInfoDefault)
        updateSelector(y, x)
      }
      updateData()
    },
    { passive: true }
  )
  c.on('mouse:up', function (o) {
    mouseIsDown = false
    recMove = false
    c.bringToFront(rect)
    if (!mouseIsMoved) {
      const squreInfoDefault = {
        x: x,
        y: y,
        Price: 1,
        Status: 'Available',
        owner: 'For Sale',
        link: 'quadspace.io',
        area: h + ' X ' + w,
        qty: 1,
      }

      rectlist.push(squreInfoDefault)
    }
    updateData()
  })
  c.on('object:modified', function (options) {
    if (options.target.name === 'defaultSelector')
      options.target.set({
        width: w,
        height: h,
      })
    else {
      //   x: opt.e.offsetX, y: opt.e.offsetY
    }
    updateData()
  })
  c.on('mouse:move', function (e) {
    mouseIsMoved = true
    e.e.preventDefault()
    const pointer = c.getPointer(e)
    let offsetNumberX = 0.5
    let offsetNumberY = 0.5
    if (h % 2 != 0) {
      offsetNumberX = 0
    }
    if (w % 2 != 0) {
      offsetNumberY = 0
    }
    x = Math.round(pointer.x / 1) * 1 - w / 2 - offsetNumberX
    y = Math.round(pointer.y / 1) - (h / 2) * 1 - offsetNumberY
    if (rectlist.length === 0 && buyStatuse) {
      rect.set({
        left: x,
        top: y,
      })
      updateData()
      rect.setCoords()
      c.renderAll()
    } else {
      //   const elem = c.getItemByName('defaultSelector')
      //   elem.bringToFront()

      console.log(x - 500)
      if (mouseIsDown) {
        if (recMove) {
          const elem = c.getItemByName('defaultSelector')
          elem.set({
            left: x - 500,
            top: y - 500,
          })
        }
      }
    }
  })
  const lineList = []
  for (var i = 0; i < 1000; i++) {
    var distance = i * options.distance,
      // var distance = i * options.width/1000,
      horizontal = new fabric.Line(
        [distance, 0, distance, options.width],
        options.param
      ),
      vertical = new fabric.Line(
        [0, distance, options.width, distance],
        options.param
      )
    lineList.push(horizontal)
    lineList.push(vertical)

    // c.add(vertical)
    // c.add(horizontal)
  }
  const rects = []
  const purchased = []
  purchased.forEach((purchase) => {
    const rect2 = new fabric.Rect({
      top: purchase[0] * grid,
      left: purchase[1] * grid,
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
      top: purchase[0] * 1,
      left: purchase[1] * 1,
      height: 100,
      width: 100,
      fill: '#7b0000',
      selection: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      hasControls: false,
      lockUniScaling: true,
      lockScalingY: false,
      lockScalingX: false,
    })
    rects.push(rect2)
    // c.add(rect2)
  })
  adGroup = new fabric.Group([...lineList, ...rects], {
    objectCaching: false,
    hasControls: false,
  })

  c.add(adGroup)
  const updateSelector = (x, y) => {
    const elem = c.getItemByName('defaultSelector')
    elem.set({
      left: 1 * y,
      top: 1 * x,
    })

    c.renderAll()
  }
  c.zoomToPoint({ x: 0, y: 0 }, c.getZoom() * 2.35)
}
const updateData = () => {
  store.dispatch(setLand({ x: x, y: y, w: w, h: h }))
}
export const setBuyStateModal = (value) => {
  buyStatuse = value
  if (value) {
    c.add(rect)
  } else {
    c.remove(rect)
  }
}

export const setWidth = (size) => {
  w = parseInt(size)
  const elem = c.getItemByName('defaultSelector')
  elem.set({
    width: w,
    height: h,
  })
  updateData()
  c.renderAll()
}

export const fitScrean = () => {
  //   c.clear()
  loadGrid()
}

export const zoomIn = () => {
  if (c.getZoom() * 0.9 >= 2.35) c.setZoom(c.getZoom() * 0.9)
  else c.setZoom(2.35)
}

export const zoomOut = () => {
  c.setZoom(c.getZoom() * 1.1)
}

export const getLandDefSize = () => {
  return { w, h, x, y }
}

export const getLands = () => {
  return rectlist
}

export const setHeight = (size) => {
  h = parseInt(size)
  const elem = c.getItemByName('defaultSelector')
  elem.set({
    width: w,
    height: h,
  })
  updateData()
  c.renderAll()
}
