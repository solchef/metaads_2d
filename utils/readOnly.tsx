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
