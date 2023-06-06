/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import { useEffect, useState, Fragment } from 'react'
import { Web3Button } from '../../components'
import {
  getBalance,
  getMintingstatus,
  selectLand,
  setLand,
  setQuadPriceCurrent,
} from '../../components/reducers/Settings'
import { useAppDispatch, useAppSelector } from '../../components/store/hooks'
// import { updateX, updateY } from './Map'
import { Web3Balance } from '../../components/Web3Balance'
import { useWeb3Context } from '../../context'
import { getQuadPrice } from '../../components/reducers/Settings'
import ShareSection from '../../components/ShareSection'
import { ErrorTransaction } from '../../utils/notifications'
import { returnLandType } from '../../utils/returnLand'

export const Section = ({ handleSubmit }) => {
  const landData = useAppSelector(selectLand)
  const { address, network } = useWeb3Context()
  const dispatch = useAppDispatch()
  const mintingDetail = useAppSelector(getMintingstatus)
  const [unmintableIDs, setUnmintableIds] = useState([])
  const [price, setPriceMint] = useState(0)
  const balance = useAppSelector(getBalance)
  const quadPrice = useAppSelector(getQuadPrice)

  const checkIfValid = () => {
    const unmintable = []

    // for (let quad = squrePos; quad < squrePos + landData.w; quad++) {
    //   for (let i = 0; i < landData.h; i++) {
    //     isFound = verifyIsAllowed(quad + 1)
    //     if (!isFound) {
    //       mintable.push(quad + i * 1000)
    //     } else {
    //       unmintable.push(quad + i * 1000)
    //     }
    //     // console.log(isFound)
    //   }
    // }
    setUnmintableIds(unmintable)
  }

  const handleNetwork = () => {
    // if (network && network.chainId !== 1) {
    ErrorTransaction({
      title: 'Wrong network',
      description:
        'You are connected to the wrong network. Please change your connection to mainnet',
    })
    return
    // }
  }
  useEffect(() => {
    setPrice()
  }, [])

  useEffect(() => {
    setPrice()
  }, [landData])

  const setPrice = async () => {
    const price = []
    let count = 0
    const squrePos = landData.y * 1000 + landData.x
    for (let quad = squrePos; quad < squrePos + landData.w; quad++) {
      for (let i = 0; i < landData.h; i++) {
        const type = await returnLandType(quad + i * 1000)
        if (type == 1) {
          price[count] = 1
        } else {
          price[count] = 5
        }
        count++
      }
    }
    // console.log(count)

    const mintprice = price.reduce((a, b) => a + b, 0)
    if (price) setPriceMint(mintprice)
    return mintprice
  }

  return (
    <Fragment>
      <div className="card-body m-3">
        <div className="xffff">
          <h3> SQ.NFT SIZE</h3>
          <div className="mt-3">
            <form>
              <div className="input-group hoverable mb-4">
                <span className="input-group-text p-0">
                  <i className="bi-border" />
                </span>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  step={1}
                  aria-label="W"
                  pattern="^(.*[^0-9]|)(1000|[1-9]\d{0,2})([^0-9].*|)$"
                  placeholder="Width"
                  value={landData.h}
                  className="form-control mb-0"
                  onChange={async (e) => {
                    checkIfValid()
                    dispatch(
                      setLand({
                        x: landData.x,
                        y: landData.y,
                        w: landData.w,
                        h: parseInt(e.target.value),
                        // p: await setPrice(),
                      })
                    )
                  }}
                />

                <input
                  type="number"
                  aria-label="H"
                  min="1"
                  max="1000"
                  pattern="^(.*[^0-9]|)(1000|[1-9]\d{0,2})([^0-9].*|)$"
                  step={1}
                  placeholder="Hight"
                  value={landData.w}
                  className="form-control mb-0"
                  onChange={async (e) => {
                    dispatch(
                      setLand({
                        x: landData.x,
                        y: landData.y,
                        w: parseInt(e.target.value),
                        h: landData.h,
                        // p: await setPrice(),
                      })
                    ),
                      checkIfValid()
                  }}
                />
              </div>
            </form>
          </div>

          <p className="py-0">
            <span className="text-bold">Spec sq. Size :</span> (1 sq=10x10px)
          </p>
          <p className="py-0">
            <span className="text-bold">Token Price:</span> {quadPrice}
          </p>

          <p className="py-0">
            <span className="text-bold">Account Balance:</span>{' '}
            {address ? <Web3Balance /> : 'Not Connected'}{' '}
          </p>
        </div>
      </div>
      <hr />
      <div className="card-body text-center m-3">
        <div className="d-flex  justify-content-between mb-4">
          <span className="mt-2">
            <i className="fa fa-shopping-cart"></i> : &nbsp;
            {landData.h * landData.w}{' '}
            {landData.h * landData.w == 1 ? 'token' : 'tokens'}
          </span>
          <span className="me-2 mt-2 text-nowrap">
            {' '}
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
            </svg>{' '}
            : &nbsp;{(price * quadPrice).toFixed(5)} ( $ {price} )
          </span>
        </div>

        <div className="d-flex justify-content-between ">
          <span className="me-2 ">
            <i className="bi bi-geo-alt" />: &nbsp;{' '}
            {landData.x + 'X, ' + landData.y + 'Y'}
          </span>

          <span className=" me-2 ">
            <i className="bi bi-border " />
            &nbsp;: ( {landData.h + ' X ' + landData.w} )
          </span>
        </div>

        <div className="text-center">
          {network && network.chainId === 1 ? (
            <h4>{mintingDetail}</h4>
          ) : (
            <h4 className="text-danger">
              You are connected to the wrong network. Please switch to Mainnet
              to mint.
            </h4>
          )}
          {unmintableIDs.length > 0 && (
            <h4>
              The following tokens cannot be minted:{' '}
              {unmintableIDs.map((idu, index) => (
                <span key={index}>{idu}, </span>
              ))}
            </h4>
          )}
        </div>

        {address ? (
          <>
            {balance < price * quadPrice && (
              <div className=" text-warning">
                <p>
                  You do not have enough Ethereum in your connected wallet.
                  Please add some funds, refresh and try again.
                </p>
              </div>
            )}
            <button
              className={`btn-primary hoverable d-block mt-3 btn-md col-12`}
              onClick={
                network && network.chainId === 1 ? handleSubmit : handleNetwork
              }
              // disabled={
              //   balance < price * quadPrice || unmintableIDs.length !== 0
              // }
            >
              <i className="bi-wallet me-2"></i> PURCHASE LOT
            </button>
          </>
        ) : (
          <Web3Button title="PURCHASE LOT" />
        )}
      </div>
    </Fragment>
  )
}
