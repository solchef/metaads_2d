import { getParcel } from '../../components/reducers/Settings'
import { useAppSelector } from '../../components/store/hooks'
import { shortUrl } from '../../utils'
import { QuadSpaceContract } from '../../utils/constants'
import truncateEthAddress from '../../utils/truncate'

export const ImageInfoButton = () => {
  const parcelData = useAppSelector(getParcel)
  return (
    <div className="offcanvas-body image-info  pb-5 pt-4 mt-3 p-0 text-center">
      <div className="image">
        <img height={200} width={200} src={parcelData.image} />
      </div>
      <hr className="my-4" />
      <h4>Token #{parcelData.position}</h4>
      <h3>{parcelData.name}</h3>
      <p className="text-start mt-3">
        <span className=" link d-block pb-1 ">
          {/* <i className="bi bi-link"></i> :&nbsp; */}
          <a href={parcelData.url} target="_blank" className="text-success">
            <u>https://{shortUrl(parcelData.url, 15)}</u>
          </a>
        </span>
        {parcelData.description}
      </p>
      <div className="d-flex flex-wrap flex-column">
        <span className="mt-3">
          Owned By <u>{truncateEthAddress(QuadSpaceContract)}</u>
        </span>
      </div>
      <div className="d-flex ">
        <a
          className="btn-primary w-100 fs-7 text-nowrap hoverable me-2 mt-4 d-block  btn-md "
          target="_blank"
          href={'https://opensea.io/' + QuadSpaceContract}
        >
          Bid on Token
        </a>
        <a
          className="btn-primary w-100 fs-7 text-nowrap hoverable  mt-4 d-block  btn-md "
          target="_blank"
          href={'https://etherscan.io/contract/' + QuadSpaceContract}
        >
          View on Etherscan
        </a>
      </div>
      <p className="mt-4 text-nowrap">
        ❤️ Share with your friends and followers ❤️
      </p>
      <div className="d-flex mt-2 justify-content-center">
        <i className="bi fs-4 bi-whatsapp"></i>
        <i className="bi fs-4 bi-facebook mx-4"></i>
        <i className="bi fs-4 bi-twitter"></i>
      </div>
    </div>
  )
}
