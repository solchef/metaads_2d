/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @next/next/no-img-element */
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
import { RoadMap } from './RoadMap'
import { CustomizeSection } from './CustomizeSection'
import { handleUpdateData } from '../../utils/handleUpdateData'
import ShareSection from '../../components/ShareSection'

function PurchaseSection() {
  const { uploadMetadata, uploadImage, handleMultiUploadMetadata } = useIPFS()
  const landData = useAppSelector(selectLand)
  const { contracts, address, network } = useWeb3Context()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const adscontract = contracts['metaads']
  const [MintImage, setMintImage] = useState(null)
  const parcelDt = useAppSelector(getParcel)
  const [menu, setMenu] = useState(false)
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
    await handleMint(adscontract, land, quadPrice, network)
  }

  const handleCustomize = async () => {
    await handleUpdateData(
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
      handleMultiUploadMetadata,
      network
    )
  }

  const getVisibilityMode = () => {
    if (viewState === 0) return <About />
    if (showMenu && viewState === 7) return <RoadMap />

    if (!showMenu) return <></>
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

  return (
    <>
      <div
        className={`offcanvas offcanvas-start  ${showMenu && 'show'}`}
        data-bs-backdrop="false"
        id="menu"
        style={{ visibility: 'visible' }}
      >
        <div className="container  p-0 bg-white rounded">
          <div className="card border-0 vh-100 ">
       
            <div className="card-header">
            <a
                  href="#"
                  className='position-absolute p-3'
                  style={{right:"0"}}
                  onClick={() => {
                    dispatch(setShowMenu(!showMenu))
                  }}
                >
                 {showMenu && <i className="fa fa-close fa-xl pr-3" />}
            </a>
              <div className="d-flex justify-content-around align-items-center">
                <img
                  className="logo"
                  alt="img"
                  src="assets/images/million-dollar-logo.svg"
                
                />
                <div className="p-1 mt-3">
                  <h4 className='text-primary mb-2 mt-3'>THE MILLION <br/> DOLLAR WEBSITE</h4>
                  <p className='text-muted  fst-italic'>TMDW is the homepage billboard <br/> of the Metaverse!</p>
                </div>
            
              </div>
              
            </div>

            <div className="scroll">
              {getVisibilityMode()}
              </div>
                
            <div className="card-footer">
              <div className="text-center">
                <p> Share with your friends and followers</p>
                <div className="d-flex  justify-content-center">
                  <ShareSection />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default PurchaseSection
