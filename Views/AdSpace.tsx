import { useEffect,useState } from 'react'
import useCanvas from '../hooks/useCanvas'
import PurchaseSection from './WebPages/PurchaseSection'
import SpaceDetails from './WebPages/SpaceDetails'

const AdSpace: React.FunctionComponent = () => {
  const { cAreaRef, cMiniRef, zoomIn, zoomOut, addSelector, squreInfo } =
    useCanvas()

  useEffect(() => {
    console.log(squreInfo)
  }, [squreInfo])
  const [isCanvasRight, setIsCanvasRight] = useState(false)
  const [isCanvasLeft, setIsCanvasLeft] = useState(false)
  const [isCanvasBottem, setIsCanvasBottem] = useState(false)
  const offcanvasRight = () => {
    offcanvasBottem()
    setIsCanvasRight(!isCanvasRight)
    setIsCanvasLeft(false)
  }
  const offcanvasLeft = () => {
    setIsCanvasLeft(!isCanvasLeft)
    setIsCanvasRight(false)
    setIsCanvasBottem(false)
  }
  const offcanvasBottem = () => {
    setIsCanvasBottem(!isCanvasBottem)
    setIsCanvasLeft(false)
  }
  return (
    <>

      <div>
        <section id="grid-section" className="show-mobile">
          <div className="container d-flex justify-content-center  mobile-grid-button">
            <a className="btn-primary hoverable btn-lg" href="grid.html"><i className="bi bi-grid-3x3 me-2" />BUY QUADS FOR $1</a>
          </div>
        </section>




        <section id="grid-section" className="hide-mobile">
          <div className="controls align-items-center" id="buy-quads">
            <div className="d-flex flex-row-inverse justify-content-between align-items-center wrap-flow">
              <div className="buttons d-flex flex-row ">
                <div>
                  {/* <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrollingg" aria-controls="offcanvasScrollingg" className="btn btn-primary purp-btn btn-lg btn-buy hide-mobile"><i className="bi-cart me-2 " />BUY QUADS LOT</button> */}
                  <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrollingg" aria-controls="offcanvasScrollingg" className="btn btn-primary purp-btn btn-lg btn-buy"><i className="bi-cart " /></button>
                </div>

                <button className="col hide-mobile btn btn-primary purp-btn btn-lg " ><i className="bi bi-border " /></button>
                <button className="col hide-mobile btn btn-primary purp-btn btn-lg " ><i className="bi bi-signpost-fill " /></button>
                <button className="col hide-mobile btn btn-primary purp-btn btn-lg " ><i className="bi bi-image " /></button>
                <button className="col hide-mobile btn btn-primary purp-btn btn-lg " ><i className="bi bi-box " /></button>
              </div>
              <h4 className="mb-0">PURCHASE <span className="gradiant">QUADSPACE</span></h4>
              <div className="buttons ">
                <button data-bs-toggle="offcanvas " data-bs-target="#offcanvasRight " aria-controls="offcanvasRight "  onClick={offcanvasRight} className="btn btn-primary btn-lg"><i className="bi bi-hand-index " /></button>
                <button data-bs-toggle="tooltip " data-bs-placement="bottom " title="Tooltip on top " className="btn btn-primary btn-lg ">
                  <i className="bi-arrow-clockwise " />
                </button><button onClick={() => addSelector()} data-bs-toggle="tooltip " data-bs-placement="bottom " title="Tooltip on top " className="btn btn-primary btn-lg ">
                  <i className="bi-arrows-move " />
                </button><button data-bs-toggle="tooltip " data-bs-placement="bottom " title="Tooltip on top " onClick={() => zoomIn()} className="btn btn-primary btn-lg "> <i className="bi-zoom-out " />
                </button>
                <button data-bs-toggle="tooltip " data-bs-placement="bottom " title="Tooltip on top " onClick={() => zoomOut()} className="btn btn-primary btn-lg ">
                  <i className="bi-zoom-in " /></button>
                <button data-bs-toggle="tooltip " data-bs-placement="bottom " title="FullScreen" className="btn btn-primary btn-lg ">
                  <i className="bi-fullscreen " /></button>
              </div>
            </div>
          </div>


          {/* <div className="map" ref={cMiniRef} style={{ width: '20%' }}>
            <div className="map-box hide-mobile ratio ratio-1x1">
              <div>
                <canvas id="minimap"></canvas>
              </div>
            </div>
            <div className="data"></div>
          </div> */}

    
            <div ref={cAreaRef} className="canvas-box">
                  <canvas id="adcanvas"></canvas>
          
            </div>
   

        </section>
      </div>



      <SpaceDetails isCanvasRight={isCanvasRight}  />

      <PurchaseSection isCanvasLeft={isCanvasLeft}  activeItem={squreInfo} />
    </>
  )
}

export default AdSpace
