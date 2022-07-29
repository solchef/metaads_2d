/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import { useEffect, useState } from 'react'
import {
  getParcel,
  selectClickMint,
  selectLand,
  setClickMint,
  setViewState,
} from '../../components/reducers/Settings'
import { store } from '../../components/store'
import { useAppDispatch, useAppSelector } from '../../components/store/hooks'

export const Sellsection = () => {
  const landData = useAppSelector(selectLand)
  const parcelData = useAppSelector(getParcel)
  const [land, setLand] = useState({
    data: false,
    name: 'quad',
    coords: '-1 , -1',
    width: 0,
    height: 0,
    image: '',
    status: 'Available',
    url: '#',
    description: '',
    position: 0,
  })
  const clickMint = useAppSelector(selectClickMint)

  useEffect(() => {
    setLand(parcelData)
    console.log(parcelData)
  }, [parcelData])
  const dispatch = useAppDispatch()
  return (
    <div className="offcanvas-body image-info pb-5 mt-4 p-0 text-center">
      {/* <h3> FOR SALE</h3> */}
      <div className="forsale mb-4">
        <h3>FOR SALE</h3>
      </div>
      <hr className="my-4" />

      <h3>TMDW Token {land.position}</h3>
      <p className="mt-2 text-start">{land.description}</p>

      <div className="d-flex flex-wrap flex-column">
        <a
          className="btn-primary hoverable mx-3 mt-4 d-block  btn-md "
          onClick={() => {
            dispatch(setViewState(1))
            dispatch(setClickMint(!clickMint))
          }}
          href="#"
        >
          <i className="bi-wallet me-2"></i> MINT TOKEN
        </a>
      </div>
      <p className="mt-4 text-nowrap">
        ❤️ Share with your friends and followers ❤️
      </p>
      <div className="d-flex mt-2 justify-content-center">
        <i className="bi cursor-pointer	 fs-4 bi-whatsapp"></i>
        <i className="bi fs-4 bi-facebook mx-4"></i>
        <i className="bi fs-4 bi-twitter"></i>
      </div>
    </div>
  )
}
