import { getLands } from '../Views/WebPages/canvesGrid'
import { QuadDescription } from './constants'
import {
  ErrorTransaction,
  InfoMessage,
  MiningTransaction,
  SuccessfulTransaction,
} from './notifications'

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
  console.log(mintImage)

  const img = await uploadImage(mintImage)
  // update the metadata fields
  const metadata = await uploadMetadata(
    name,
    QuadDescription,
    img,
    land.x,
    land.y
  )

  console.log(metadata)

  if (!metadata) {
    ErrorTransaction({
      title: 'Metadata Error ',
      description: 'Metatadata could not be uploaded. Please try again later',
    })
    return
  }

  InfoMessage({
    title: 'Public Minting',
    description: 'Public Minting is about to begin. ',
  })

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
