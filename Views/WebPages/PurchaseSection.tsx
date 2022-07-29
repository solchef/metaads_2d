import { useEffect, useState } from 'react'
import {
  selectLand,
  selectViewState,
  selectShowMenu,
  setShowMenu,
  setViewState,
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

function PurchaseSection({ activeItem, enableBuy }) {
  const { uploadMetadata, uploadImage } = useIPFS()
  const landData = useAppSelector(selectLand)
  const { contracts, address } = useWeb3Context()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const adscontract = contracts['metaads']
  const [info, setInfo] = useState(activeItem)
  const [MintImage, setMintImage] = useState(null)
  const [land, setLand] = useState<any>({})
  useEffect(() => {
    setInfo(activeItem)
  }, [activeItem, enableBuy])
  const viewState = useAppSelector(selectViewState)
  const dispatch = useAppDispatch()
  const showMenu = useAppSelector(selectShowMenu)

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
      uploadImage
    )
  }
  const getVisibilityMode = () => {
    if (showMenu && viewState === 0) return <About />
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
  }

  return (
    <>
      <div
        className={`offcanvas offcanvas-start  ${showMenu && 'show'}`}
        data-bs-backdrop="false"
        style={{ visibility: 'visible' }}
      >
        <div className="offcanvas-title ">
          <span className="pt-2">
            {viewState === 0
              ? ''
              : viewState === 1
              ? ''
              : viewState === 2
              ? ''
              : viewState === 4
              ? ''
              : viewState === 7
              ? ''
              : ''}
          </span>
          <span
            onClick={() => {
              dispatch(setShowMenu(!showMenu))
              dispatch(setViewState(4))
            }}
            className={`icon ${showMenu && 'open'}  position-absolute`}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
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
