import { MetaadsContractUnsigned } from '../../../utils/readOnly'

export default function handler(req, res) {
  let x = Number(req.query.quadId) % 1000
  let y = Math.ceil(Number(req.query.quadId) / 1000)
  let holder = MetaadsContractUnsigned.ownerOf(req.query.quadId)

  if (holder) {
    res.status(200).json({
      name: 'Quad #' + req.query.quadId,
      description:
        'Quadspace metaverse allows businesses, meta realtors and individual NFT collectors to acquire Quad for $1. These estate can be used as space, 3d retail space or simply a place for you and your meta buddies to kick it!',
      image:
        'https://bafybeibaxec4sl7cbx4ey5djtofzdahowg7mv5vmfvkx3kxcfq7koecbx4.ipfs.nftstorage.link',
      external_url: 'https://quadspace.io',
      holder: holder,
      attributes: [
        { trait_type: 'Row', value: x },
        { trait_type: 'Column', value: y },
        { trait_type: 'QuadSpace', value: req.query.quadId },
      ],
    })
  } else {
    res.status(200).json({
      name: 'Quad #' + req.query.quadId,
      description:
        'Quadspace metaverse allows businesses, meta realtors and individual NFT collectors to acquire Quad for $1. These estate can be used as space, 3d retail space or simply a place for you and your meta buddies to kick it!',
      image:
        'https://bafybeibaxec4sl7cbx4ey5djtofzdahowg7mv5vmfvkx3kxcfq7koecbx4.ipfs.nftstorage.link',
      external_url: 'https://quadspace.io',
      holder: 'No Holder',
      attributes: [
        { trait_type: 'Row', value: x },
        { trait_type: 'Column', value: y },
        { trait_type: 'QuadSpace', value: req.query.quadId },
      ],
    })
  }
}
