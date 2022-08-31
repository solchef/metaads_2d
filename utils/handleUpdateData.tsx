import { QuadDescription } from './constants'
import axios from 'axios'
import {
  ErrorTransaction,
  MiningTransaction,
  SuccessfulTransaction,
} from './notifications'
import { setMintStatus } from '../components/reducers/Settings'
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
  parc,
  handleMultiUploadMetadata,
  network
) => {
  store.dispatch(setMintStatus('Checking validity of submitted data'))

  if (network && network.chainId !== 1) {
    store.dispatch(
      setMintStatus(
        'You are trying to mint while on the wrong network. Please switch to mainnet'
      )
    )

    ErrorTransaction({
      title: 'Wrong Network',
      description:
        'You are trying to mint while on the wrong network. Please switch to mainnet',
    })
  }

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

  if (!description) {
    ErrorTransaction({
      title: 'Upload Error ',
      description: 'Please provide a description  attached to your quad',
    })
    return
  }

  if (!mintImage) {
    ErrorTransaction({
      title: 'Upload Error ',
      description: 'Please upload an image to update',
    })
    return
  }

  let squrePos = land.y * 1000 + land.x

  let mintableids = []
  // console.log('minting')
  for (let quad = squrePos; quad < squrePos + land.w; quad++) {
    for (let i = 1; i < land.h; i++) {
      mintableids.push(quad + i * 1000)
    }
  }

  const img = await uploadImage(mintImage[0])
  // console.log(img)
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
    // console.log(response.data)
  })

  if (imgUpload) {
    store.dispatch(setMintStatus('Image has been uploaded'))
    // console.log('uploaded')
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
    ipfs: metadata,
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
  }

  let inserted = await response.json()
  inserted = inserted.parcel.insertedId

  // console.log(inserted)

  try {
    if (adscontract) {
      store.dispatch(
        setMintStatus('Please confirm the transaction popup on your wallet')
      )
      // console.log(parc)
      // console.log(parc.parcId, squrePos, parc.width, parc.height, metadata)

      let txn = await adscontract.updateParcelData(
        parc.parcId,
        parc.position,
        parc.width,
        parc.height,
        `https://quadspace.io/api/metadata/parcels/${inserted}`
      )

      if (txn.hash) {
        store.dispatch(
          setMintStatus('Please wait as the transaction is been mined')
        )

        MiningTransaction({
          title: 'Mining',
          description: 'Please wait as the transaction is been mined',
        })
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
