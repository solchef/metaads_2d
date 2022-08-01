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
import { verifyIsAllowed } from './index';

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
  uploadImage,
  quadPrice
) => {

  store.dispatch(setMintStatus('Checking validity of submitted data'))

  let squrePos = land.y * 1000 + land.x

  let mintableids = []

  for (let quad = squrePos + 1; quad < squrePos + land.w; quad++) {
    for (let i = 0; i < land.h; i++) {
      // let isAllowed = verifyIsAllowed(quad + i)
      mintableids.push(quad + i * 1000)
    }
  }

  
  try {
    if (adscontract) {
      store.dispatch(
        setMintStatus(
          'Please confirm the transaction popup on your wallet'
        )
      )

      let mintcost = quadPrice * mintableids.length
      let txn = await adscontract.mint(address, mintableids, {
        value: (mintcost * 10 ** 18).toString(),
      })

      if (txn.hash) {
        store.dispatch(
          setMintStatus(
            'Transaction is been mined'
          )
        )
      }
      let receipt = await txn.wait()

      if (receipt) {
        store.dispatch(
          setMintStatus('Your tokens have been successfully minted')
        )
        SuccessfulTransaction({
          title: 'Confirmed',
          description: 'Your tokens have been successfully minted',
        })
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
