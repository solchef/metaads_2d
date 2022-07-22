/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import {
  selectLand,
  selectSelectLand,
} from '../../components/reducers/Settings'
import { useAppSelector } from '../../components/store/hooks'

export const ImageInfo = () => {
  const landInfo = useAppSelector(selectSelectLand)
  console.log(landInfo)
  return (
    <div className="offcanvas-body image-info  pb-5 pt-5 p-0 ">
      <div className="image">
        <source src={landInfo.image} />
      </div>
      <h3 className="my-4">{landInfo.name}</h3>
      <div className="d-flex flex-wrap flex-column">
        <span className=" link">
          <i className="bi bi-link"></i> :&nbsp;
          <a href={landInfo.external_url} className="text-success">
            {landInfo.external_url}
          </a>
        </span>
        <span className="mb-1">
          <img src="assets/images/square_icon.png" width="16px" /> : 100 Quads
        </span>

        <span className="mb-1">
          <i className="bi bi-border " />
          &nbsp;: ( 10 x 10 )
        </span>
        <span>
          <i className="bi bi-geo-alt" /> : {landInfo.attributes[0].value}X ,{' '}
          {landInfo.attributes[1].value}Y
        </span>

        <span className="text-nowrap pt-1 mb-1">
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
          &nbsp;0.0942 ( $ 100 )
        </span>
        <span>
          <i className="bi bi-person"></i> : User Wallet
        </span>
        <span className="pt-1">
          <i className="bi bi-clipboard"></i> : Nft
        </span>
      </div>
    </div>
  )
}
