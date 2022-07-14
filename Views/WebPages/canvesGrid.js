import { fabric } from 'fabric'
import { setLand, setLandData } from '../../components/reducers/Settings'
import { store } from '../../components/store'
let h = 10,
  w = 10
let x = 900,
  y = 0
let c
let mouseIsDown = false
let buyStatuse = false
let mouseIsMoved = false
let mobile = false
let recMove = false
let adGroup
let allowPositioning = true

const rectlist = []

const owned = [
  [0, 0],
  [0, 1350],
  [425, 0],
  [425, 1350],
  [212, 675],
]

var options = {
  distance: 1,
  height: 1000,
  width: 1000,
  param: {
    type: 'line',
    stroke: '#a301b9',
    selectable: false,
    strokeWidth: 0.03,
    objectCaching: false,
    opacity: 1,
  },
}

const rect = new fabric.Rect({
  height: h,
  width: w,
  top: -10 - 0.5,
  left: -10 - 0.5,
  name: 'defaultSelector',
  fill: '#00707b',
  borderColor: ' #000',
  cornerColor: '#a301b9',
  lockRotation: true,
  hasControls: false,
})

const locationPointer = new fabric.Rect({
  height: 1,
  width: 1,
  top: 1,
  left: 1,
  name: 'pointerselector',
  fill: '#a301b9',
  borderColor: ' #000',
  cornerColor: '#a301b9',
  lockRotation: true,
  hasControls: false,
})

const drawRect = (params) => {
  const quad = new fabric.Rect({
    top: x * options.distance - 0.5,
    left: y * options.distance - 0.5,
    height: options.distance,
    width: options.distance,
    fill: params.fill,
    selection: false,
  })

  return quad
}

const loadEvents = () => {
  c.on('mouse:wheel', onWheel, { passive: true })
  c.on('object:moving', onObjectMoving, { passive: true })
  c.on('mouse:down', onMouseDown, { passive: true })
  c.on('mouse:up', onMouseUp, { passive: true })
  c.on('object:modified', onObjectModified, { passive: true })
  c.on('mouse:move', onMouseMove, { passive: true })
}

export const loadGrid = (mintingData) => {
  const size = document.getElementById('container').getBoundingClientRect()

  c = new fabric.Canvas('adcanvass', {
    // selection: false,
    height: size.height,
    width: size.width,
    hoverCursor: 'grab',
    moveCursor: 'grabbing',
  })

  const rects = []
  const purchased = []

  mintingData.walletQuads.forEach((quad) => {
    let x = Math.ceil(Number(quad) / 1000)
    let y = Number(quad) % 1000
    const quad = drawRect({
      fill: '#f0ad4e',
      top: x * 1,
      left: y * 1,
    })
    rects.push(quad)
  })

  fabric.loadSVGFromURL('/adspace.svg', function (objects) {
    var shapeObject = fabric.util.groupSVGElements(objects)
    shapeObject.set({
      left: 0,
      top: 0,
      scaleX: 1600 / 16000,
      scaleY: 625 / 6250,
      objectCaching: false,
    })

    adGroup = new fabric.Group([shapeObject, ...rects], {
      objectCaching: false,
      hasControls: false,
      name: 'adboard',
    })
    c.add(adGroup)
  })

  c.zoomToPoint({ x: 0, y: 0 }, c.getZoom() * 1.2)
  c.add(locationPointer)
  loadEvents()
}

/////////////////    update location
const updateData = () => {
  // store.dispatch(setLand({ x: x - 0.5 + 502, y: y - 0.5 + 502, w: w, h: h }))
  if (adGroup) {
    store.dispatch(
      setLand({
        x: Math.round(rect.left - adGroup.left),
        y: Math.round(rect.top - adGroup.top),
        w: w,
        h: h,
      })
    )
  }
}

const updateSelector = (x, y) => {
  const elem = c.getItemByName('defaultSelector')
  elem.set({
    left: 1 * Math.round(x / 1) + elem.width / 2,
    top: 1 * Math.round(y / 1) + elem.width / 2,
  })

  c.renderAll()
}

