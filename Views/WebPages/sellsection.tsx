/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import { Fragment, useEffect, useState } from 'react'
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
    name: 'TMDW Token',
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
    <Fragment>
      <div className="card-body px-0 text-center">
        <div className="d-flex justify-content-center">
          <div className="square-grid full-size">
            <div className="image-container pt-3 flex-column">
              <Image
                layout="intrinsic"
                className="border border-primary-thick"
                width={80}
                height={80}
                alt="for sale"
                src="/assets/black.jpeg"
              />{' '}
              <br />
              <h2>For Sale</h2>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="card-body text-center m-3">
        <div className="">
          <h3>
            {land.name} <br /> {land.position}
          </h3>
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
    </Fragment>
  )
}
