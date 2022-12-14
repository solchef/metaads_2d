/* eslint-disable prefer-const */
// import { fabric } from 'fabric'
// import { MetaadsContractUnsigned } from '../../../utils/readOnly'
// const fs = require('fs')
// const sharp = require('sharp')

// export default async function handler(req, res) {
//   var options = {
//     distance: 10,
//     height: 1000,
//     width: 1000,
//     param: {
//       type: 'line',
//       stroke: '#a301b9',
//       selectable: false,
//       strokeWidth: 0.1,
//       objectCaching: false,
//     },
//   }

//   let scaler = 10
//   let variant = 0

//   let minted = await MetaadsContractUnsigned.occupiedList()

//   let rects = []

//   const quadmints = [
//     [0, 0],
//     [0, 750],
//     [800, 0],
//     [800, 750],
//     [375, 400],
//   ]

//   let c = new fabric.StaticCanvas(null, { width: 10000, height: 10000 })

//   //   contractmints
//   minted.forEach(async (nft) => {
//     let y = Number(nft) % 1000
//     let x = Math.ceil(Number(nft) / 1000)

//     const quad = await new fabric.Rect({
//       top: x * scaler + 0 + variant,
//       left: y * scaler + 0 + variant,
//       height: 1 * scaler,
//       width: 1 * scaler,
//       fill: '#7b0000',
//       selection: false,
//     })
//     c.add(quad)
//   })

//   //quadmints
//   let pieces = []

//   let finalImage: any
//   let soldoutland: any

//   quadmints.forEach((q) => {
//     console.log(q)

//     fabric.Image.fromURL(
//       'https://faniasets.s3.us-east-2.amazonaws.com/assets/images/soldoutrep.png',
//       function (myImg) {
//         var img1 = myImg.set({
//           left: q[1] * scaler + 0 + variant,
//           top: q[0] * scaler + 0 + variant,
//           width: 2500,
//           height: 2000,
//         })
//         c.add(img1)
//       }
//     )
//   })

//   await fabric.Image.fromURL(
//     'https://million.quadspace.io/blank.svg',
//     async function (oImg) {
//       let scaleX = 10000 / oImg.width
//       let scaleY = 10000 / oImg.height
//       oImg.set({
//         left: 0 + variant,
//         top: 0 + 0.5,
//         scaleX: scaleX,
//         scaleY: scaleY,
//       })

//       // console.log(pResponse)

//       await c.add(oImg)
//       await c.renderAll()
//       // let loadingimages = await populateImages()
//       // // console.log(loadingimages)
//       // // c.add([...loadingimages])
//       // // console.log(loadingimages[0])
//       // loadingimages.forEach((img) => {
//       //   // console.log(img.type)
//       //   // c.add(JSON.parse(img))

//       //   fabric.util.enlivenObjects([img], function (objects) {
//       //     var origRenderOnAddRemove = c.renderOnAddRemove
//       //     c.renderOnAddRemove = false

//       //     objects.forEach(function (o) {
//       //       o.top = 2
//       //       o.left = 2600
//       //       c.add(o)
//       //     })

//       //     c.renderOnAddRemove = origRenderOnAddRemove
//       //     c.renderAll()
//       //   })
//       // })
//       finalImage = c.toDataURL('image/png')
//       let pathToWriteImage = 'public/adspace.png'

//       const base64Data = finalImage.replace(/^data:([A-Za-z-+/]+);base64,/, '')
//       fs.writeFile(pathToWriteImage, base64Data, 'base64', (err) => {
//         console.log(err)
//       })

//       await fs.writeFileSync(pathToWriteImage, finalImage)

//       // sharp('public/adspace.svg')
//       //   .png()
//       //   .toFile('public/adspace.svg')
//       //   .then(function (info) {
//       //     console.log(info)
//       //   })
//       //   .catch(function (err) {
//       //     console.log(err)
//       //   })

//       res.end(c.toSvg)
//     }
//   )
// }

// const populateImages = async () => {
//   let parcels = await fetch('http://localhost:3000/api/metadata/parcels', {
//     method: 'GET',
//   })

//   let imagesArr = []

//   let pResponse = await parcels.json()
//   pResponse = pResponse.message

//   await pResponse.forEach((parc) => {
//     if (parc.image_temp) {
//       // fabric.Image.fromURL(parc.image_temp, function (myImg) {
//       //   var img1 = myImg.set({
//       //     left: 0,
//       //     top: 0,
//       //     width: parc.parcelwidth,
//       //     height: parc.parcelHeight,
//       //   })
//       // })

//       imagesArr.push(parc.image_temp)
//     }
//   })
//   return imagesArr
// }

import { MetaadsContractUnsigned } from '../../../utils/readOnly'

export default async function handler(req, res) {
  let minted = await MetaadsContractUnsigned.occupiedList()

  const metalist = []
  minted.forEach(async (nft) => {
    let y = Number(nft) % 1000
    let x = Math.ceil(Number(nft) / 1000)

    // let holder = await MetaadsContractUnsigned.ownerOf(Number(nft))
    let itemMeta = {
      name: 'Quad #' + Number(nft),
      description:
        'Quadspace metaverse allows businesses, meta realtors and individual NFT collectors to acquire Quad for $1. These estate can be used as space, 3d retail space or simply a place for you and your meta buddies to kick it!',
      image:
        'https://bafybeibaxec4sl7cbx4ey5djtofzdahowg7mv5vmfvkx3kxcfq7koecbx4.ipfs.nftstorage.link',
      external_url: 'https://quadspace.io',
      // holder: holder,
      attributes: [
        { trait_type: 'Row', value: x },
        { trait_type: 'Column', value: y },
        { trait_type: 'QuadSpace', value: Number(nft) },
      ],
    }

    metalist.push(itemMeta)
  })

  res.status(200).json({ response: true, meta: metalist })
}