/////////////////    events
const onMouseMove = (e) => {
  mouseIsMoved = true
  e.e.preventDefault()
  const pointer = c.getPointer(e.e)
  let offsetNumberX = 0.5
  let offsetNumberY = 0.5
  if (h % 2 != 0) {
    offsetNumberX = 0
  }
  if (w % 2 != 0) {
    offsetNumberY = 0
  }
  // x = Math.round(pointer.x / 1) * 1 - w / 2 - offsetNumberX
  // y = Math.round(pointer.y / 1) - (h / 2) * 1 - offsetNumberY

  x = Math.round(pointer.x / 1)
  y = Math.round(pointer.y / 1)

  if (rectlist.length === 0 && buyStatuse) {
    rect.set({
      left: x,
      top: y,
    })
    rect.setCoords()
    c.renderAll()
  } else {
    if (mouseIsDown) {
      if (recMove) {
        const elem = c.getItemByName('defaultSelector')
        // console.log(x - 500)
        elem.set({
          left: x,
          top: y,
        })
      }
    }
  }
  x = rect.left
  y = rect.top
  updateData()
}

const onObjectModified = (options) => {
  if (options.target.name === 'defaultSelector')
    options.target.set({
      width: w,
      height: h,
    })
  else {
    //   x: opt.e.offsetX, y: opt.e.offsetY
  }
  updateData()
}

const onMouseUp = (o) => {
  mouseIsDown = false
  recMove = false
  c.bringToFront(rect)
  c.setActiveObject(rect)

  const pointer = c.getPointer(o.e)
  let offsetNumberX = 0
  let offsetNumberY = 0
  if (h % 2 != 0) {
    offsetNumberX = 0
  }
  if (w % 2 != 0) {
    offsetNumberY = 0
  }
  // x = Math.round(pointer.x / 1) * 1 - w / 2 - offsetNumberY
  // y = Math.round(pointer.y / 1) - (h / 2) * 1 - offsetNumberX

  x = Math.round(pointer.x / 1)
  y = Math.round(pointer.y / 1)

  if (!mouseIsMoved && buyStatuse) {
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

    locationPointer.setCoords()

    if (mobile) {
      // console.log(x, y)
      // c.remove(rect)
      // c.remove(adGroup)
      // rect.set({
      //   left: x - 500,
      //   top: y - 500,
      // })
      // adGroup.add(rect)
      // c.add(adGroup)
      // c.renderAll()
    }
    rectlist.push(squreInfoDefault)
  }

  if (buyStatuse) {
    // rect.set({
    //     left: Math.round(pointer.x / 1),
    //     top: Math.round(pointer.y / 1),
    // })
    // rect.setCoords()
  }

  if (!buyStatuse) {
    // c.add(locationPointer)
    locationPointer.set({
      left: Math.round(pointer.x / 1),
      top: Math.round(pointer.y / 1),
    })
    locationPointer.setCoords()
  }

  x = rect.left
  y = rect.top
  updateData()
}

const onMouseDown = async (o) => {
  const pointer = c.getPointer(o.e)
  let offsetNumberX = 0
  let offsetNumberY = 0
  if (h % 2 != 0) {
    offsetNumberX = 0
  }
  if (w % 2 != 0) {
    offsetNumberY = 0
  }
  // x = Math.round(
  //     (pointer.x / 1) * 1 - w / 2 - offsetNumberY - 500 - adGroup.left
  // )
  // y = Math.round(
  //     pointer.y / 1 - (h / 2) * 1 - offsetNumberX - 500 - adGroup.top
  // )

  x = Math.round(pointer.x / 1)
  y = Math.round(pointer.y / 1)

  if (buyStatuse) {
    mouseIsMoved = false
    mouseIsDown = true
    c.selection = true
    if (mobile || allowPositioning === true) {
      rect.set({
        left: Math.round(pointer.x / 1),
        top: Math.round(pointer.y / 1),
      })
      rect.setCoords()
      c.renderAll()

      allowPositioning = false
    }

    if (mouseIsMoved) {
      updateSelector(x, y)
    }
  } else {
    // c.add(locationPointer)
    locationPointer.set({
      left: Math.round(pointer.x / 1),
      top: Math.round(pointer.y / 1),
    })
    locationPointer.setCoords()
  }

  updateData()
}

