import React from "react";

const FormOne = (props) => {
  return (
    <>

      <form>
      <h3 className='text-white mb-4'>ONE PARCELS</h3>

        <p className=" text-white"><i className="bi bi-bounding-box-circles " />=10 X 10 px = $1 = 100 ft ²=<i className="bi bi-box " /></p>

      </form>

      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex cir">
          <div className="circlee active">

          </div>
          <div className="circlee ">

          </div>
          <div className="circlee">

          </div>
          <div className="circlee">

          </div>
        </div>
        <button className="btn btn-primary Next ps-5 pe-5 " onClick={props.nextStep}>Next</button>
      </div>




    </>
  );
};

export default FormOne;
