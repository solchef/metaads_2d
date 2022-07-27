/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import { useEffect, useState } from 'react'
import { selectLand, setLand } from '../../components/reducers/Settings'
import { useAppDispatch, useAppSelector } from '../../components/store/hooks'
import { updateX, updateY } from './Map'

export const Section = ({ setName, setUrl, setMintImage, handleSubmit }) => {
  const landData = useAppSelector(selectLand)
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = useState('Upload Image')
  useEffect(() => {}, [])
  const handleChangeImage = (e) => {
    if (e.target.files.length && e.target.files[0].size / 1024 / 1024 <= 5) {
      setSelectedFile(e.target.files[0].name)
      setMintImage(e.target.files)
    } else if (
      e.target.files.length &&
      e.target.files[0].size / 1024 / 1024 > 5
    )
      setSelectedFile('Max Size 5 MB')
    else setSelectedFile('Upload Image')
  }
  return (
    <div className="offcanvas-body image-info pt-4 pb-5 p-0 ">
      <h3> SQ.NFT SIZE</h3>
      <div className="mt-2">
        <form>
          <div className="input-group hoverable mb-4">
            <span className="input-group-text ">
              <i className="bi-border" />
            </span>
            <input
              type="number"
              min="1"
              max="1000000"
              defaultValue={1}
              aria-label="W"
              placeholder="Width"
              className="form-control"
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
            />
            <input
              type="number"
              aria-label="H"
              min="1"
              max="1000000"
              defaultValue={1}
              placeholder="Hight"
              className="form-control value="
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
            />
          </div>
        </form>
      </div>
      <p>
        Select your NFI sq. Size (1 sq=10x10px) & Drag it where you want it.
      </p>
      <hr />
      <h3> Sq.NFT DATA</h3>

      <div className="mt-2">
        <form>
          <div className="input-group hoverable mb-4">
            <span className="input-group-text ">
              <i className="bi bi-geo-alt"></i>
            </span>
            <input
              type="text"
              placeholder="Sq. NFT Name"
              className="form-control"
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div>
        </form>

        <form>
          <div className="input-group hoverable mb-4">
            <span className="input-group-text ">
              <i className="bi bi-link"></i>
            </span>
            <input
              type="url"
              placeholder="https://"
              className="form-control"
              onChange={(event) => {
                // console.log(event.target.value)
                setUrl(event.target.value)
              }}
            />
          </div>
        </form>

        <form
          style={{ cursor: 'pointer' }}
          onClick={() => document.getElementById('ghthth').click()}
        >
          <div className="input-group hoverable mb-3">
            <span className="input-group-text ">
              <i className="bi bi-upload"></i>
            </span>

            <input
              style={{
                borderBottomRightRadius: '0.25rem',
                borderTopRightRadius: '0.25rem',
                cursor: 'pointer',
                color: 'transparent',
              }}
              placeholder={selectedFile}
              className="form-control"
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChangeImage}
              id="ghthth"
              style={{ display: 'none' }}
            />
          </div>
        </form>
        <form>
          <div className="input-group hoverable mb-4">
            <h3 className="ps-0 ">Description :</h3>

            <textarea
              style={{ borderRadius: '0.25rem' }}
              placeholder="Description"
              className="p-2 mt-2"
              id="w3review"
              name="w3review"
              rows={4}
              cols={50}
            ></textarea>
          </div>
        </form>
      </div>
      <p className="mb-3">
        Image Size ({landData.h}0 X {landData.w}0px) <br />
        Max Size: 5MB | File Type: JPG,PNG
      </p>

      <a
        className="btn-primary hoverable d-block mx-3 mt-3 btn-md "
        onClick={handleSubmit}
        href="#"
      >
        <i className="bi-wallet me-2"></i> PURCHASE PLOT
      </a>
      <div className="d-flex mt-3 flex-wrap">
        <span className=" me-2 mt-2">
          <img src="assets/images/square_icon.png" width="16px" /> :{' '}
          {landData.h * landData.w}
        </span>
        <span className=" me-2 mt-2">
          <i className="bi bi-border " />
          &nbsp;: ( {landData.h + ' X ' + landData.w} )
        </span>
        <span className="me-2 mt-2">
          <i className="bi bi-geo-alt" /> :
          {landData.x + 'X, ' + landData.y + 'Y'}
        </span>
        <span className="me-2 mt-2 text-nowrap">
          {' '}
          <b>
            <i className="bi bi-tag" /> :{' '}
          </b>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            width="12px"
            version="1.1"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 784.37 1277.39"
          >
            <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer" />
              <g id="_1421394342400">
                <g>
                  <polygon
                    fill="#343434"
                    fillRule="nonzero"
                    points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                  />
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                  />
                  <polygon
                    fill="#3C3C3B"
                    fillRule="nonzero"
                    points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                  />
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,1277.38 392.07,956.52 -0,724.89 "
                  />
                  <polygon
                    fill="#141414"
                    fillRule="nonzero"
                    points="392.07,882.29 784.13,650.54 392.07,472.33 "
                  />
                  <polygon
                    fill="#393939"
                    fillRule="nonzero"
                    points="0,650.54 392.07,882.29 392.07,472.33 "
                  />
                </g>
              </g>
            </g>
          </svg>
          &nbsp;{landData.h * landData.w * 0.0942} ( $ {landData.h * landData.w}{' '}
          )
        </span>
      </div>
    </div>
  )
}
