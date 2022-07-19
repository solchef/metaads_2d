import React from 'react'
import {
  getLandDefSize,
  setHeight,
  setWidth,
} from '../Views/WebPages/canvesGrid'

const FormOne = (props) => {
  return (
  <div >


      <h3 className="text-white mb-4">STEP 1 - SQ.NFT SIZE</h3>
      <form className="btn-slide">
      <div className="input-group hoverable mb-4">
    <span className="input-group-text ">
      <i className="bi-border" />
    </span>
    <input
      type="number"
      min="1"
      max="1000000"
      aria-label="x"
      placeholder="X"
      className="form-control"
    />
    <input
      type="number"
      aria-label="y"
      min="1"
      max="1000000"
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
      </div>
  )
}

export default FormOne
