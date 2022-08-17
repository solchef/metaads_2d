import { create, CID, IPFSHTTPClient } from 'ipfs-http-client'

const projectId = '25jA0TBvDtcO15UJjpQu5u5FuPP'
const projectSecret = '477958be72519e86a31afd65ca3d4aa9'

const authorization = 'Basic ' + btoa(projectId + ':' + projectSecret)

const ipfs = create({
  url: 'https://ipfs.infura.io:5001/api/v0',
  headers: {
    authorization,
  },
})

export const useIPFS = () => {
  // Format the IPFS url
  const resolveLink = (url) => {
    if (!url || !url.includes('ipfs://')) return url
    return url.replace('ipfs://', 'https://jim.infura-ipfs.io')
  }

  // Upload image to IPFS
  const uploadImage = async (imageFile) => {
    console.log(imageFile)
    const fileAdded = await ipfs.add(imageFile)

    if (!fileAdded) {
      console.error('Something went wrong when updloading the file')
      return
    }
    // console.log('added')
    return fileAdded
  }

  // Upload metadata to IPFS
  const uploadMetadata = async (
    parcelPosition,
    name,
    description,
    imageURL,
    xProp,
    yProp
  ) => {
    const metadata = {
      name: `QUADSPACE(${xProp}, ${yProp})`,
      description: description,
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

  const handleMultiUploadMetadata = async (
    name,
    description,
    images,
    xProp,
    yProp
  ) => {
    let imgArray = []
    // await images.forEach((img) => {

    //   imgArray.push();
    // })

    let squrePos = yProp * 1000 + xProp
    const metadataArr = []

    // const metadataAdded = await ipfs.addAll(JSON.stringify(images))

    const sources = await images.map((file, i) => ({
      path: `${i}.json`,
      content: new File([JSON.stringify(file)], `${i}.txt`, {
        type: 'text/plain',
      }),
    }))

    console.log(sources[0])

    let rootCid: string
    for await (const result of ipfs.addAll(sources)) {
      // console.log(`Uploaded: ${JSON.stringify(result.cid.toString())}`)
      metadataArr.push(result.path)
      if (result.path === '' || result.path === undefined) {
        rootCid = result.cid.toString()
      }
    }

    // console.log(rootCid)

    // metadataArr.push(metadataAdded)

    // console.log(metadata)
    // const metadataAdded = await ipfs.add(JSON.stringify(metadata))
    // if (!metadataAdded) {
    //   console.error('Something went wrong when updloading the file')
    //   return
    // }

    // console.log(metadataArr)

    return true
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

  return {
    resolveLink,
    uploadImage,
    uploadMetadata,
    loadImgURL,
    handleMultiUploadMetadata,
  }
}
