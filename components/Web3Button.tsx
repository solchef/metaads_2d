import React from 'react'
import { useWeb3Context } from '../context/'
import truncateEthAddress from '../utils/truncate';

interface ConnectProps {
  connect: (() => Promise<void>) | null
}
const ConnectButton = ({ connect }: ConnectProps) => {

  

  return connect ? (
    <>
      <a
        onClick={connect}
        className="btn-primary hoverable btn-md hide-mobile"
        href="#"
      >
        <i className="bi-wallet me-2" />
        CONNECT WALLET
      </a>
      <a
        onClick={connect}
        className="btn-primary hoverable btn-md show-mobile"
        href="#"
      >
        <i className="bi-wallet" />
      </a>
    </>
  ) : (
    <>
      <a className="btn-primary hoverable btn-md hide-mobile" href="#">
        <i className="bi-wallet me-2" />
        Loading..{' '}
      </a>
      <a className="btn-primary hoverable btn-md show-mobile" href="#">
        <i className="bi-wallet" />
      </a>
    </>
  )
}

interface DisconnectProps {
  disconnect: (() => Promise<void>) | null
  class: string | null
  address:null
}

const DisconnectButton = ({ disconnect, address }: DisconnectProps) => {
  return disconnect ? (
    <>
      <a
        className="btn-primary hoverable btn-md hide-mobile"
        href="#"
      >
        <i className="bi-wallet me-2" />
        {truncateEthAddress(address)}
      </a>
      <a
        className="btn-primary hoverable btn-md show-mobile"
        href="#"
      >
        <i className="bi-wallet" />
      </a>
    </>
  ) : (
    // <button className="btn btn-warning">Loading...</button>
    <>
      <a className="btn-primary hoverable btn-md hide-mobile" href="#" >
        <i className="bi-wallet me-2" /> Loading..
      </a>
      <a className="btn-primary hoverable btn-md show-mobile" href="#">
        <i className="bi-wallet" />
      </a>
    </>
  )
}

export function Web3Button(props) {
  const { web3Provider, connect, disconnect, address } = useWeb3Context()

  return web3Provider ? (
    <DisconnectButton className={props.class} disconnect={disconnect} address={address} />
  ) : (
    <ConnectButton connect={connect} />
  )
}
