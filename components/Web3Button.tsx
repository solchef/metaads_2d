import React from 'react'
import { useWeb3Context } from '../context/'

interface ConnectProps {
  connect: (() => Promise<void>) | null
}
const ConnectButton = ({ connect }: ConnectProps) => {
  return connect ? (
  <>

<a  onClick={connect} className="btn-primary hoverable btn-md hide-mobile" href="#"><i className="bi-wallet me-2" />CONNECT
        WALLET</a>
      <a  onClick={connect} className="btn-primary hoverable btn-md show-mobile" href="#"><i className="bi-wallet" /></a>


  
  </>
    
  ) : (
   <>
   <a className="btn-primary hoverable btn-md hide-mobile" href="#"><i className="bi-wallet me-2" />
   Loading.. </a>
      <a  className="btn-primary hoverable btn-md show-mobile" href="#"><i className="bi-wallet" /></a>



   
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
  <a  onClick={disconnect} className="btn-primary hoverable btn-md hide-mobile" href="#"><i className="bi-wallet me-2" />
  Connected</a>
      <a  onClick={disconnect} className="btn-primary hoverable btn-md show-mobile" href="#"><i className="bi-wallet" /></a>


  
  </>
  ) : (
    // <button className="btn btn-warning">Loading...</button>
  <>
    <a className="btn-primary hoverable btn-md hide-mobile" href="#"><i className="bi-wallet me-2" /> Loading..
  </a>
      <a className="btn-primary hoverable btn-md show-mobile" href="#"><i className="bi-wallet" /></a>


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
