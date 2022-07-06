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
    const size2 = document.getElementById('container').innerHeight

    c = new fabric.Canvas('adcanvass', {
        selection: false,
        height: size.width,
        width: size.width,
    })
    var options = {
            distance: 1,
            width: c.width,
            height: c.height,
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
        function(opt) {
            const delta = opt.e.wheelDelta / 20
            let zoom = c.getZoom()

            zoom *= 0.999 ** delta
            if (zoom > 60) zoom = 20
            if (zoom < 0.01) zoom = 0.01
            if (zoom > 1.298 && zoom < 15)
                c.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
            opt.e.preventDefault()
            opt.e.stopPropagation()

            c.renderAll()
        }, { passive: true }
    )
    c.on('object:moving', function(options) {
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
        options.target.set({
            left: Math.round(options.target.left / 1) * 1 - offsetNumberX,
            top: Math.round(options.target.top / 1) * 1 - offsetNumberY,
        })
    })
    c.on(
        'mouse:down',
        function(o) {
            mouseIsMoved = false
            mouseIsDown = true
            c.selection = true
            if (mouseIsMoved) {
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
                    //   setSqureInfo(squreInfoDefault)
                updateSelector(y, x)
            }
            updateData()
        }, { passive: true }
    )
    c.on('mouse:up', function(o) {
        mouseIsDown = false
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
    c.on('object:modified', function(options) {
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
    c.on('mouse:move', function(e) {
        mouseIsMoved = true
        if (rectlist.length === 0 && buyStatuse) {
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
            rect.set({
                left: x,
                top: y,
            })
            updateData()
            rect.setCoords()
            c.renderAll()
        } else {
            //   if (mouseIsDown) console.log(e)
        }
    })
    const lineList = []
    for (var i = 0; i < 1000; i++) {
        // var distance = i * options.distance,
        var distance = i * options.width / 1000,
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
    const adGroup = new fabric.Group([...lineList, ...rects], {
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
    c.zoomToPoint({ x: 0, y: 0 }, c.getZoom() * 1.7)
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
    c.clear()
    loadGrid()
}

export const zoomIn = () => {
    if (c.getZoom() * 0.9 >= 1.3) c.setZoom(c.getZoom() * 0.9)
    else c.setZoom(1.3)
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