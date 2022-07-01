import React from 'react'

const FormTwo = (props) => {
  return (
    <>
      <h3 className="text-white mb-4">STEP 2 - PICK LOT LOCATION</h3>

      <div className="btn-slide">
        <p>
          You can <i className=" bi-arrows-move " /> drag your plot to the
          desired location.
        </p>
      </div>

      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex cir">
          <div onClick={() => props.goToStep(1)} className="circlee "></div>
          <div
            onClick={() => props.goToStep(2)}
            className="circlee active"
          ></div>
          <div onClick={() => props.goToStep(3)} className="circlee"></div>
          <div onClick={() => props.goToStep(4)} className="circlee"></div>
        </div>
        <button
          className="btn btn-primary Next ps-5 pe-5 "
          onClick={props.nextStep}
        >
          Next
        </button>
        <button
          className="btn btn-primary Back ps-5 pe-5 "
          onClick={props.previousStep}
        >
          Back
        </button>
      </div>
    </>
  )
}

export default FormTwo
