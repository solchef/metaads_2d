import { useEffect, useState } from 'react'
import useCanvas from '../../hooks/useCanvas'

function SpaceDetails({ isCanvasRight,setIsCanvasRight }) {
  const { squreInfo } = useCanvas()

  const [info, setInfo] = useState(squreInfo)
  useEffect(() => {
    // console.log(squreInfo)
    setInfo(squreInfo)
  }, [squreInfo])

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${isCanvasRight && 'show'}`}
        data-bs-backdrop="false"
        style={{ visibility: 'visible' }}
      >
        <div className="offcanvas-header">
          <h3>
            <i className="bi bi-info-circle" /> Information
          </h3>
          <button
            type="button"
            onClick={() => setIsCanvasRight(false)}

            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close" />
        </div>
        <div className="offcanvas-title hoverable">
          <i className="bi bi-camera" />
        </div>
        <div className="offcanvas-body d-flex flex-lg-column">
          <div>
            <h3 className="mt-4">
              <i className="bi bi-geo-alt" /> {`${info.x}X ${info.y}Y`}{' '}
            </h3>
            <h3 className="mt-4">
              <i className="bi-border" /> {info.area}{' '}
            </h3>
            <h3 className="mt-4">
              <i className="bi bi-link-45deg text-lowercase" />
              <a
                href="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
              >
                Buy Now
              </a>
            </h3>
            <h3 className="mt-4">
              <i className="bi bi-person" /> {info.owner}{' '}
            </h3>
            <hr />
            <h3 className="mt-4">Status: {info.Status} </h3>
            <h3 className="mt-4">Price: $ {info.Price} .00</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default SpaceDetails
