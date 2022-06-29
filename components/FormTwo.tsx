import React from "react";

const FormTwo = (props) => {
  return (
    <>
            <p className="text-white">You can <i className=" bi-arrows-move " /> your plot to desired location and purchase parcels.</p>

         <form>
              <div className="input-group hoverable mb-2 ">
                <span className="input-group-text "><i className="bi-border " /></span>
                <input type="text " aria-label="x " placeholder="X " className="form-control " defaultValue={10} />
                <input type="text " aria-label="y " defaultValue={12} placeholder="Y " className="form-control value=" />
              </div>
            </form>

            <div className="d-flex justify-content-between mt-2">

      <button className="btn btn-primary ps-5 pe-5 " onClick={props.previousStep}>Back</button>
      <button className="btn btn-primary ps-5 pe-5 " onClick={props.nextStep}>Next</button>
      </div>
   
    </>
  );
};

export default FormTwo;
