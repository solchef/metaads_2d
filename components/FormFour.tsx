import React from "react";

const FormFour = (props) => {
  return (
    <>
            <p className="muted ">QTY: 120 Parcels <br /> PRCE: $120 (35ae)<br /> ADSPACE: 800px, QuadRooms: 12000ft2 Parcels: X112-Y76 </p>

<div className="d-flex mt-4 justify-content-between">

<button className="btn btn-primary ps-5 pe-5 " onClick={props.previousStep}>Back</button>

<button className="btn-primary hoverable  "  ><i className="bi-cart me-2 " />PURCHASE
     LOT</button>
</div>



    </>
  );
};

export default FormFour;
