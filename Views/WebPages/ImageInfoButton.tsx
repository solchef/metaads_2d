import { getParcel, setViewState } from '../../components/reducers/Settings'
import ShareSection from '../../components/ShareSection'
import { store } from '../../components/store'
import { useAppSelector } from '../../components/store/hooks'
import { useWeb3Context } from '../../context'
import { shortUrl } from '../../utils'
import { QuadSpaceContract } from '../../utils/constants'
import truncateEthAddress from '../../utils/truncate'

export const ImageInfoButton = () => {
  const parcelData = useAppSelector(getParcel)
  const { address } = useWeb3Context()

  return (
    <div className="offcanvas-body image-info  pb-5 pt-4 mt-3 p-0 text-center">
      <div className="d-flex justify-content-center">
        <div className="">
          <img height={200} width={250} src={parcelData.image} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="px-5">
        <h4>Token #{parcelData.position}</h4>
        <h3>{parcelData.name}</h3>
        <span className=" link d-block pb-1 ">
          {/* <i className="bi bi-link"></i> :&nbsp; */}
          <a href={parcelData.url} target="_blank" className="text-success">
            <u>https://{shortUrl(parcelData.url, 15)}</u>
          </a>
        </span>
        <p className="text-start mt-3">{parcelData.description}</p>
        <div className="d-flex flex-wrap flex-column">
          <span className="mt-3">
            Owned By{' '}
            <a
              className=" font-small"
              target="_blank"
              href={`https://etherscan.io/address/${parcelData.address}`}
            >
              <small>{truncateEthAddress(parcelData.address)}</small>
            </a>
          </span>
        </div>

        {address &&
        address.toLowerCase() !== parcelData.address.toLowerCase() ? (
          <div className="d-flex ">
            <a
              className="btn-primary w-100 fs-7 text-nowrap hoverable me-2 mt-4 d-block  btn-md "
              target="_blank"
              href={`https://opensea.io/assets/ethereum/${QuadSpaceContract}/${parcelData.position}`}
            >
              Bid on Token
            </a>
            <a
              className="btn-primary w-100 fs-7 text-nowrap hoverable  mt-4 d-block  btn-md "
              target="_blank"
              href={`https://etherscan.io/nft/${QuadSpaceContract}/${parcelData.position}`}
            >
              View on Etherscan
            </a>
          </div>
        ) : (
          <div className="d-flex ">
            <a
              className="btn-primary w-100 fs-7 text-nowrap hoverable me-2 mt-4 d-block  btn-md "
              href="#"
              onClick={() => store.dispatch(setViewState(6))}
            >
              Customize
            </a>

            <a
              className="btn-primary w-100 fs-7 text-nowrap hoverable me-2 mt-4 d-block  btn-md "
              target="_blank"
              href={`https://opensea.io/${QuadSpaceContract}/${parcelData.position}`}
            >
              View On OpenSea
            </a>
          </div>
        )}

        <p className="mt-4 text-nowrap">
          Share with your friends and followers
        </p>
        <div className="d-flex mt-2 justify-content-center">
          <ShareSection />
        </div>
      </div>
    </div>
  )
}
