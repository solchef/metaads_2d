import { create } from 'ipfs-http-client'

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'http',
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
    // console.log('added')
    return fileAdded
  }

  // Upload metadata to IPFS
  const uploadMetadata = async (parcelPosition, name, description, imageURL, xProp, yProp) => {
    const metadata = {
      name: `QUADSPACE(${xProp}, ${yProp})`,
      description: 'QUADSPACE allows you to ...',
      image: imageURL,
      parcelPosition: parcelPosition,
      parcelId: 0,
      quad: {
        name: name,
        description: description,
        image: imageURL,
      },
      properties: [
        {
          trait_type: 'Space X',
          value: xProp,
          max_value: 1000,
          display_type: 'number',
        },
        {
          trait_type: 'Space Y',
          value: yProp,
          max_value: 1000,
          display_type: 'number',
        },
        {
          trait_type: 'QUAD SPACE',
          value: 'Regular',
        },
      ],
      external_url: 'https://quadspace.io/',
    }

    // console.log(metadata)

    const metadataAdded = await ipfs.add(JSON.stringify(metadata))

    if (!metadataAdded) {
      console.error('Something went wrong when updloading the file')
      return
    }

    return metadataAdded.path
  }

  // Upload image to IPFS
  /** Uses `URL.createObjectURL` free returned ObjectURL with `URL.RevokeObjectURL` when done with it.
   *
   * @param {string} cid CID you want to retrieve
   * @param {string} mime mimetype of image (optional, but useful)
   * @param {number} limit size limit of image in bytes
   * @returns ObjectURL
   */
  const loadImgURL = async (cid, mime, limit) => {
    if (cid == '' || cid == null || cid == undefined) {
      return
    }
    // for await (const file of ipfs.get(cid)) {
    //   if (file.size > limit) {
    //     return
    //   }
    //   const content = []
    //   if (file.content) {
    //     for await (const chunk of file.content) {
    //       content.push(chunk)
    //     }
    //     return URL.createObjectURL(new Blob(content, { type: mime }))
    //   }
    // }
    let res = await ipfs.get(cid)
    // console.log(res)
    // const files = await res.files()

    // for (const file of files) {
    //   console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
    // }

    return res
  }

  return { resolveLink, uploadImage, uploadMetadata, loadImgURL }
}
