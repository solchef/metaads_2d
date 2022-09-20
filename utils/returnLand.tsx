import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  setParcel,
  setShowMenu,
  setViewState,
} from '../components/reducers/Settings'
import { store } from '../components/store'
import { InitialParcels, QuadSpaceContract } from './constants'

export const findLand = (x1, y1, x2, y2, x, y) => {
  if (x >= x1 && x <= x2 && y >= y1 && y <= y2) return true

  return false
}

export const returnLand = async (x, y, parcels, address) => {
  store.dispatch(setShowMenu(true))
  store.dispatch(setViewState(2))

  let pos = y * 1000 + x
  pos = pos + 1

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
    datauri: '',
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
        name: 'TMDW Premium Token',
        coords: x + 1 + ',' + (y + 1),
        width: 1,
        height: 1,
        image: 'https://api.quadspace.io/uploads/quadmint.png',
        status: 'Available',
        url: 'https://quadspace.io',
        description: `This Premium NFT gives you full ownership of block ${pos} on TheMillionDollarWebsite.com (TMDW) It hasn't been claimed yet so click mint to buy it now!`,
        position: pos,
        address: QuadSpaceContract,
        datauri: '',
      }
      // store.dispatch(setViewState(3))
    }
  })

  if (
    findLand(
      InitialParcels[4].x,
      InitialParcels[4].y,
      InitialParcels[4].x + InitialParcels[4].w - 1,
      InitialParcels[4].y + InitialParcels[4].h - 1,
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
      datauri: '',
    }
    store.dispatch(setViewState(3))
  }

  parcels.forEach(async (land, i) => {
    const cx = Number(land.coord) % 1000
    const cy = Math.ceil(Number(land.coord) / 1000)
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
        name: `TMDW ${pos}`,
        coords: x + ',' + y,
        width: Number(land.width),
        height: Number(land.height),
        image: `https://api.quadspace.io/uploads/tmdw.jpg`, //temporary compressed served image of parcel
        status: 'Bought',
        url: 'https://quadspace.io',
        description: `This NFT  ${pos} on TheMillionDollarWebsite.com (TMDW) has been claimed.`,
        position: Number(land.coord),
        address: land.owner,
        datauri: land.uri,
      }
      store.dispatch(setViewState(3))
    }
  })

  store.dispatch(setParcel(landpoint))
  return landpoint
}

export const returnLandType = async (pos) => {
  const x = Math.ceil(Number(pos) / 1000)
  const y = Number(pos) % 1000

  let landType = 1
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
      landType = 2
    }
  })

  return landType
}
