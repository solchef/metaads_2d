import React, { useEffect, useCallback, useState } from 'react'
import { useWeb3Context } from '../context/'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { store } from './store'
import { setMintStatus, setUserBalance } from './reducers/Settings'

export function Web3Balance() {
  const { web3Provider, address } = useWeb3Context()
  const [balance, setBalance] = useState<string>('')

  const fetchBalance = useCallback(
    async (web3Provider: ethers.providers.Web3Provider, address: string) => {
      const balance = await web3Provider.getBalance(address)
      store.dispatch(setUserBalance(Number(formatEther(balance))))
      setBalance(formatEther(balance))
    },
    []
  )
  useEffect(() => {
    if (web3Provider && address) {
      fetchBalance(web3Provider, address)
    } else {
      setBalance('')
    }
  }, [web3Provider, address, fetchBalance])

  return (<>{balance}</>)
}
