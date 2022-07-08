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

const loadEvents = () => {
  c.on('mouse:wheel', onWheel, { passive: true })
  c.on('object:moving', onObjectMoving, { passive: true })
  c.on('mouse:down', onMouseDown, { passive: true })
  c.on('mouse:up', onMouseUp, { passive: true })
  c.on('object:modified', onObjectModified, { passive: true })
  c.on('mouse:move', onMouseMove, { passive: true })
  c.on('after:render', function () {
    c.calcOffset()
  })
}

export const loadGrid = (mintingData) => {
  const size = document.getElementById('container').getBoundingClientRect()
  c = new fabric.Canvas('adcanvass', {
    // selection: false,
    height: size.height,
    width: size.width,
  })
  var options = {
    distance: 1,
    height: c.height,
    width: 1000,
    param: {
      type: 'line',
      stroke: '#a301b9',
      selectable: false,
      strokeWidth: 0.05,
      objectCaching: false,
    },
  }

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

  mintingData.otherQuads.forEach((all) => {
    let x = Math.ceil(Number(all) / 1000)
    let y = Number(all) % 1000

    const rect2 = new fabric.Rect({
      top: x * options.distance - 0.5,
      left: y * options.distance - 0.5,
      height: options.distance,
      width: options.distance,
      fill: '#7b0000',
      selection: false,
    })
    rects.push(rect2)
  })

  mintingData.walletQuads.forEach((own) => {
    let x = Math.ceil(Number(own) / 1000)
    let y = Number(own) % 1000

    const rect2 = new fabric.Rect({
      top: x * options.distance - 0.5,
      left: y * options.distance - 0.5,
      height: options.distance,
      width: options.distance,
      fill: '#f0ad4e',
      selection: false,
    })
    rects.push(rect2)
  })

  owned.forEach((purchase) => {
    const rect2 = new fabric.Rect({
      top: purchase[0] * 1 - 0.5,
      left: purchase[1] * 1 - 0.5,
      height: 100,
      width: 100,
      fill: '#7b0000',
      selection: false,
    })
    rects.push(rect2)
    // c.add(rect2)
  })

  adGroup = new fabric.Group([...lineList, ...rects], {
    objectCaching: false,
    hasControls: false,
    // preserveObjectStacking: true,
    // height: 1000,
    // width: 1000,
  })

  adGroup.set({
    left: -103,
    top: -90,
  })
  c.add(adGroup)

  c.zoomToPoint({ x: 0, y: 0 }, c.getZoom() * 11.5)

  loadEvents()
}

/////////////////    update location
const updateData = () => {
  store.dispatch(setLand({ x: x - 0.5 + 502, y: y - 0.5 + 502, w: w, h: h }))
}

const updateSelector = (x, y) => {
  const elem = c.getItemByName('defaultSelector')
  elem.set({
    left: 1 * y,
    top: 1 * x,
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
  x = Math.round(pointer.x / 1) * 1 - w / 2 - offsetNumberX
  y = Math.round(pointer.y / 1) - (h / 2) * 1 - offsetNumberY

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
        console.log(x - 500)
        elem.set({
          left: x - 500,
          top: y - 500,
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
    if (mobile) {
      const pointer = c.getPointer(o.e)
      let offsetNumberX = 0
      let offsetNumberY = 0
      if (h % 2 != 0) {
        offsetNumberX = 0
      }
      if (w % 2 != 0) {
        offsetNumberY = 0
      }
      x = Math.round(pointer.x / 1) * 1 - w / 2 - offsetNumberY
      y = Math.round(pointer.y / 1) - (h / 2) * 1 - offsetNumberX
      // console.log(x, y)
      c.remove(rect)
      c.remove(adGroup)
      rect.set({
        left: x - 500,
        top: y - 500,
      })
      adGroup.add(rect)
      c.add(adGroup)
      c.renderAll()
    }
    rectlist.push(squreInfoDefault)
  }
  //x: x, y: y
  x = rect.left
  y = rect.top
  updateData()
}

const onMouseDown = (o) => {
  const pointer = c.getPointer(o.e)
  let offsetNumberX = 0
  let offsetNumberY = 0
  if (h % 2 != 0) {
    offsetNumberX = 0
  }
  if (w % 2 != 0) {
    offsetNumberY = 0
  }
  x = Math.round(
    (pointer.x / 1) * 1 - w / 2 - offsetNumberY - 500 - adGroup.left
  )
  y = Math.round(
    pointer.y / 1 - (h / 2) * 1 - offsetNumberX - 500 - adGroup.top
  )
  if (buyStatuse) {
    mouseIsMoved = false
    mouseIsDown = true
    c.selection = true
    if (o.target.name === 'defaultSelector' && !mobile) {
      c.remove(rect)
      c.remove(adGroup)
      adGroup.add(rect)
      c.add(adGroup)
      rect.set({
        left: x - 0.5,
        top: y - 0.5,
      })
      c.renderAll()
    }

    if (mouseIsMoved) {
      //   setSqureInfo(squreInfoDefault)
      updateSelector(y, x)
    } else {
    }

    updateData()
  } else {
    c.add(locationPointer)
    locationPointer.set({
      left: Math.round(pointer.x / 1) - 0.5,
      top: Math.round(pointer.y / 1) - 0.5,
    })
    // locationPointer.setCoords()
    // c.renderAll()
  }
}

const onWheel = (opt) => {
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
}

const onObjectMoving = (options) => {
  // console.log(adGroup.oCoords)
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

  if (options.target.name === undefined) {
    const maxNumberX = c.vptCoords.br.x - 1001
    const maxNumberY = c.vptCoords.br.y - 1001

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
      top: y - 0.5,
      left: x - 0.5,
    })
  }
  c.renderAll()
}

/////////////////
export const setBuyStateModal = (value) => {
  buyStatuse = value
  if (value) {
    c.add(rect)
  } else {
    c.remove(rect)
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
}

///////////////
export const zoomOut = () => {
  c.setZoom(c.getZoom() * 1.1)

  if (c.getZoom() * 1.1 < 15) c.setZoom(c.getZoom() * 1.1)
  else c.setZoom(15)
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
    return 1
  }
}

export const getViewLocation = () => {
  let viewGrid
  if (adGroup) {
    viewGrid = {
      x: locationPointer.left - adGroup.left,
      y: locationPointer.top - adGroup.left,
    }
  } else {
    viewGrid = {
      x: locationPointer.left,
      y: locationPointer.top,
    }
  }

  return viewGrid
}
