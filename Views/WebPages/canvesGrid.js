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

const loadEvents = () => {
    c.on('mouse:wheel', onWheel, { passive: true })
    c.on('object:moving', onObjectMoving, { passive: true })
    c.on('mouse:down', onMouseDown, { passive: true })
    c.on('mouse:up', onMouseUp, { passive: true })
    c.on('object:modified', onObjectModified, { passive: true })
    c.on('mouse:move', onMouseMove, { passive: true })
    c.on('after:render', function() {
        c.calcOffset()
    })
}


const lineList = (params) => {
    const lines = []
    for (var i = 0; i < 1000; i++) {
        var distance = i * options.distance,
            horizontal = new fabric.Line(
                [distance, 0, distance, options.width],
                params
            ),
            vertical = new fabric.Line(
                [0, distance, options.width, distance],
                params
            )
        lines.push(horizontal)
        lines.push(vertical)
    }

    return lines;
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


    // console.log(lineList)

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

    adGroup = new fabric.Group([...lineList(options.param), ...rects], {
        objectCaching: false,
        hasControls: false,

    })

    adGroup.set({
        left: -109,
        top: -70,
    })
    c.add(adGroup)

    c.zoomToPoint({ x: 0, y: 0 }, c.getZoom() * 15.0)
    c.add(locationPointer)
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
        // rect.set({
        //     left: x,
        //     top: y,
        // })
        // rect.setCoords()
        // c.renderAll()
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

const onMouseDown = async(o) => {
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
        if (mobile) {
            rect.set({
                left: Math.round(pointer.x / 1),
                top: Math.round(pointer.y / 1),
            })
            rect.setCoords()
            c.renderAll()
        }

        if (mouseIsMoved) {
            updateSelector(y, x)
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
        if (zoom > 2.35 && zoom < 15) c.zoomToPoint({ x: 0, y: 0 }, zoom)
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
export const setBuyStateModal = async(value) => {
    buyStatuse = value
    if (value) {
        await animateTransition(locationPointer.left, locationPointer.top)
        c.set({ hoverCursor: 'move' })
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
        c.remove(locationPointer)
        c.renderAll()
    } else {
        c.set({ hoverCursor: 'grab' })
        adGroup.set({
            lockMovementX: false,
            lockMovementY: false,
        })
        c.add(locationPointer)

        rect.set({
            left: -500,
            top: -500,
        })
        rect.setCoords()
        c.remove(rect)
        adGroup.remove(rect)
        c.remove(adGroup)
        c.add(adGroup)

        c.renderAll()
    }
}

const animateTransition = (left, top) => {
    for (var i = 1; i < 10; i++) {
        var clickedPulse = new fabric.Circle({
            radius: 5,
            fill: 'rgba(0,0,0,0)',
            stroke: 'rgba(0,0,0,' + (1 - i / 4) + ')',
            strokeWidth: 5,
            left: left,
            top: top,
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX: 'center',
            originY: 'center',
        })
        c.add(clickedPulse)
        clickedPulse.animate({
            radius: 11 - i,
            opacity: 0,
        }, {
            onChange: c.renderAll.bind(c),
            duration: 600 + i * 200,

            onComplete: function() {
                c.remove(locationPointer)
                c.remove(clickedPulse)
                c.renderAll()
            },
        })
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