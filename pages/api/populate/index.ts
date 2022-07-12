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

  const splitLand = (width, height, x, y) => {
    const landSplitter = []

    for (var i = 0; i < height; i++) {
      var distance = i * options.distance,
        horizontal = new fabric.Line(
          [distance, 0, distance, width],
          options.param
        ),
        vertical = new fabric.Line(
          [0, distance, height, distance],
          options.param
        )
      landSplitter.push(horizontal)
      landSplitter.push(vertical)
    }

    return landSplitter
  }

  let minted = await MetaadsContractUnsigned.occupiedList()
  let rects = []
  let quadmints = []
  const owned = [
    [0, 0],
    [0, 1350],
    [425, 0],
    [425, 1350],
    [212, 675],
  ]

  let soldOutHeight = 200

  let soldOutWidth = 250

  let c = new fabric.StaticCanvas(null, { width: 16000, height: 6250 })

  // await owned.forEach((own) => {
  //   let squrePos = own[0] * 1000 + own[1]

  //   for (
  //     let ownedquad = squrePos;
  //     ownedquad < squrePos + soldOutWidth;
  //     ownedquad++
  //   ) {
  //     for (let i = 0; i < soldOutHeight; i++) {
  //       quadmints.push(ownedquad + i * 1000)
  //     }
  //   }
  // })

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
    //   console.log(quad)
    c.add(quad)
    // rects.push(quad)
  })

  //quadmints
  let pieces = []

  owned.forEach(async (nft) => {
    let x = Number(nft) % 16000
    let y = Math.ceil(Number(nft) / 6250)
    const quad = await new fabric.Rect({
      top: nft[0] * scaler,
      left: nft[1] * scaler,
      height: 2000,
      width: 2500,
      fill: '#7b0000',
      selection: false,
    })

    // let splitters = await splitLand(quad.width, quad.height, x, y)

    // const splittedLand = new fabric.Group([[...splitters], quad], {
    //   objectCaching: false,
    //   hasControls: false,
    //   name: 'adboard',
    // })
    // //   console.log(quad)
    // console.log(splitters)
    // c.add(splittedLand)

    // c.renderAll()
    // pieces.push(quad)

    // console.log(pieces)
    console.log(quad)
    c.add(quad)
  })

  let finalImage
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
      //   console.log(oImg)
      await c.add(oImg)
      await c.renderAll()

      finalImage = c.toSVG()

      let pathToWriteImage = 'public/adspace.svg'
      await fs.writeFileSync(pathToWriteImage, finalImage)
    }
  )

  console.log(finalImage)
  //   c.add(img)
  //   console.log(await c.getObjects())

  //   fabric.log('Normal SVG output: ', c.toSVG())

  //   let finalImage = await c.toSVG()
  //   const finalImage = await c.toBuffer('image/svg')

  //   await fs.writeFile(pathToWriteImage, finalImage, (err) => {
  //     // console.log(finalImage)
  //     if (err) console.log(err)
  //     else {
  //       //   console.log('File written successfully\n')
  //       //   console.log('The written has the following contents:')
  //       //   console.log(fs.readFileSync(pathToWriteImage, 'utf8'))
  //     }
  //   })

  //   res.status(200).json({ response: true, message: 'gg' })
  //   return finalImage

  res.end(c.toSVG())
}
