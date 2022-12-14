import { utils } from 'ethers'
import React from 'react'
import { useWeb3Context } from '../context/'
import { ConnectedWallet } from '../utils/notifications'
import truncateEthAddress from '../utils/truncate'

interface ConnectProps {
  connect: (() => Promise<void>) | null
}

const ConnectButton = ({ connect, title }: ConnectProps) => {
  return connect ? (
    <>
      <a
        onClick={connect}
        className="btn-primary hoverable btn-md hide-mobile"
        href="#"
      >
        <i className="bi-wallet me-2" />
        <span>{title ? title : 'CONNECT WALLET'}</span>
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
  address: null
}

const DisconnectButton = ({ disconnect, address }: DisconnectProps) => {
  return disconnect ? (
    <>
      <a
        className="btn-primary hoverable btn-md hide-mobile"
        onClick={() => ConnectedWallet(address)}
        href="#"
      >
        <i className="bi-wallet me-2" />
        {truncateEthAddress(address)}
      </a>
      <a
        className="btn-primary hoverable btn-md show-mobile"
        onClick={() => ConnectedWallet(address)}
        href="#"
      >
        <i className="bi-wallet" />
        {/* <span className="fs-7">{truncateEthAddress(address)}</span> */}
      </a>
    </>
  ) : (
    // <button className="btn btn-warning">Loading...</button>
    <>
      <a className="btn-primary hoverable btn-md hide-mobile" href="#">
        <i className="bi-wallet me-2" /> Loading..
      </a>
      <a className="btn-primary hoverable btn-md show-mobile" href="#">
        <i className="bi-wallet" />
      </a>
    </>
  )
}


export const modifyChain = () => {
  window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{
       chainId: "0x1"
    }]
 })
 
}

export function Web3Button(props) {
  const { web3Provider, connect, disconnect, address, network } =
    useWeb3Context()

  if (network && network.chainId !== 1 ) {
 
  
    return (
      <a className="btn-danger hoverable btn-md hide-mobile" onClick={modifyChain} href="#">
        <i className="bi-wallet me-2" /> Wrong Network
      </a>
    )
  }

  return web3Provider ? (
    <DisconnectButton
      className={props.class}
      disconnect={disconnect}
      address={address}
    />
  ) : (
    <ConnectButton connect={connect} title={props.title} />
  )
}
