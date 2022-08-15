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
  getQuadPrice,
  setMintingstatus,
  setMintStatus,
} from '../components/reducers/Settings'
import { store } from '../components/store'
import { useAppSelector } from '../components/store/hooks'
import { verifyIsAllowed } from './index'

export const handleMint = async (
  name: string,
  address: string,
  description: string,
  url: string,
  adscontract,
  mintImage: any,
  land: { y: number; x: number; w: any; h: number },
  uploadMetadata: {
    (
      parcelPosition:any,
      name: any,
      description: any,
      imageURL: any,
      xProp: any,
      yProp: any
    ): Promise<string>
    (arg0: any, arg1: string, arg2: any, arg3: any, arg4: any): any
  },
  uploadImage,
  quadPrice
) => {
  store.dispatch(setMintStatus('Checking validity of submitted data'))

  let squrePos = land.y * 1000 + land.x
  squrePos = squrePos + 1

  const metadata = await uploadMetadata(
    squrePos, 
    name,
    QuadDescription,
    'https://api.quadspace.io/tmdw.jpg',
    land.x,
    land.y
  )

  if (!metadata) {
    ErrorTransaction({
      title: 'Metadata Error ',
      description: 'Metatadata could not be uploaded. Please try again later',
    })
    return
  }

  let mintableids = [];

  for (let quad = squrePos; quad < squrePos + land.h; quad++) {
    for (let i = 0; i < land.w; i++) {
      // let isAllowed = verifyIsAllowed(quad + i)
      mintableids.push(quad + i * 1000)
    }
  }

  try {
    if (adscontract) {
      store.dispatch(
        setMintStatus('Please confirm the transaction popup on your wallet')
      )
      // console.log(mintableids)
      let mintcost = quadPrice * mintableids.length
      let txn = await adscontract.mint(address, squrePos, land.w, land.h, metadata, {
         value: (mintcost * 10 ** 18).toString()
      })

      if (txn.hash) {
        store.dispatch(
          setMintStatus('Please wait as the transaction is been mined')
        )
      }
      let receipt = await txn.wait()

      if (receipt) {
        store.dispatch(
          setMintStatus('Your tokens have been successfully minted')
        )

        SuccessfulTransaction({
          title: 'Confirmed',
          description:
            'Your tokens have been successfully minted. Please hold on as your squres are being printed on the board. Your window may reload.',
        })

        await fetch('https://api.quadspace.io/printBoard', {
          method: 'GET',
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
