import { fabric } from 'fabric'
import { MetaadsContractUnsigned } from '../../../utils/readOnly'
const fs = require('fs')

export default async function handler(req, res) {
  var options = {
    distance: 10,
    height: 1000,
    width: 1000,
    param: {
      type: 'line',
      stroke: '#a301b9',
      selectable: false,
      strokeWidth: 0.1,
      objectCaching: false,
    },
  }

  let scaler = 10

  // const splitLand = () => {
  //   for (var i = 0; i < 200; i++) {
  //     for (var j = 0; j < 250; j++) {
  //       let horizontal = new fabric.Rect({
  //         top: i * 10,
  //         left: j * 10,
  //         height: 1 * scaler,
  //         width: 1 * scaler,
  //         fill: '#7b0000',
  //         selection: false,
  //       })
  //       c.add(horizontal)
  //     }
  //   }
  // }

  let minted = await MetaadsContractUnsigned.occupiedList()

  let rects = []
  const quadmints = [
    [0, 0],
    [0, 1350],
    [425, 0],
    [425, 1350],
    [212, 675],
  ]

  let c = new fabric.StaticCanvas(null, { width: 16000, height: 6250 })

  //   contractmints
  minted.forEach(async (nft) => {
    let x = Number(nft) % 1000
    let y = Math.ceil(Number(nft) / 1000)

    const quad = await new fabric.Rect({
      top: x * scaler,
      left: y * scaler,
      height: 1 * scaler,
      width: 1 * scaler,
      fill: '#7b0000',
      selection: false,
    })
    c.add(quad)
  })

  //quadmints
  let pieces = []

  let finalImage: any
  let soldoutland: any

  quadmints.forEach((q) => {
    console.log(q)

    fabric.Image.fromURL(
      'https://faniasets.s3.us-east-2.amazonaws.com/assets/images/soldoutrep.png',
      function (myImg) {
        var img1 = myImg.set({
          left: q[1] * scaler,
          top: q[0] * scaler,
          width: 2500,
          height: 2000,
        })
        c.add(img1)
      }
    )
  })

  await fabric.Image.fromURL(
    'https://quadspace.io/blank.svg',
    async function (oImg) {
      let scaleX = 16000 / oImg.width
      let scaleY = 6250 / oImg.height
      oImg.set({
        left: 0,
        top: 0,
        scaleX: scaleX,
        scaleY: scaleY,
      })

      await c.add(oImg)
      await c.renderAll()

      finalImage = c.toSVG()

      let pathToWriteImage = 'public/adspace.svg'
      await fs.writeFileSync(pathToWriteImage, finalImage)

      res.end(c.toSVG())
    }
  )
}
