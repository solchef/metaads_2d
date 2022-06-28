import useCanvas from '../../hooks/useCanvas'

export const PurchaseSection = () => {
  const { setSelectorHeight, setSelectorWidth, selectorHeight, selectorWidth } =
    useCanvas()

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex={-1}
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
        style={{ visibility: 'visible' }}
        aria-modal="true"
        role="dialog"
      >
        <div className="offcanvas-header">
          <h3>
            <i className="bi-flag" />
          </h3>
          <h3>PurCHASE LAND</h3>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-title hide-mobile hoverable">
          <i className="bi-flag" />
          <h3>PurCHASE LAND</h3>
        </div>
        <div className="offcanvas-body">
          <h3>ONE PARCELS</h3>
          <p>
            <i className="bi bi-bounding-box-circles" /> = {selectorWidth} X{' '}
            {selectorHeight}
            px = $1 = 100 ft ²= <i className="bi bi-box" />
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
                defaultValue={10}
              />
              <input
                type="text"
                aria-label="y"
                defaultValue={10}
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
          <div className="flex-column d-flex">
            <button
              className="btn-primary hoverable btn-lg mb-3 w-100"
              onClick={() => handleMint()}
            >
              <i className="bi-cart me-2" />
              PURCHASE PLOT
            </button>
            <p className="muted">
              QTY: 120 Parcels <br /> PRCE: $120 (35ae)
              <br /> ADSPACE: 800px, QuadRooms: 12'000ft2 Parcels: X112-Y76{' '}
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
