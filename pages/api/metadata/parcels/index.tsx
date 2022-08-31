/* eslint-disable @typescript-eslint/no-var-requires */
const { connectToDatabase } = require('../../../../lib/mongodb')
const ObjectId = require('mongodb').ObjectId

export default function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getParcels(req, res)
    }

    case 'GET/{id}': {
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
    const { db } = await connectToDatabase()
    // add the Parcel
    const parcel = await db
      .collection('parcels')
      .insertOne(JSON.parse(req.body))
    // return a message
    return res.json({
      message: 'Parcel added successfully',
      success: true,
      parcel: parcel,
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
    const { db } = await connectToDatabase()
    // fetch the parcels
    const parcels = await db
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

async function getParcel(req, res) {
  try {
    // connect to the database
    const { db } = await connectToDatabase()
    // fetch the parcels
    let parcels = await db
      .collection('parcels')
      .find({ _id: ObjectId(req.params.id) })
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
    const { db } = await connectToDatabase()

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
