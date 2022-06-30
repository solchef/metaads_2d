import React from "react";

const FormOne = (props) => {
  return (
    <>
      <h3 className='text-white pt-4 mb-4'>ONE PARCELS</h3>

      <div className="btn-slide">

        <p className=" text-white"><i className="bi bi-bounding-box-circles " /> = 10 X 10 px = $1 = 100 ft ² = <i className="bi bi-box " /></p>

      </div>

      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex cir">
          <div onClick={() =>props.goToStep(1)} className="circlee active">

          </div>
          <div onClick={() =>props.goToStep(2)} className="circlee ">

          </div>
          <div onClick={() =>props.goToStep(3)} className="circlee">

          </div>
          <div onClick={() =>props.goToStep(4)} className="circlee">

          </div>
        </div>
        <button className="btn btn-primary Next ps-5 pe-5 " onClick={props.nextStep}>Next</button>
      </div>




    </>
  );
};

export default FormOne;
