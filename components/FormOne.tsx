import React from "react";

const FormOne = (props) => {
  return (
    <>
<div className="d-flex flex-column justify-content-between">
<div>
    <h3 className='text-white'>ONE PARCELS</h3>
      <p className=" text-white"><i className="bi bi-bounding-box-circles " />=10 X 10 px = $1 = 100 ft ²=<i className="bi bi-box " /></p>


    </div>
      <div className="d-flex mt-4 justify-content-end mt-2">
        <button className="btn btn-primary ps-5 pe-5 " onClick={props.nextStep}>
          Next
        </button>
      </div>

</div>


    </>
  );
};

export default FormOne;
