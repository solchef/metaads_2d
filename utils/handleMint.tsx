import { getLands } from '../Views/WebPages/canvesGrid'
import { QuadDescription } from './constants'
import axios from 'axios'
import {
  ErrorTransaction,
  InfoMessage,
  MiningTransaction,
  SuccessfulTransaction,
} from './notifications'
import { fabric } from 'fabric'
import {
  setMintingstatus,
  setMintStatus,
} from '../components/reducers/Settings'
import { store } from '../components/store'

export const handleMint = async (
  name: string,
  address: string,
  description: string,
  url: string,
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
  store.dispatch(setMintStatus('Checking validity of submitted data'))

  if (!name) {
    ErrorTransaction({
      title: 'Upload Error ',
      description: 'Please provide a name for your quad',
    })
    return
  }

  if (!url) {
    ErrorTransaction({
      title: 'Upload Error ',
      description: 'Please provide a url  attached to your quad',
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
  // let imgString = await getBase64(mintImage)

  // console.log(imgString)

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

  const formData = new FormData()
  formData.append('file', mintImage)
  //temporary image upload for processing through backend

  const urlconf = 'https://api.quadspace.io/parcels'

  formData.append('file', mintImage[0])

  formData.append('fileName', mintImage[0].name)

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }
  store.dispatch(setMintStatus('Uploading parcel image. Please wait'))

  let imgUpload = axios.post(urlconf, formData, config).then((response) => {
    console.log(response.data)
  })

  if (imgUpload) {
    console.log('uploaded')
  }

  const parcel = {
    name: name,
    QuadDescription: description,
    url: url,
    metadata: 'metadata',
    image: 'img',
    image_temp: mintImage[0].name,
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

  if (!response) {
    store.dispatch(
      setMintStatus(
        'Error occurred during the upload. Data cannot be fetched. Please try again'
      )
    )

    ErrorTransaction({
      title: 'Parcel creation error ',
      description:
        'Proceeding would result to a not well minted parce. Try again after some time.',
    })

    return
  }

  // update database storage

  try {
    if (adscontract) {
      store.dispatch(
        setMintStatus(
          'Submitting data to the Blockchain. Please confirm transaction on your wallet'
        )
      )

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
        // console.log(receipt)
        store.dispatch(
          setMintStatus('Your parcel has been successfully minted')
        )
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
    store.dispatch(setMintStatus('An error occurred, retrying transaction'))
    ErrorTransaction({
      title: 'An Error has Occurred',
      description: 'An error has occured and minting could not be processed',
    })
  }
}
const getBase64 = (file) => {
  console.log(file)
  return new Promise((resolve) => {
    let fileInfo
    let baseURL = ''
    let reader = new FileReader()
    reader.readAsDataURL(file[0])
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
