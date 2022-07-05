import { useEffect, useState } from 'react'
import { Web3Button } from '../../components'
import { selectLand } from '../../components/reducers/Settings'
import { useAppSelector } from '../../components/store/hooks'
import { useWeb3Context } from '../../context'
import useCanvas from '../../hooks/useCanvas'
import { useIPFS } from '../../hooks/useIPFS'
import { handleMint } from '../../utils/handleMint'
import { setWidth, setHeight, getLandDefSize, getLands } from './canvesGrid'

function PurchaseSection({
  isCanvasLeft,
  setIsCanvasLeft,
  activeItem,
  setSelectorHeight,
  setSelectorWidth,
  selectorHeight,
  selectorWidth,
  enableBuy,
  setEnableBuy,
  getMintImage,
}) {
  const { uploadMetadata, uploadImage } = useIPFS()
  const [mintStatus, setMintStatus] = useState('PURCHASE PLOT')
  const landData = useAppSelector(selectLand)
  const { contracts, address, web3Provider } = useWeb3Context()
  const [name, setName] = useState('')
  const [buyState, setBuyState] = useState(activeItem)
  const adscontract = contracts['metaads']
  const [info, setInfo] = useState(activeItem)
  const [land, setLand] = useState<any>({})
  useEffect(() => {
    // setEnableBuy(enableBuy)
    // console.log(enableBuy)
    setInfo(activeItem)
  }, [activeItem, enableBuy])

  useEffect(() => {
    setLand({
      x: landData.x,
      y: landData.y,
      w: landData.w,
      h: landData.h,
    })
  }, [landData])

  const handleSubmit = async () => {
    console.log(getLands()[0])
    const land = getLands()[0]
    const result = await handleMint(
      name,
      address,
      adscontract,
      getMintImage,
      land,
      uploadMetadata,
      uploadImage
    )
    setMintStatus(result)
  }

  return (
    <>
      <div
        className={`offcanvas offcanvas-start hide-mobile ${
          isCanvasLeft && 'show'
        }`}
        data-bs-backdrop="false"
        style={{ visibility: 'visible' }}
      >
        <div className="offcanvas-header">
          <button
            type="button"
            onClick={() => setIsCanvasLeft(false)}
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div
          style={{ padding: '30px' }}
          className="offcanvas-title hide-mobile hoverable"
        >
          <i className="bi-flag" />
          <h3 className="mb-0">PurCHASE LAND</h3>
        </div>
        <div className="offcanvas-body pt-5">
          <h3>SELECT LOT SIZE</h3>

          <form>
            <div className="input-group hoverable mb-4">
              <span className="input-group-text ">
                <i className="bi-border" />
              </span>
              <input
                type="number"
                min="1"
                max="1000000"
                aria-label="x"
                placeholder="X"
                onChange={(e) => setWidth(e.target.value)}
                className="form-control"
                defaultValue={getLandDefSize().w}
              />
              <input
                type="number"
                aria-label="y"
                min="1"
                max="1000000"
                defaultValue={getLandDefSize().h}
                placeholder="Y"
                onChange={(e) => setHeight(e.target.value)}
                className="form-control value="
              />
            </div>
          </form>

          <hr />
          <h3> PICK LOT LOCATION</h3>

          <p>
            You can <i className="bi-arrows-move" /> drag your plot to the
            desired location.
          </p>
          <hr />
          <h3> PICK LOT NAME</h3>

          <form>
            <div className="input-group hoverable mb-4">
              <span className="input-group-text ">
                <i className="bi bi-geo-alt"></i>
              </span>
              <input
                type="text"
                placeholder="ENTER LOT NAME"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
          </form>

          <hr />
          {web3Provider ? (
            <button
              className="btn-primary hoverable hoverable btn-lg mb-3 w-100"
              onClick={() => handleSubmit()}
            >
              <i className="bi-cart me-2" />
              {mintStatus}
            </button>
          ) : (
            <div className="mb-4 mt-4">
              <Web3Button title={'PURCHASE PLOT'} />
            </div>
          )}

          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-wrap flex-column">
                <span className="mb-2">
                  <img src="assets/images/square_icon.png" width="16px" /> :{' '}
                  {selectorHeight * selectorWidth} Quads
                </span>

                <span className="text-nowrap mb-2">
                  {' '}
                  <b>
                    <i className="bi bi-tag"></i> :{' '}
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
                  </svg>{' '}
                  &nbsp;0.000942 ( $ {selectorHeight * selectorWidth} )
                </span>
              </div>
            </div>

            <div className="col-12">
              <div className="d-flex  flex-column">
                <span className="mb-2">
                  <i className="bi bi-border "></i> : ( {land.w} x {land.h} )
                </span>
                <span>
                  <i className="bi bi-geo-alt"></i> {`${land.x}X , ${land.y}Y`}{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-bs-scroll="true"
        className="offcanvas show-mobile offcanvas-top"
        data-bs-backdrop="false"
        tabIndex={-1}
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasTopLabel">filter</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="filter flex-column d-flex ms-auto ">
            <div className="mb-3 checkbox checkbox-available">
              <input
                id="checkboxAvailable"
                className="styled"
                type="checkbox"
                defaultChecked
                disabled
              />
              <label htmlFor="checkboxAvailable">Available to Buy</label>
            </div>
            <div className="mb-3 checkbox checkbox-own">
              <input
                id="checkboxOwn"
                type="checkbox"
                className="styled"
                defaultChecked
              />
              <label htmlFor="checkboxOwn">PREMIUM ADSPACE</label>
            </div>
            <div className="mb-3 checkbox checkbox-own">
              <input
                id="checkboxOwn"
                type="checkbox"
                className="styled"
                defaultChecked
              />
              <label htmlFor="checkboxOwn">I Already Own</label>
            </div>
            <div className="checkbox checkbox-sold">
              <input
                id="checkboxSold"
                type="checkbox"
                className="styled"
                defaultChecked
              />
              <label htmlFor="checkboxSold">Already Sold</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PurchaseSection
