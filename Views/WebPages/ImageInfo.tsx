/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import { getParcel } from '../../components/reducers/Settings'
import { useAppSelector } from '../../components/store/hooks'
import { shortUrl } from '../../utils'
import { QuadSpaceContract } from '../../utils/constants'
import truncateEthAddress from '../../utils/truncate'

export const ImageInfo = () => {
  const parcelData = useAppSelector(getParcel)

  return (
    <div className="offcanvas-body image-info  pb-5 pt-4 p-0 text-center">
      <div className="image">
        <img height={200} width={200} src={parcelData.image} />
      </div>
      <hr className="my-4" />
      <h4>Token #{parcelData.position}</h4>

      <h3>{parcelData.name}</h3>
      <div className="text-center">
        <a
          href={parcelData.url}
          target="_blank"
          className="text-success text-start"
        >
          <u>https://{shortUrl(parcelData.url, 15)}</u>
        </a>
      </div>

      <p className="text-start mt-3">
        <span className=" link d-block pb-1 ">
          {/* <i className="bi bi-link"></i> :&nbsp; */}
        </span>
        {parcelData.description}
      </p>
      <div className="d-flex flex-wrap flex-column">
        <span className="mt-3">
          {/* <i className="bi bi-person"></i> :{' '} */}
          Owned By <u>{truncateEthAddress(QuadSpaceContract)}</u>
        </span>
      </div>
    </div>
  )
}
