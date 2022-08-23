export default function handler(req, res) {
  let x = Number(req.query.quadId) % 1000
  let y = Math.ceil(Number(req.query.quadId) / 1000)

  res.status(200).json({
    name: 'TMDW#' + req.query.quadId,
    description:
      'TMDW is the homepage billboard of the Metaverse!',
    image: 'https://api.quadspace.io/uploads/tmdw.jpg',
    external_url: 'https://quadspace.io',
    attributes: [
      { trait_type: 'Row', value: x.toString() },
      { trait_type: 'Column', value: y.toString() },
      { trait_type: 'QuadSpace', value: req.query.quadId },
    ],
  })
}

// locate quad parcel and update
// get parcel image and divide
//return individual quad image
