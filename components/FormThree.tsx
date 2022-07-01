import React from 'react'

const FormThree = (props) => {
  return (
    <>
      <h3 className="text-white mb-4">STEP 3 - NAME YOUR LOT</h3>

      <form className="btn-slide">
        <div className="input-group hoverable  ">
          <span className="input-group-text ">
            <i className="bi-geo-alt " />
          </span>
          <input
            type="text "
            aria-label="x "
            placeholder="ENTER LOT NAME "
            className="form-control "
          />
        </div>
      </form>

      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex cir">
          <div onClick={() => props.goToStep(1)} className="circlee "></div>
          <div onClick={() => props.goToStep(2)} className="circlee "></div>
          <div
            onClick={() => props.goToStep(3)}
            className="circlee active"
          ></div>
          <div onClick={() => props.goToStep(4)} className="circlee"></div>
        </div>
        <button
          className="btn btn-primary Back ps-5 pe-5 "
          onClick={props.previousStep}
        >
          Back
        </button>
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

export default FormThree
