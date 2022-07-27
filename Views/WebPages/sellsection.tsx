/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import {
  getParcel,
  selectLand,
  setViewState,
} from '../../components/reducers/Settings'
import { useAppDispatch, useAppSelector } from '../../components/store/hooks'

export const Sellsection = () => {
  const landData = useAppSelector(selectLand)
  const parcelData = useAppSelector(getParcel)
  // console.log(parcelData)
  const dispatch = useAppDispatch()
  return (
    <div className="offcanvas-body image-info pb-5 p-0 text-center">
      {/* <h3> FOR SALE</h3> */}
      <div className="forsale mb-5">
        <h3>FOR SALE</h3>
      </div>
      <h3 className="mt-2">TMDW Token {parcelData.position}</h3>
      <p className="mt-2">{parcelData.description}</p>

      <hr className="my-4" />
      <div className="d-flex flex-wrap flex-column">
        <a
          className="btn-primary hoverable mx-3 d-block mt-4 btn-md "
          onClick={() => {
            dispatch(setViewState(1))
          }}
          href="#"
        >
          <i className="bi-wallet me-2"></i> MINT TOKEN
        </a>
      </div>
    </div>
  )
}
