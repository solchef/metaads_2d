/* eslint-disable react/jsx-no-target-blank */
import { Fragment, useEffect, useState } from 'react'
import { getParcel, setViewState } from '../../components/reducers/Settings'
import ShareSection from '../../components/ShareSection'
import { store } from '../../components/store'
import { useAppSelector } from '../../components/store/hooks'
import { useWeb3Context } from '../../context'
import { shortUrl } from '../../utils'
import { QuadSpaceContract } from '../../utils/constants'
import truncateEthAddress from '../../utils/truncate'
import Image from 'next/image'
export const ImageInfoButton = () => {
  const parcelData = useAppSelector(getParcel)
  const { address } = useWeb3Context()
  const [metaDetails, setMetaDetails] = useState<any>()

  useEffect(() => {
    fetch(parcelData.datauri, { method: 'GET' }).then((res) => {
      res
        .json()
        .then((data) => {
          setMetaDetails(data.message[0])
        })
        .catch((e) => {
          // console.log(e)
        })
    })
  }, [parcelData])

  return (
    <Fragment>
      <div className="card-body px-0 text-center">
        <div className="d-flex justify-content-center">
          <div className="square-grid full-size">
            <div className="image-container pt-4">
              <Image
                layout="intrinsic"
                width={150}
                height={150}
                alt={
                  metaDetails
                    ? metaDetails?.name
                    : `Token #${parcelData.position}`
                }
                src={
                  metaDetails
                    ? `https://api.quadspace.io/uploads/${metaDetails?.image_temp}`
                    : parcelData.image
                }
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="" />

      <div className="card-body text-center">
        <h3 className="text-primary">
          {metaDetails ? metaDetails?.name : `Token #${parcelData.position}`}
        </h3>

        <h4>{parcelData.name}</h4>

        <span className=" link d-block pb-1 ">
          <a
            href={metaDetails ? metaDetails?.url : parcelData.url}
            target="_blank"
            className="text-success"
          >
            <u>
              https://
              {shortUrl(metaDetails ? metaDetails?.url : parcelData.url, 15)}
            </u>
          </a>
        </span>

        <p className="text-start ">
          {metaDetails ? metaDetails?.QuadDescription : parcelData.description}
        </p>

        <span className="">
          Owned By{' '}
          <a
            className=" font-small"
            target="_blank"
            href={`https://etherscan.io/address/${parcelData.address}`}
          >
            <small>{truncateEthAddress(parcelData.address)}</small>
          </a>
        </span>

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
      </div>
    </Fragment>
  )
}
