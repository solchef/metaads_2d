import React from "react";

const FormThree = (props) => {
  return (
    <>

<p className="text-white">You can <i className=" bi-arrows-move " /> your plot to desired location and purchase parcels.</p>


<form>
        <div className="input-group hoverable  ">
          <span className="input-group-text "><i className="bi-geo-alt " /></span>
          <input type="text " aria-label="x " placeholder="ENTER LOT NAME " className="form-control " />
        </div>
      </form>

   <div className="d-flex justify-content-between mt-2">
   <div className="d-flex cir">
 <div className="circlee ">

 </div>
 <div className="circlee ">

 </div>
 <div className="circlee active">

 </div>
 <div className="circlee">

 </div>
</div>
<button className="btn btn-primary Back ps-5 pe-5 " onClick={props.previousStep}>Back</button>
<button className="btn btn-primary Next ps-5 pe-5 " onClick={props.nextStep}>Next</button>
</div>


    </>
  );
};

export default FormThree;
