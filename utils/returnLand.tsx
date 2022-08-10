import axios from 'axios'
import { useEffect, useState } from 'react'
import { setParcel, setViewState } from '../components/reducers/Settings'
import { store } from '../components/store'

export const returnLand = (x, y) => {
  const [parcels, setParcels] = useState([])

  useEffect(() => {
    axios.get('https://quadspace.io/api/metadata/parcels').then((parc) => {
      setParcels(parc.data.message)
    })
  }, [])

  let landpoint = {
    data: false,
    name: 'TMDW Token',
    coords: x + ',' + y,
    width: 1,
    height: 1,
    image: 'https://api.quadspace.io/uploads/tmdw.jpg',
    status: 'Available',
    url: '#',
    description: `This NFT  ${y * 1000 + x} on TheMillionDollarWebsite.com (TMDW)  has been claimed.`,
    position: y * 1000 + x,
  }
  store.dispatch(setViewState(2))
  parcels.forEach((land) => {
    if (
      findLand(
        land.coordX,
        land.coordY,
        land.coordX + land.parcelWidth,
        land.coordX + land.parcelHeight,
        x,
        y
      )
    ) {
      store.dispatch(setViewState(3))
      landpoint = {
        data: true,
        name: land.name,
        coords: x + ',' + y,
        width: land.parcelWidth,
        height: land.parcelHeight,
        image: `https://api.quadspace.io/${land.image_temp}`,
        status: 'booked',
        url: land.url,
        description: land.description
          ? land.description
          : `We created the Meta-Board the online version of your traditional billboard. www.TheMillionDollarWebsite.com (http://www.themilliondollarwebsite.com/) leads to the domain www.quadspace.io (http://www.quadspace.io/). Because Quadspace powers the Metaverse component of this project. Each pixel on the Meta-Board will also come with 1 parcel of land in the Quadspace metaverse as a BONUS!`,
        position: y * 1000 + x,
      }
      return
    }
  })

  store.dispatch(setParcel(landpoint))

  return landpoint
}

const findLand = (x1, y1, x2, y2, x, y) => {
  if (x > x1 && x < x2 && y > y1 && y < y2) return true

  return false
}
