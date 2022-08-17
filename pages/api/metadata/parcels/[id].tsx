const { connectToDatabase } = require('../../../../lib/mongodb')
const ObjectId = require('mongodb').ObjectId

export default function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getParcel(req, res)
    }
  }
}

async function getParcel(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase()
    // fetch the parcels
    let parcels = await db
      .collection('parcels')
      .find({_id: ObjectId(req.query.id)})
      .sort({ published: -1 })
      .toArray()
    // return the parcels
    return res.json({
      message: JSON.parse(JSON.stringify(parcels)),
      success: true,
    })
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}


