import React from 'react'

const FormEditThree = (props) => {
  return (
    <>
      <h3 className="text-white mb-2">SQ.NFT DATA</h3>

      <form className="btn-slide">
      <div className="input-group hoverable mb-2">
                        <span className="input-group-text ">
                            <i className="bi bi-link"></i>
                        </span>
                        <input
                            type="text"
                            placeholder="Https://"

                            className="form-control"
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
          <div onClick={() => props.goToStep(5)} className="circlee"></div>
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

export default FormEditThree