const onWheel = (opt) => {
  if (!buyStatuse) {
    const delta = opt.e.wheelDelta / 20
    let zoom = c.getZoom()
    //   console.log(zoom)
    zoom *= 0.999 ** delta
    if (zoom > 60) zoom = 20
    if (zoom < 0.01) zoom = 0.01
    if (zoom > 1.2 && zoom < 15) c.zoomToPoint({ x: 0, y: 0 }, zoom)
    opt.e.preventDefault()
    opt.e.stopPropagation()

    c.renderAll()
  }
}

const onObjectMoving = (options) => {
  c.setCursor('grabbing')

  let offsetNumberX = 0.5
  let offsetNumberY = 0.5
  if (!w % 2 == 0) {
    offsetNumberX = 0.5
  }
  if (!h % 2 == 0) {
    offsetNumberY = 0.5
  }
  x = Math.round(options.target.left / 1) * 1
  y = Math.round(options.target.top / 1) * 1
  if (options.target.name === 'adboard') {
    const maxNumberX = c.vptCoords.br.x - 1600
    const maxNumberY = c.vptCoords.br.y - 625

    if (options.target.left >= maxNumberX) {
      if (Math.sign(options.target.left) !== 1) {
        options.target.set({
          left: x,
        })
      } else {
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
}

/////////////////
export const setBuyStateModal = async (value) => {
  buyStatuse = value
  if (value) {
    allowPositioning = true
    c.set({ hoverCursor: 'move' })
    animateTransition(
      locationPointer.left,
      locationPointer.top + rect.height + 1,
      'buy'
    )
    c.add(rect)

    adGroup.set({
      lockMovementX: true,
      lockMovementY: true,
    })
    rect.set({
      left: locationPointer.left,
      top: locationPointer.top,
    })
    rect.setCoords()
    c.renderAll()
  } else {
    animateTransition(rect.left, rect.top + 1, 'view')

    adGroup.set({
      lockMovementX: false,
      lockMovementY: false,
    })
    c.set({ hoverCursor: 'grab' })
    c.add(locationPointer)

    rect.set({
      left: -500,
      top: -500,
    })
    rect.setCoords()
    c.remove(adGroup)
    c.add(adGroup)

    c.renderAll()
  }
}

const animateTransition = (left, top, type) => {
  for (var i = 1; i < 5; i++) {
    let stringMessage = `You are on ${type} Mode`

    var clickedPulse = new fabric.Text(stringMessage, {
      fontWeight: 'bold',
      fill: '#a301b9',
      top: top,
      left: left,
      fontSize: 4,
    })

    c.add(clickedPulse)

    clickedPulse.animate(
      {
        // radius: 10 - i,
        opacity: 0,
      },
      {
        // onChange: c.renderAll.bind(c),
        duration: 600 + i * 200,
        onComplete: function () {
          if (type == 'buy') {
            c.remove(locationPointer)
          } else {
            c.remove(rect)
          }
          c.remove(clickedPulse)
          c.renderAll()
        },
      }
    )
  }
}

///////////
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

////////////
export const fitScrean = (mintingData) => {
  //   c.clear()
  loadGrid(mintingData)
}

///////////////
export const zoomIn = () => {
  if (c.getZoom() * 0.9 >= 2.35) c.setZoom(c.getZoom() * 0.9)
  else c.setZoom(2.35)

  return c.getZoom().toFixed(1)
}

///////////////
export const zoomOut = () => {
  c.setZoom(c.getZoom() * 1.1)

  if (c.getZoom() * 1.1 < 15) c.setZoom(c.getZoom() * 1.1)
  else c.setZoom(15)

  return c.getZoom().toFixed(1)
}

////////////////
export const getLandDefSize = () => {
  return { w, h, x, y }
}

///////////////////
export const getLands = () => {
  return rectlist
}

//////////////////////
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

//////////////////////
export const getZoomLevel = () => {
  if (c) {
    return c.getZoom().toFixed(1)
  } else {
    return 15
  }
}

export const getViewLocation = () => {
  let viewGrid
  if (adGroup) {
    viewGrid = {
      x: locationPointer.left - adGroup.left,
      y: locationPointer.top - adGroup.top,
    }
  } else {
    viewGrid = {
      x: locationPointer.left,
      y: locationPointer.top,
    }
  }

  return viewGrid
}
