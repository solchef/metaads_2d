import { MetaadsContractUnsigned } from '../../../utils/readOnly'

export default async function handler(req, res) {
  const minted = await MetaadsContractUnsigned.occupiedList()

  const metalist = []
  minted.forEach(async (nft) => {
    const y = Number(nft) % 1000
    const x = Math.ceil(Number(nft) / 1000)

    // let holder = await MetaadsContractUnsigned.ownerOf(Number(nft))
    const itemMeta = {
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
