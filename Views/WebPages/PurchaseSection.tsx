import { useEffect, useState } from 'react'
import {
  selectViewState,
  selectShowMenu,
  setShowMenu,
  setViewState,
  getQuadPrice,
  selectLand,
  getParcel,
} from '../../components/reducers/Settings'
import { useAppSelector, useAppDispatch } from '../../components/store/hooks'
import { useWeb3Context } from '../../context'
import { useIPFS } from '../../hooks/useIPFS'
import { handleMint } from '../../utils/handleMint'
import { About } from './About'
import { ImageInfoButton } from './ImageInfoButton'
import { Sellsection } from './sellsection'
import { Section } from './Section'
import Main from './Main'
import { RoadMap } from './RoadMap'
import { CustomizeSection } from './CustomizeSection'
// import { MiniMap } from './Map'
import { handleUpdateData } from '../../utils/handleUpdateData'

function PurchaseSection() {
  const { uploadMetadata, uploadImage, handleMultiUploadMetadata } = useIPFS()
  const landData = useAppSelector(selectLand)
  const { contracts, address } = useWeb3Context()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const adscontract = contracts['metaads']
  const [MintImage, setMintImage] = useState(null)
  const parcelDt = useAppSelector(getParcel)

  const [land, setLand] = useState<any>({})

  const viewState = useAppSelector(selectViewState)
  const dispatch = useAppDispatch()
  const showMenu = useAppSelector(selectShowMenu)
  const quadPrice = useAppSelector(getQuadPrice)

  useEffect(() => {
    setLand({
      x: landData.x,
      y: landData.y,
      w: landData.w,
      h: landData.h,
    })
  }, [landData])

  const handleSubmit = async () => {
    const result = await handleMint(
      name,
      address,
      description,
      url,
      adscontract,
      MintImage,
      land,
      uploadMetadata,
      uploadImage,
      quadPrice
    )
  }

  const handleCustomize = async () => {
    const result = await handleUpdateData(
      name,
      address,
      description,
      url,
      adscontract,
      MintImage,
      land,
      uploadMetadata,
      uploadImage,
      parcelDt,
      handleMultiUploadMetadata
    )
  }

  const getVisibilityMode = () => {
    if (viewState === 0) return <About />
    if (showMenu && viewState === 7) return <RoadMap />

    if (!showMenu) return <Main />
    if (showMenu && viewState === 1)
      return (
        <Section
          setUrl={setUrl}
          setName={setName}
          setMintImage={setMintImage}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
        />
      )
    if (showMenu && viewState === 2) return <Sellsection />
    if (showMenu && viewState === 3) return <ImageInfoButton />
    if (showMenu && viewState === 4) return <Main />
    if (showMenu && viewState === 6)
      return (
        <CustomizeSection
          setUrl={setUrl}
          setName={setName}
          setMintImage={setMintImage}
          setDescription={setDescription}
          handleSubmit={handleCustomize}
        />
      )
  }
  const getMiniMap = () => {
    const ratio = 5
    const width = window.innerWidth / ratio
    const height = window.innerHeight / ratio
    return (
      <></>
      // <div className="d-flex justify-content-center">
      //   <div
      //     className="d-flex justify-content-center"
      //     id="mini-map-container"
      //     style={{
      //       position: 'relative',
      //       overflow: 'hidden',
      //       backgroundColor: '#00000050',
      //       width: width,
      //       height: height,
      //       minHeight: 250,
      //       minWidth: 250,
      //     }}
      //   >
      //     <MiniMap />
      //   </div>
      // </div>
    )
  }

  return (
    <>
      <div
        className={`offcanvas offcanvas-start  ${showMenu && 'show'}`}
        data-bs-backdrop="false"
        style={{ visibility: 'visible' }}
      >
        <div className="offcanvas-title ">
          <span className="">
            {viewState === 0
              ? 'Menu'
              : viewState === 1
              ? 'Menu'
              : viewState === 2
              ? 'Menu'
              : viewState === 4
              ? 'Menu'
              : viewState === 7
              ? 'Menu'
              : 'Menu'}
          </span>

          <a
            className=""
            style={{ float: 'right', marginRight: '20px' }}
            onClick={() => {
              dispatch(setShowMenu(!showMenu))
              dispatch(setViewState(4))
            }}
            href="#"
          >
            {showMenu && <i className="fa fa-close"></i>}
          </a>
          {/* {viewState !== 0 && showMenu ? getMiniMap() : ''} */}
        </div>
        {getVisibilityMode()}
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
