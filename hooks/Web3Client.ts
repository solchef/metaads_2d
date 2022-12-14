import { useEffect, useReducer, useCallback } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import metaadsabi from '../ABI/metaadsnft.json'

import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Web3ProviderState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Web3Action,
  web3InitialState,
  web3Reducer,
} from '../reducers'

import { toast } from 'react-toastify'
import { QuadSpaceContract } from '../utils/constants'
import axios from 'axios'
import { ErrorTransaction } from '../utils/notifications'

const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'METAADS',
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
}

let web3Modal: Web3Modal | null
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
    theme: {
      background: 'rgb(39, 49, 56)',
      main: 'rgb(199, 199, 199)',
      secondary: 'rgb(136, 136, 136)',
      border: 'rgba(195, 195, 195, 0.14)',
      hover: 'rgb(16, 26, 32)',
    },
  })
}

export const useWeb3 = () => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState)
  const { provider, web3Provider, address, network, contracts } = state

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect()
        const web3Provider = new ethers.providers.Web3Provider(provider)
        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()
        const network = await web3Provider.getNetwork()

        toast.success('Connected to Web3')

        const metaadscontract = new ethers.Contract(
          QuadSpaceContract,
          metaadsabi,
          signer
        )

        const metaadscontract_unsigned = new ethers.Contract(
          QuadSpaceContract,
          metaadsabi,
          new ethers.providers.JsonRpcProvider(
            'https://mainnet.infura.io/v3/7c716361d1734288bbc5cf519570c08f'
          )
        )
        const contracts = []
        contracts['metaads'] = metaadscontract
        contracts['metaads_unsigned'] = metaadscontract_unsigned

        dispatch({
          type: 'SET_WEB3_PROVIDER',
          provider,
          web3Provider,
          address,
          network,
          contracts,
        } as Web3Action)
      } catch (e) {
        // console.log('connect error', e)
      }
    } else {
      // console.error('No Web3Modal')
    }
  }, [])

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      toast.error('Disconnected from Web3')
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      } as Web3Action)
    } else {
      // console.error('No Web3Modal')
    }
  }, [provider])

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        toast.info('Changed Web3 Account')
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        } as Web3Action)
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== 'undefined') {
          // console.log('switched to chain...', _hexChainId)
          // toast.info(
          //   'Web3 Network Changed. Please reload your browser if submitting a transaction.'
          // )
          ErrorTransaction({
            title: 'Wrong network',
            description: 'Web3 Network Changed. Window will reload now',
          })

          window.location.reload()
        } else {
          // console.log('window is undefined')
        }
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        // console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  return {
    provider,
    web3Provider,
    address,
    network,
    contracts,
    connect,
    disconnect,
  } as Web3ProviderState
}
