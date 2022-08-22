import { getLands } from '../Views/WebPages/canvesGrid'
import { QuadDescription } from './constants'
import axios from 'axios'
import {
  ErrorTransaction,
  MiningTransaction,
  SuccessfulTransaction,
} from './notifications'
import { fabric } from 'fabric'
import {
  getMintingstatus,
  getQuadPrice,
  setMintingstatus,
  setMintStatus,
} from '../components/reducers/Settings'
import { store } from '../components/store'
import { useAppSelector } from '../components/store/hooks'
import { verifyIsAllowed } from './index'
import Swal from 'sweetalert2'

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
      parcelPosition: any,
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
  const mintingDetail = store.getState().settings.mintingStatus

  let squrePos = land.y * 1000 + land.x
  squrePos = squrePos + 1

  let mintableids = []

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

      let mintcost = quadPrice * mintableids.length

      let txn = await adscontract.mint(squrePos, land.h, land.w, {
        value: (mintcost * 10 ** 18).toFixed(0).toString(),
      })

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
          setMintStatus('Your tokens have been successfully minted')
        )

        Swal.close()

        SuccessfulTransaction({
          title: 'Success',
          description:
            'Your tokens have been successfully minted. This window may reload to print your space on the board.',
        })

        await fetch('https://api.quadspace.io/printBoard', {
          method: 'GET',
        })

        await fetch('https://api.quadspace.io/invokegen', {
          method: 'GET',
        })

        location.reload()
      }
    }
  } catch (e) {
    store.dispatch(setMintStatus('An error occurred, Try again'))
    console.log(e['reason'])
    ErrorTransaction({
      title: 'An Error has Occurred',
      description: e['reason']
        ? e['reason'].split(':')[1]
        : 'An error has occured and minting could not be processed',
    })
  }
}
