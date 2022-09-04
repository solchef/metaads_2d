/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import { useEffect, useState } from 'react'
import {
  getParcel,
  selectClickMint,
  setClickMint,
  setViewState,
} from '../../components/reducers/Settings'
import ShareSection from '../../components/ShareSection'
import { useAppDispatch, useAppSelector } from '../../components/store/hooks'
import Image from 'next/image'

export const Sellsection = () => {
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
  }, [parcelData])
  const dispatch = useAppDispatch()
  return (
    <div className="offcanvas-body image-info pb-5 mt-0 p-0 text-center">
      {/* <h3> FOR SALE</h3> */}

      <div className="d-flex justify-content-center">
  
         <div className="square-grid full-size">
          <div className='image-container pt-3 flex-column'>
          <Image
            layout='intrinsic'
            className="border border-primary-thick"
            width={80}
            height={80}
            alt= "for sale"
            src="/assets/images/million-dollar-logo.svg"
          /> <br/>
            <h6>{land.position}</h6>
            <h6>For Sale</h6>
          </div>
        </div>
      </div>

      <hr className="my-4" />
      <div className="">
        <h3>TMDW Token {land.position}</h3>
        <p className="mt-2 text-start">{land.description}</p>

        <div className="d-flex flex-wrap flex-column">
          <a
            className="btn-primary hoverable  mt-4 d-block  btn-md "
            onClick={() => {
              dispatch(setViewState(1))
              dispatch(setClickMint(!clickMint))
            }}
            href="#"
          >
            <i className="bi-wallet me-2"></i> MINT TOKEN
          </a>
        </div>
      </div>
    </div>
  )
}
