import { useEffect, useState } from 'react'
import { Web3Button } from '../../components'
import { useWeb3Context } from '../../context'
import useCanvas from '../../hooks/useCanvas'
import { useIPFS } from '../../hooks/useIPFS'
import { QuadDescription } from '../../utils/constants'
import { ErrorTransaction, MiningTransaction, SuccessfulTransaction, InfoMessage } from '../../utils/notifications';


function PurchaseSection({ isCanvasLeft, setIsCanvasLeft, activeItem }) {
  const {
    setSelectorHeight,
    setSelectorWidth,
    selectorHeight,
    selectorWidth,
    squreInfo,
    getMintImage
  } = useCanvas()

  const { uploadMetadata, uploadImage } = useIPFS()
  const [mintStatus, setMintStatus] = useState('PURCHASE PLOT')
  const [message, setMessage] = useState('PURCHASE PLOT')

  const { contracts, address, web3Provider } = useWeb3Context()
  const [name, setName] = useState('')

  const adscontract = contracts['metaads']
  const [info, setInfo] = useState(squreInfo)
  
  useEffect(() => {
    console.log(squreInfo)
    setInfo(squreInfo)
  }, [squreInfo])

  const handleMint = async () => {
    console.log(squreInfo)
    setMintStatus('Minting')
    // const selectedSqures = [1]
    // const quantSupplies = [1]
    // const cords = [1]
    
      console.log(activeItem);

    const image = await uploadImage(await getMintImage())

    const metadata = await uploadMetadata(
      name,
      QuadDescription,
      image,
      info.x,
      info.y
    )

    if (!metadata) {
      ErrorTransaction({title: "Metadata Error ", description:"Metatadata could not be uploaded. Please try again later"})
      return
    }
    if(!name){
      ErrorTransaction({title: "Upload Error ", description:"Please provide a name for your quad"})
      return
    }

    InfoMessage({title: "QUAD purchase", description:"Purchasing of the quads has not began."})
    try {
   await adscontract
        .create(
          address,
          101, 
          1,  
          metadata,
          "0x00"
        )
        .on('transactionHash', (hash) => {
          setMintStatus('Minted')
          MiningTransaction({title: "Mining", description:hash})
        })
        .on('confirmation', (hash) => {
          SuccessfulTransaction({title: "Confirmed", description:hash})
          setMintStatus('Success')
        })
        .on('error', (e) => {
          ErrorTransaction({title: "Error Occurred", description:e})
          setMintStatus('An Error Occurred')
        })
    } catch (e) {
      ErrorTransaction({title: "Error Occurred", description:"Transaction could not be processed"})
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
        <div
          style={{ padding: '30px' }}
          className="offcanvas-title hide-mobile hoverable"
        >
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
                type="number"
                aria-label="x"
                placeholder="X"
                onChange={(e) => setSelectorWidth(e.target.value)}
                className="form-control"
                defaultValue={selectorWidth}
              />
              <input
                type="number"
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
                type="number"
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
            {web3Provider ? 
                <button
                className="btn-primary hoverable btn-lg mb-3 w-100"
                onClick={() => handleMint()}
              >
                <i className="bi-cart me-2" />
                {mintStatus}
              </button>
              :
              <Web3Button/>
          }
            
            <span>{message}</span>
            <p className="muted">

              QTY: {selectorHeight * selectorWidth} Parcels
              <br /> PRICE: $ {selectorHeight * selectorWidth}
              <br /> ADSPACE: {selectorHeight * selectorWidth}, <br />
              QuadRooms: 12000ft2 <br />

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
