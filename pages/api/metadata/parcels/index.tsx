const { connectToDatabase } = require('../../lib/mongodb')
const ObjectId = require('mongodb').ObjectId

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getParcels(req, res)
    }

    case 'POST': {
      return addParcel(req, res)
    }

    case 'PUT': {
      return updateParcel(req, res)
    }
  }
}

async function addParcel(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase()
    // add the Parcel
    await db.collection('parcels').insertOne(JSON.parse(req.body))
    // return a message
    return res.json({
      message: 'Parcel added successfully',
      success: true,
    })
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function getParcels(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase()
    // fetch the parcels
    let parcels = await db
      .collection('parcels')
      .find({})
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

async function updateParcel(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase()

    // update the published status of the Parcel
    await db.collection('parcels').updateOne(
      {
        _id: new ObjectId(req.body),
      },
      { $set: { published: true } }
    )

    // return a message
    return res.json({
      message: 'Parcel updated successfully',
      success: true,
    })
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}
