import { ethers } from 'ethers'
import { QuadSpaceContract } from './constants'
import metaadsabi from '../ABI/metaadsnft.json'

export const MetaadsContractUnsigned = new ethers.Contract(
  QuadSpaceContract,
  metaadsabi,
  new ethers.providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/7c716361d1734288bbc5cf519570c08f'
  )
)

export function getRPCErrorMessage(err) {
  const open = err.stack.indexOf('{')
  const close = err.stack.lastIndexOf('}')
  const j_s = err.stack.substring(open, close + 1)
  const j = JSON.parse(j_s)
  const reason = j.data[Object.keys(j.data)[0]].reason
  return reason
}
