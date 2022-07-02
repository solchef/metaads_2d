import React from 'react'

const FormOne = (props) => {
  return (
    <>
      <h3 className="text-white mb-4">STEP 1 - SELECT LOT SIZE</h3>

      <form className="btn-slide">
        <div className="input-group hoverable mb-2 ">
          <span className="input-group-text ">
            <i className="bi-border " />
          </span>
          <input
            type="text"
            aria-label="x"
            placeholder="X"
            onChange={(e) => props.setSelectorWidth(e.target.value)}
            className="form-control "
            defaultValue={props.selectorWidth}
          />
          <input
            type="text"
            aria-label="y"
            onChange={(e) => props.etSelectorHeight(e.target.value)}
            defaultValue={props.selectorHeight}
            placeholder="Y"
            className="form-control value="
          />
        </div>
      </form>

      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex cir">
          <div
            onClick={() => props.goToStep(1)}
            className="circlee active"
          ></div>
          <div onClick={() => props.goToStep(2)} className="circlee "></div>
          <div onClick={() => props.goToStep(3)} className="circlee"></div>
          <div onClick={() => props.goToStep(4)} className="circlee"></div>
        </div>
        <button
          className="btn btn-primary Next ps-5 pe-5 "
          onClick={props.nextStep}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default FormOne
