import React from 'react'
import { useWeb3Context } from '../context/'

interface ConnectProps {
  connect: (() => Promise<void>) | null
}
const ConnectButton = ({ connect }: ConnectProps) => {
  return connect ? (
    <a href="#" onClick={connect} className="web3">
      <i className="bi-wallet"></i> Connect Wallet
    </a>
  ) : (
    <a href="#" className="web3">
      <i className="bi-wallet"></i> Loading..
    </a>
  )
}

interface DisconnectProps {
  disconnect: (() => Promise<void>) | null
  class: string | null
}

const DisconnectButton = ({ disconnect }: DisconnectProps) => {
  return disconnect ? (
    <a href="#" onClick={disconnect} className="web3">
      <i className="bi-wallet"></i> Connected
    </a>
  ) : (
    // <button className="btn btn-warning">Loading...</button>
    <a href="#" className="web3">
      <i className="bi-wallet"></i> Loading..
    </a>
  )
}

export function Web3Button(props) {
  const { web3Provider, connect, disconnect } = useWeb3Context()

  return web3Provider ? (
    <DisconnectButton class={props.class} disconnect={disconnect} />
  ) : (
    <ConnectButton connect={connect} />
  )
}
