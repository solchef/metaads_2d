/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import { useEffect, useState } from 'react'
import {
  getMintingstatus,
  selectLand,
  setLand,
  setUpdateImage,
} from '../../components/reducers/Settings'
import { useAppDispatch, useAppSelector } from '../../components/store/hooks'
// import { updateX, updateY } from './Map'

export const CustomizeSection = ({
  setName,
  setUrl,
  setMintImage,
  setDescription,
  handleSubmit,
}) => {
  const landData = useAppSelector(selectLand)
  const dispatch = useAppDispatch()
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState('Upload Image')
  useEffect(() => {}, [])

  const mintingDetail = useAppSelector(getMintingstatus)
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
  const handleChangeImage = (e) => {
    if (e.target.files.length && e.target.files[0].size / 1024 / 1024 <= 5) {
      setSelectedFile(e.target.files[0].name)
      setMintImage(e.target.files)
      setPreview(URL.createObjectURL(e.target.files[0]))
      getBase64(e.target.files[0]).then((data) => {
        console.log(data)
        dispatch(setUpdateImage(data + ''))
      })
    } else if (
      e.target.files.length &&
      e.target.files[0].size / 1024 / 1024 > 5
    )
      setSelectedFile('Max Size 5 MB')
    else setSelectedFile(e.target.files[0].name)
  }

  const checkIfValid = () => {
    // let mintable = []
    // let unmintable = []
    // let isFound
    // let squrePos = landData.y * 1000 + landData.x
    // for (let quad = squrePos; quad < squrePos + landData.w; quad++) {
    //   for (let i = 0; i < landData.h; i++) {
    //     isFound = verifyIsAllowed(quad + 1)
    //     if (!isFound) {
    //       mintable.push(quad + i * 1000)
    //     } else {
    //       unmintable.push(quad + i * 1000)
    //     }
    //     // console.log(isFound)
    //   }
    // }
    // setUnmintableIds(unmintable)
  }

  return (
    <div className="offcanvas-body image-info mt-4  pb-5 p-0 ">
      <h3>Customize Your Squres</h3>
      <p>Set width and Height to customize</p>
      <div className="mt-2">
        <form>
          <div className="input-group hoverable mb-4">
            <span className="input-group-text ">
              <i className="bi-border" />
            </span>
            <input
              type="number"
              min={1}
              max={1000}
              step={1}
              defaultValue={1}
              aria-label="W"
              pattern="^(.*[^0-9]|)(1000|[1-9]\d{0,2})([^0-9].*|)$"
              placeholder="Width"
              value={landData.h}
              className="form-control"
              onChange={(e) => {
                checkIfValid()
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
              max="1000"
              pattern="^(.*[^0-9]|)(1000|[1-9]\d{0,2})([^0-9].*|)$"
              step={1}
              defaultValue={1}
              placeholder="Hight"
              value={landData.w}
              className="form-control value="
              onChange={(e) => {
                dispatch(
                  setLand({
                    x: landData.x,
                    y: landData.y,
                    w: parseInt(e.target.value),
                    h: landData.h,
                  })
                ),
                  checkIfValid()
              }}
            />
          </div>
        </form>
      </div>

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
              placeholder="Redirect Link"
              className="form-control"
              onChange={(event) => {
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

          {preview ? (
            <div className="text-center mb-2">
              <img src={preview} height={100} width={100} />
            </div>
          ) : (
            <></>
          )}
        </form>
        <form>
          <div className="input-group hoverable mb-3">
            <span className="input-group-text ">
              <i className="bi bi-file-text"></i>
            </span>

            <textarea
              // style={{ borderRadius: '0.25rem' }}
              placeholder="Description"
              className="p-2  form-control"
              id="w3review"
              onChange={(event) => {
                setDescription(event.target.value)
              }}
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
      <div className="text-center">
        <h4>{mintingDetail}</h4>
      </div>

      <button
        className="btn-primary hoverable d-block mx-3 mt-3 btn-md col-11"
        onClick={handleSubmit}
        disabled={mintingDetail !== null}
      >
        <i className="bi-wallet me-2"></i> UPLOAD INFO
      </button>
      <div className="d-flex mt-3 flex-wrap justify-content-between">
        <span className="me-2 mt-2">
          <i className="bi bi-geo-alt" />: &nbsp;
          {landData.x + 'X, ' + landData.y + 'Y'}
        </span>
        <span className=" me-2 mt-2">
          <i className="bi bi-border " />
          &nbsp;: ( {landData.h + ' X ' + landData.w} )
        </span>
      </div>
    </div>
  )
}
