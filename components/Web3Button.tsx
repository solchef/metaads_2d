import React from 'react'
import { useWeb3Context } from '../context/'

interface ConnectProps {
  connect: (() => Promise<void>) | null
}
const ConnectButton = ({ connect }: ConnectProps) => {
  return connect ? (
  <>
    <a href="#" onClick={connect} className="btn-primary hoverable hide-mobile btn-lg mb-3 w-100 ">
      <i className="bi-wallet"></i> Connect Wallet
    </a>
                <a href="#" className="web3 show-mobile"><i className="bi-wallet"></i> </a>
  
  </>
    
  ) : (
   <>
    <a href="#" className="btn-primary hoverable hide-mobile btn-lg mb-3 w-100 ">
      <i className="bi-wallet"></i> Loading..
    </a>
                <a href="#" className="web3 show-mobile"><i className="bi-wallet"></i> </a>
   
   </>
  )
}

interface DisconnectProps {
  disconnect: (() => Promise<void>) | null
  class: string | null
}

const DisconnectButton = ({ disconnect }: DisconnectProps) => {
  return disconnect ? (
  <>
    <a href="#" onClick={disconnect} className="btn-primary hoverable hide-mobile btn-lg mb-3 w-100 ">
      <i className="bi-wallet"></i> Connected
    </a>
                <a href="#" className="web3 show-mobile"><i className="bi-wallet"></i> </a>
  
  </>
  ) : (
    // <button className="btn btn-warning">Loading...</button>
  <>
    <a href="#" className="btn-primary hoverable hide-mobile btn-lg mb-3 w-100 ">
      <i className="bi-wallet"></i> Loading..
    </a>
  </>
  )
}

export function Web3Button(props) {
  const { web3Provider, connect, disconnect } = useWeb3Context()

  return web3Provider ? (
    <DisconnectButton className={props.class} disconnect={disconnect} />
  ) : (
    <ConnectButton connect={connect} />
  )
}
