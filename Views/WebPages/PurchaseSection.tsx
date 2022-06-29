import { useEffect, useState } from 'react'
import { useWeb3Context } from '../../context'
import useCanvas from '../../hooks/useCanvas'
import { useIPFS } from '../../hooks/useIPFS'
import { QuadDescription } from '../../utils/constants'

const PurchaseSection = ({isCanvasLeft,setIsCanvasLeft, activeItem }) => {
  const {
    setSelectorHeight,
    setSelectorWidth,
    selectorHeight,
    selectorWidth,
    squreInfo,
    capturedFileBuffer,
  } = useCanvas()

  const { uploadMetadata, uploadImage } = useIPFS()

  const [mintStatus, setMintStatus] = useState('PURCHASE PLOT')
  const [message, setMessage] = useState('PURCHASE PLOT')

  const { contracts, address } = useWeb3Context()
  const [name, setName] = useState('')

  const adscontract = contracts['metaads']
  const [info, setInfo] = useState(squreInfo)

  useEffect(() => {
    console.log(activeItem)
    setInfo(activeItem)
  }, [activeItem])

  const handleMint = async () => {
    // console.log(contracts)
    // console.log(adscontract.address)
    setMintStatus('Minting')
    const selectedSqures = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    const quantSupplies = ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1']
    const cords = [
      '1X1',
      '1X1',
      '1X1',
      '1X1',
      '1X1',
      '1X1',
      '1X1',
      '81X1',
      '1X1',
      '1X1',
    ]

    // console.log(adscontract)

    const image = await uploadImage(capturedFileBuffer)

    const metadata = await uploadMetadata(
      name,
      QuadDescription,
      image,
      info.x,
      info.y
    )

    if (!metadata) {
      setMessage('Failed to set ther asset data. Please check back')
      return
    }

    try {
      const mintAction = await adscontract
        .mint(
          address,
          selectedSqures[1],
          quantSupplies[1],
          '0x4554480000000000000000000000000000000000000000000000000000000000'
        )
        .on('transactionHash', (hash) => {
          setMintStatus('Minted')
        })
        .on('confirmation', (hash) => {
          setMintStatus('Success')
        })
        .on('error', (e) => {
          window.alert('Something went wrong when pushing to the blockchain')
          setMintStatus('An Error Occurred')
        })
      console.log(mintAction)
    } catch (e) {
      console.log(e)
      setMintStatus('An Error Occurred')
    }
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
        <div style={{padding: '30px'}} className="offcanvas-title hide-mobile hoverable">
          <i className="bi-flag" />
          <h3>PurCHASE LAND</h3>
        </div>
        <div className="offcanvas-body">
          <h3>ONE PARCELS</h3>
          <p>
            <i className="bi bi-bounding-box-circles" /> = 1 X 1 px = $ 1 = 100
            ft ²= <i className="bi bi-box" />
          </p>
          <hr />
          <form>
            <div className="input-group hoverable mb-2">
              <span className="input-group-text ">
                <i className="bi-border" />
              </span>
              <input
                type="text"
                aria-label="x"
                placeholder="X"
                onChange={(e) => setSelectorWidth(e.target.value)}
                className="form-control"
                defaultValue={selectorWidth}
              />
              <input
                type="text"
                aria-label="y"
                defaultValue={selectorHeight}
                placeholder="Y"
                onChange={(e) => setSelectorHeight(e.target.value)}
                className="form-control value="
              />
            </div>
          </form>
          <p>
            You can <i className="bi-arrows-move" /> your plot to desired
            location and purchase parcels.
          </p>
          <hr />
          <form>
            <div className="input-group hoverable mb-2">
              <span className="input-group-text ">
                <i className="bi bi-geo-alt"></i>
              </span>
              <input
                type="text"
                aria-label="x"
                placeholder="ENTER LOT NAME"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
          </form>
          <p>
            You can <i className="bi-arrows-move" /> your plot to desired
            location and purchase parcels.
          </p>
          <hr />
      
          <div className="flex-column d-flex">
            <button
              className="btn-primary hoverable btn-lg mb-3 w-100"
              onClick={() => handleMint()}
            >
              <i className="bi-cart me-2" />
              {mintStatus}
            </button>
            <span>{message}</span>
            <p className="muted">
              QTY: {selectorHeight * selectorWidth} Parcels
              <br /> PRICE: $ {selectorHeight * selectorWidth}
              <br /> ADSPACE: {selectorHeight * selectorWidth}, <br />
              QuadRooms: 12'000ft2 <br />
              Parcels: {`${info.x}X ${info.y}Y`}{' '}
            </p>
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
