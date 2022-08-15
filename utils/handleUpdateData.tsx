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
  getParcel,
  setMintingstatus,
  setMintStatus,
} from '../components/reducers/Settings'
import { store } from '../components/store'

export const handleUpdateData = async (
  name: string,
  address: string,
  description: string,
  url: string,
  adscontract,
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
  uploadImage,
  parc
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
  // console.log('minting')
  for (let quad = squrePos; quad < squrePos + land.w; quad++) {
    for (let i = 0; i < land.h; i++) {
      mintableids.push(quad + i * 1000)
    }
  }

  // update image to ipfs storage and get the CID
  const img = await uploadImage(mintImage[0])

  const metadata = await uploadMetadata(
    name,
    QuadDescription,
    img,
    land.x,
    land.y
  )
  // console.log(metadata)
  if (!metadata) {
    ErrorTransaction({
      title: 'Metadata Error ',
      description: 'Metatadata could not be uploaded. Please try again later',
    })
    return
  }

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
    store.dispatch(setMintStatus('Image has been uploaded'))
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
    parcelWidth: parc.width,
    parcelHeight: parc.height,
    parcelIds: mintableids,
    address: address,
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
        'Proceeding would result to a not well updated squres lot. Try again after some time.',
    })

    return
  } else {
    let response = await fetch('https://api.quadspace.io/invokegen', {
      method: 'GET',
    })
  }

  try {
    if (adscontract) {
      store.dispatch(
        setMintStatus('Please confirm the transaction popup on your wallet')
      )
      console.log(parc, parc.width, parc.height)
      let txn = await adscontract.updateParcelData(
        parc.parcId,
        parc.width,
        parc.height,
        metadata
      )

      if (txn.hash) {
        store.dispatch(
          setMintStatus('Please wait as the transaction is been mined')
        )
      }

      let receipt = await txn.wait()

      if (receipt) {
        store.dispatch(
          setMintStatus('Your tokens have been successfully updated')
        )

        SuccessfulTransaction({
          title: 'Confirmed',
          description:
            'Your tokens have been successfully updated. Please hold on as the update is being printed on the board. Your window may reload.',
        })

        await fetch('https://api.quadspace.io/invokegen', {
          method: 'GET',
        })

        location.reload()
      }
    } else {
      console.log('loading transaction')
    }
  } catch (e) {
    store.dispatch(setMintStatus('An error occurred, Try again'))
    ErrorTransaction({
      title: 'An Error has Occurred',
      description: 'An error has occured and minting could not be processed',
    })
  }
}
