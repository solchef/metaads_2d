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
    <div className="offcanvas-body image-info pt-5  pb-5 p-0 ">
      <h3> FOR SALE</h3>
      <p className="mt-2">{parcelData.name}</p>
      <p className="mt-2">TMDW Token {parcelData.position}</p>
      <p className="mt-2">{parcelData.description}</p>

      <hr className="my-4" />
      <div className="d-flex flex-wrap flex-column">
        <span>
          <i className="bi bi-geo-alt" /> : {parcelData.coords}
        </span>

        <span className="text-nowrap pt-1">
          {' '}
          <b>
            <i className="bi bi-tag" /> :{' '}
          </b>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            width="12px"
            version="1.1"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 784.37 1277.39"
          >
            <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer" />
              <g id="_1421394342400">
                <g>
                  <polygon
                    fill="#343434"
                    fillRule="nonzero"
                    points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                  />
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                  />
                  <polygon
                    fill="#3C3C3B"
                    fillRule="nonzero"
                    points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                  />
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,1277.38 392.07,956.52 -0,724.89 "
                  />
                  <polygon
                    fill="#141414"
                    fillRule="nonzero"
                    points="392.07,882.29 784.13,650.54 392.07,472.33 "
                  />
                  <polygon
                    fill="#393939"
                    fillRule="nonzero"
                    points="0,650.54 392.07,882.29 392.07,472.33 "
                  />
                </g>
              </g>
            </g>
          </svg>
          &nbsp;0.000942 ( $ 1 )
        </span>
        <a
          className="btn-primary hoverable mx-3 d-block mt-4 btn-md "
          onClick={() => {
            dispatch(setViewState(1))
          }}
          href="#"
        >
          <i className="bi-wallet me-2"></i> PURCHASE PLOT
        </a>
      </div>
    </div>
  )
}
