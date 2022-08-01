import React from 'react'
import { selectLand, setLand } from '../reducers/Settings'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const FormOne = (props) => {
  const landData = useAppSelector(selectLand)
  const dispatch = useAppDispatch()

  return (
    <div>
      <h3 className="text-white mb-2"> SQ.NFT SIZE</h3>
      <form className="btn-slide mb-0 pb-0">
        <div className="input-group hoverable mb-2">
          <span className="input-group-text ">
            <i className="bi-border" />
          </span>
          <input
            type="number"
            min="1"
            max="1000000"
            value={landData.h}
            onChange={(e) => {
              dispatch(
                setLand({
                  x: landData.x,
                  y: landData.y,
                  w: landData.w,
                  h: parseInt(e.target.value),
                })
              )
            }}
            className="form-control "
            defaultValue={10}
          />
          <input
            type="number"
            min="1"
            max="1000000"
            value={landData.w}
            onChange={(e) => {
              dispatch(
                setLand({
                  x: landData.x,
                  y: landData.y,
                  w: parseInt(e.target.value),
                  h: landData.h,
                })
              )
            }}
            defaultValue={10}
            className="form-control"
          />
        </div>
      </form>
      <p className="mt-0 pt-0">
        Select your NFI sq. Size (1 sq=10x10px) & Drag it where you want it.
      </p>
      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex cir">
          <div
            onClick={() => props.goToStep(1)}
            className="circlee active"
          ></div>
          <div onClick={() => props.goToStep(2)} className="circlee "></div>
          <div onClick={() => props.goToStep(3)} className="circlee"></div>
          <div onClick={() => props.goToStep(4)} className="circlee"></div>
          <div onClick={() => props.goToStep(5)} className="circlee"></div>
        </div>
        <button
          className="btn btn-primary Next ps-5 pe-5 "
          onClick={props.nextStep}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default FormOne
