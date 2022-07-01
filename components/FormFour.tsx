import React from "react";

const FormFour = (props) => {
  return (
    <>


<button className="btn-primary btn-slide purchase hoverable ps-5 pe-5 "  ><i className="bi-cart me-2 " />PURCHASE
     LOT</button>

     

<div className="d-flex justify-content-between mt-2">
  <div className="d-flex cir">
    <div onClick={() =>props.goToStep(1)} className="circlee ">

    </div>
    <div onClick={() =>props.goToStep(2)} className="circlee ">

    </div>
    <div onClick={() =>props.goToStep(3)} className="circlee">

    </div>
    <div onClick={() =>props.goToStep(4)} className="circlee active">

    </div>
  </div>
  <button className="btn btn-primary Back ps-5 pe-5 " onClick={props.previousStep}>Back</button>

</div>


    </>
  );
};

export default FormFour;
