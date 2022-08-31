import axios from 'axios'
import { useEffect, useState } from 'react'
import { setParcel, setViewState } from '../components/reducers/Settings'
import { store } from '../components/store'
import { InitialParcels, QuadSpaceContract } from './constants'

export const findLand = (x1, y1, x2, y2, x, y) => {
  if (x >= x1 && x <= x2 && y >= y1 && y <= y2) return true

  return false
}

export const returnLand = async (x, y, parcels, address) => {
  let pos = y * 1000 + x
  pos = pos + 1
  // console.log(parcels)
  let landpoint = {
    parcId: 0,
    data: false,
    name: 'TMDW Token',
    coords: x + ',' + y,
    width: 1,
    height: 1,
    image: 'https://api.quadspace.io/uploads/tmdw.jpg',
    status: 'Available',
    url: '#',
    description: `This NFT gives you full ownership of block ${pos} on TheMillionDollarWebsite.com (TMDW) It hasn't been claimed yet so click mint to buy it now!`,
    position: pos,
    address: 'QuadSpaceContract',
  }

  InitialParcels.forEach((initial) => {
    if (
      findLand(
        initial.x,
        initial.y,
        initial.x + initial.w - 1,
        initial.y + initial.h - 1,
        x + 1,
        y + 1
      )
    ) {
      landpoint = {
        parcId: 0,
        data: false,
        name: 'TMDW PREMIUM',
        coords: x + 1 + ',' + (y + 1),
        width: 1,
        height: 1,
        image: 'https://api.quadspace.io/uploads/quadmint.png',
        status: 'Available',
        url: 'https://quadspace.io',
        description: `We created the Meta-Board the online version of your traditional billboard. Each pixel on the Meta-Board will also come with 1 parcel of land in the Quadspace metaverse as a BONUS!`,
        position: pos,
        address: QuadSpaceContract,
      }
      store.dispatch(setViewState(3))
    }
  })
  console.log(parcels)
  parcels.forEach(async (land, i) => {
    let cx = Number(land.coord) % 1000
    let cy = Math.ceil(Number(land.coord) / 1000)
    // console.log(cx, cy)
    let meta = undefined

    // try {
    if (land.uri != '') {
      console.log(land.uri)
      let data = await axios.get(land.uri, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
        },
      })
      console.log(data)
      let res = await data
      if (res) {
        // console.log(data)
        meta = res.message[0]
      }
    }

    // }
    // } catch (e) {
    //   console.log('incomplete parcel')
    // }

    if (
      findLand(
        cx,
        cy,
        cx + Number(land.width) - 1,
        cy + Number(land.height) - 1,
        x + 1,
        y + 1
      )
    ) {
      landpoint = {
        parcId: i + 1,
        data: true,
        name: meta && meta.name ? meta.name : `TMDW ${pos}`,
        coords: x + ',' + y,
        width: Number(land.width),
        height: Number(land.height),
        image:
          meta && meta.image_temp
            ? `https://api.quadspace.io/uploads/${meta.image_temp}`
            : `https://api.quadspace.io/uploads/tmdw.jpg`, //temporary compressed served image of parcel
        status: 'Bought',
        url: meta && meta.url ? meta.url : 'https://quadspace.io',
        description:
          meta && meta.QuadDescription
            ? meta.QuadDescription
            : `This NFT  ${pos} on TheMillionDollarWebsite.com (TMDW) has been claimed.`,
        position: Number(land.coord),
        address: land.owner,
      }

      store.dispatch(setViewState(3))

      // if (address) {
      //   if (address.toLowerCase() == land.owner.toLowerCase()) {
      //     store.dispatch(setViewState(6))
      //   } else {
      //     store.dispatch(setViewState(3))
      //   }
      // }
    }
  })

  store.dispatch(setParcel(landpoint))
  return landpoint
}
