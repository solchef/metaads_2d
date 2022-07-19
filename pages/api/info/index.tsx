import { MetaadsContractUnsigned } from '../../../utils/readOnly'

export default async function handler(req, res) {
  let minted = await MetaadsContractUnsigned.occupiedList()

  const metalist = []
  minted.forEach(async (nft) => {
    let x = Number(nft) % 1600
    let y = Math.ceil(Number(nft) / 625)
    // let holder = await MetaadsContractUnsigned.ownerOf(Number(nft))
    let itemMeta = {
      name: 'Quad #' + Number(nft),
      description:
        'Quadspace metaverse allows businesses, meta realtors and individual NFT collectors to acquire Quad for $1. These estate can be used as space, 3d retail space or simply a place for you and your meta buddies to kick it!',
      image:
        'https://bafybeibaxec4sl7cbx4ey5djtofzdahowg7mv5vmfvkx3kxcfq7koecbx4.ipfs.nftstorage.link',
      external_url: 'https://quadspace.io',
      // holder: holder,
      attributes: [
        { trait_type: 'Row', value: x },
        { trait_type: 'Column', value: y },
        { trait_type: 'QuadSpace', value: Number(nft) },
      ],
    }

    metalist.push(itemMeta)
  })

  res.status(200).json({ response: true, meta: metalist })
}
