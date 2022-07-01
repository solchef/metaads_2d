import { QuadDescription } from './constants'
import {
  ErrorTransaction,
  InfoMessage,
  MiningTransaction,
  SuccessfulTransaction,
} from './notifications'

export const handleMint = async (
  name,
  address,
  adscontract,
  getMintImage,
  squreInfo,
  uploadMetadata,
  uploadImage
) => {
  const image = await uploadImage(await getMintImage())

  const metadata = await uploadMetadata(
    name,
    QuadDescription,
    image,
    squreInfo.x,
    squreInfo.y
  )

  InfoMessage({
    title: 'QUAD purchase',
    description: 'Public minting of the quads has not began.',
  })

  if (!metadata) {
    ErrorTransaction({
      title: 'Metadata Error ',
      description: 'Metatadata could not be uploaded. Please try again later',
    })
    return
  }
  if (!name) {
    ErrorTransaction({
      title: 'Upload Error ',
      description: 'Please provide a name for your quad',
    })
    return
  }

  let squrePos = (squreInfo.y - 1) * 1000 + squreInfo.x

  try {
    await adscontract
      .create(address, 101, squrePos, metadata, '0x00')
      .on('transactionHash', (hash) => {
        MiningTransaction({ title: 'Mining', description: hash })
        return 'Minted'
      })
      .on('confirmation', (hash) => {
        SuccessfulTransaction({ title: 'Confirmed', description: hash })
        return 'Success'
      })
      .on('error', (e) => {
        ErrorTransaction({ title: 'Error Occurred', description: e })
        return 'An Error Occurred'
      })
  } catch (e) {
    ErrorTransaction({
      title: 'Error Occurred',
      description: 'Transaction could not be processed',
    })
    console.log(e)
    return 'An Error Occurred'
  }
}
