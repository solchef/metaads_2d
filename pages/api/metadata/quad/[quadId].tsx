export default function handler(req, res) {
  let x = Number(req.query.quadId) % 1000
  let y = Math.ceil(Number(req.query.quadId) / 1000)

  res.status(200).json({
    name: 'Quad #' + req.query.quadId,
    description:
      'Quadspace metaverse allows businesses, meta realtors and individual NFT collectors to acquire Quad for $1. These estate can be used as space, 3d retail space or simply a place for you and your meta buddies to kick it!',
    image:
      'https://bafybeibaxec4sl7cbx4ey5djtofzdahowg7mv5vmfvkx3kxcfq7koecbx4.ipfs.nftstorage.link',
    external_url: 'https://quadspace.io',
    attributes: [
      { trait_type: 'Row', value: x.toString() },
      { trait_type: 'Column', value: y.toString() },
      { trait_type: 'QuadSpace', value: req.query.quadId }
    ],
  })
}
