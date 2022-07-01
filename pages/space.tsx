import { useState, useEffect } from 'react'
import useCanvas from '../hooks/useCanvas'
import StepWizard from 'react-step-wizard'
import FormOne from '../components/FormOne'
import FormTwo from '../components/FormTwo'
import FormThree from '../components/FormThree'
import FormFour from '../components/FormFour'
import PurchaseSection from '../Views/WebPages/PurchaseSection'
import SpaceDetails from '../Views/WebPages/SpaceDetails'
import Link from 'next/link'
const Space = () => {
  const [isCanvasRight, setIsCanvasRight] = useState(false)
  const [isCanvasLeft, setIsCanvasLeft] = useState(false)
  const [isCanvasBottem, setIsCanvasBottem] = useState(false)
  const offcanvasRight = () => {
    setIsCanvasRight(!isCanvasRight)
    setIsCanvasLeft(false)
    setIsCanvasBottem(false)

  }
  const offcanvasLeft = () => {
    setIsCanvasLeft(!isCanvasLeft)
    setIsCanvasRight(false)
    setIsCanvasBottem(false)
  }
  const offcanvasBottem = () => {
    setIsCanvasBottem(!isCanvasBottem)
    setIsCanvasRight(false)
  }



  const { cAreaRef, zoomIn, zoomOut, squreInfo, addSelector, resetPlane } = useCanvas()
  useEffect(() => {
    console.log(squreInfo)
  }, [squreInfo])
  const [twoFeeTypes, setTwoFeeTypes] = useState(1)

  const addFormTwoHandler = () => setTwoFeeTypes(twoFeeTypes + 1)

  const removeFormTwoHandler = () => setTwoFeeTypes(twoFeeTypes - 1)

  return (
    <>
      <section className="mt-0" id="grid-section">
        <div className="container">
          <div className="controls align-items-center">
            <div className="d-flex flex-row-inverse justify-content-between align-items-center wrap-flow">
              <div className="buttons d-flex flex-row ">
                <button
                  onClick={offcanvasLeft}
                  className="btn btn-primary hoverable purp-btn btn-lg btn-buy hide-mobile"
                >
                  <i className="bi-cart me-2 " />
                  BUY QUADS LOT
                </button>
                <button
                  onClick={offcanvasBottem}
                  className="btn btn-primary hoverable purp-btn btn-lg btn-buy show-mobile"
                >
                  <i className="bi-cart " />
                </button>
                <button className="col hide-mobile hoverable btn btn-primary purp-btn btn-lg ">
                  <i className="bi bi-border " />
                </button>
                <button className="col hide-mobile hoverable btn btn-primary purp-btn btn-lg ">
                  <i className="bi bi-signpost-fill " />
                </button>
                <button className="col hide-mobile hoverable btn btn-primary purp-btn btn-lg ">
                  <i className="bi bi-image " />
                </button>
                <button className="col hide-mobile hoverable btn btn-primary purp-btn btn-lg ">
                  <i className="bi bi-box " />
                </button>
              </div>
              <div className="buttons ">
                <button
                  onClick={offcanvasRight}
                  className="btn btn-primary hoverable btn-lg"
                >
                  <i className="bi bi-hand-index" />
                </button>
                <button
                  title="Reset"
                  onClick={() => resetPlane()}
                  className="btn btn-primary hoverable btn-lg"
                >
                  <i className="bi-arrow-clockwise" />
                </button>
                <button
                  title="Move Map"
                  onClick={() => addSelector()}
                  className="btn btn-primary hoverable btn-lg "
                >
                  <i className="bi-arrows-move" />
                </button>
                <button
                  onClick={() => zoomIn()}
                  title="Zoom-out"
                  className="btn btn-primary hoverable btn-lg"
                >
                  {' '}
                  <i className="bi-zoom-out " />
                </button>
                <button
                  onClick={() => zoomOut()}
                  title="Zoom-in"
                  className="btn btn-primary hoverable btn-lg"
                >
                  <i className="bi-zoom-in " />
                </button>
                <button
                  title="Fullscreen"
                  className="btn btn-primary hoverable btn-lg"
                >
                  <Link href="/">
                    <i className="bi-fullscreen " />
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div ref={cAreaRef} className="canvas-box  ratio-1x1 hoverable">
            <canvas id="adcanvas"></canvas>
          </div>
        </div>
      </section>


      <div className={`accordion show-mobile show ${isCanvasBottem ?'': 'showw'}`}>
        <div className="accordion-item ">
          <h2 className="accordion-header">
            <button
              onClick={offcanvasBottem}
              className={`accordion-button  ${isCanvasBottem &&'collapsed'}  `}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              <i className="bi-flag me-2" /> BUY LOT
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse show ${
              isCanvasBottem && ''
            }`}
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              <StepWizard>
                <FormOne addFormTwoHandler={addFormTwoHandler} />
                <FormTwo removeFormTwoHandler={removeFormTwoHandler} />
                <FormThree removeFormTwoHandler={removeFormTwoHandler} />
                <FormFour removeFormTwoHandler={removeFormTwoHandler} />

              </StepWizard>
            </div>
          </div>
        </div>
      </div>
      <SpaceDetails
      offcanvasBottem={offcanvasBottem}
      offcanvasLeft={offcanvasLeft}
        setIsCanvasRight={setIsCanvasRight}
        isCanvasRight={isCanvasRight}
      />

      <PurchaseSection
        setIsCanvasLeft={setIsCanvasLeft}
        isCanvasLeft={isCanvasLeft}
        activeItem={squreInfo}
      />

   
    </>
  )
}

export default Space
