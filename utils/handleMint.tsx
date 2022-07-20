import { getLands } from '../Views/WebPages/canvesGrid'
import { QuadDescription } from './constants'
import {
  ErrorTransaction,
  InfoMessage,
  MiningTransaction,
  SuccessfulTransaction,
} from './notifications'
import { fabric } from 'fabric'

export const handleMint = async (
  name: string,
  address: string,
  adscontract: {
    mint: (arg0: any, arg1: any[], arg2: { value: string }) => any
  },
  mintImage: any,
  land: { y: number; x: number; w: any; h: number },
  uploadMetadata: {
    (
      name: any,
      description: any,
      imageURL: any,
      xProp: any,
      yProp: any
    ): Promise<string>
    (arg0: any, arg1: string, arg2: any, arg3: any, arg4: any): any
  },
  uploadImage
) => {
  if (!name) {
    ErrorTransaction({
      title: 'Upload Error ',
      description: 'Please provide a name for your quad',
    })
    return
  }
  let squrePos = land.y * 1000 + land.x

  let mintableids = []
  console.log('minting')

  for (let quad = squrePos; quad < squrePos + land.w; quad++) {
    for (let i = 0; i < land.h; i++) {
      mintableids.push(quad + i * 1000)
    }
  }
  // console.log(mintImage)

  // update image to ipfs storage and get the CID
  // const img = await uploadImage(mintImage)
  let imgString = await getBase64(mintImage)

  console.log(imgString)

  // update the metadata fields
  // const metadata = await uploadMetadata(
  //   name,
  //   QuadDescription,
  //   img,
  //   land.x,
  //   land.y
  // )
  // console.log(metadata)
  // if (!metadata) {
  //   ErrorTransaction({
  //     title: 'Metadata Error ',
  //     description: 'Metatadata could not be uploaded. Please try again later',
  //   })
  //   return
  // }
  //create parcel
  const parcel = {
    name: name,
    QuadDescription: QuadDescription,
    metadata: 'metadata',
    image: 'img',
    image_temp: imgString,
    coordX: land.x,
    coordY: land.y,
    parcelWidth: land.w,
    parcelHeight: land.h,
    parcelIds: mintableids,
  }

  let response = await fetch('/api/metadata/parcels', {
    method: 'POST',
    body: JSON.stringify(parcel),
  })

  // console.log(response)

  if (!response) {
    ErrorTransaction({
      title: 'Parcel creation error ',
      description:
        'Proceeding would result to a not well minted parce. Try again after some time.',
    })

    return
  }

  InfoMessage({
    title: 'Public Minting',
    description: 'Public Minting is about to begin. ',
  })

  // update database storage

  return

  try {
    if (adscontract) {
      let mintcost = 0.0 * mintableids.length
      let txn = await adscontract.mint(address, mintableids, {
        value: (mintcost * 10 ** 18).toString(),
      })

      if (txn.hash) {
        MiningTransaction({
          title: 'MiniProcessing Transaction',
          description: txn.hash,
        })
      }

      let receipt = await txn.wait()

      if (receipt) {
        console.log(receipt)
        SuccessfulTransaction({
          title: 'Confirmed',
          description: 'Quads have been successfully minted',
        })
      }
    } else {
      console.log('loading transaction')
    }
  } catch (e) {
    // console.log(e)
    ErrorTransaction({
      title: 'An Error has Occurred',
      description: 'An error has occured and minting could not be processed',
    })
  }
}
const getBase64 = (file) => {
  return new Promise((resolve) => {
    let fileInfo
    let baseURL = ''
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let Img = reader.result
      fabric.Image.fromURL(Img, function (myImg) {
        var img1 = myImg.set({
          left: 0,
          top: 0,
          width: 2500,
          height: 2000,
        })
        baseURL = img1
        resolve(baseURL)
      })
    }
  })
}
