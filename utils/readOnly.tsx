import { ethers } from 'ethers'
import { QuadSpaceContract } from './constants'
import metaadsabi from '../ABI/metaadsnft.json'

export const MetaadsContractUnsigned = new ethers.Contract(
  QuadSpaceContract,
  metaadsabi,
  new ethers.providers.JsonRpcProvider(
    'https://rinkeby.infura.io/v3/7c716361d1734288bbc5cf519570c08f'
  )
)

export function getRPCErrorMessage(err) {
  var open = err.stack.indexOf('{')
  var close = err.stack.lastIndexOf('}')
  var j_s = err.stack.substring(open, close + 1)
  var j = JSON.parse(j_s)
  var reason = j.data[Object.keys(j.data)[0]].reason
  return reason
}
