import { create } from 'ipfs-http-client'

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})
export const useIPFS = () => {
  // Format the IPFS url
  const resolveLink = (url) => {
    if (!url || !url.includes('ipfs://')) return url
    return url.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/')
  }

  // Upload image to IPFS
  const uploadImage = async (imageFile) => {
    // console.log(imageFile)
    const fileAdded = await ipfs.add(imageFile)
    if (!fileAdded) {
      console.error('Something went wrong when updloading the file')
      return
    }

    return fileAdded
  }

  // Upload metadata to IPFS
  const uploadMetadata = async (name, description, imageURL, xProp, yProp) => {
    const metadata = {
      name: `QUADSPACE(${xProp}, ${yProp})`,
      description: 'QUADSPACE allows you to ...',
      image: imageURL,
      quad: {
        name: name,
        description: description,
        image: imageURL,
      },
      properties: [
        {
          trait_type: 'Space X',
          value: xProp,
          max_value: 408,
          display_type: 'number',
        },
        {
          trait_type: 'Space Y',
          value: yProp,
          max_value: 408,
          display_type: 'number',
        },
        {
          trait_type: 'QUAD SPACE',
          value: 'Regular',
        },
      ],
      external_url: 'https://quadspace.io/',
    }

    console.log(metadata)

    const metadataAdded = await ipfs.add(JSON.stringify(metadata))

    if (!metadataAdded) {
      console.error('Something went wrong when updloading the file')
      return
    }

    return metadataAdded.path
  }

  return { resolveLink, uploadImage, uploadMetadata }
}
