import { Fragment, useCallback, useEffect, useState } from 'react'
import PurchaseSection from './WebPages/PurchaseSection'
import axios from 'axios'
import {
  selectReloadPage,
  selectShowMenu,
  setBoughtedLandList,
  setImage,
  setUpdateImage,
} from '../components/reducers/Settings'
import { LoadingManager, TextureLoader } from 'three'
import { useAppDispatch, useAppSelector } from '../components/store/hooks'
// import 'react-minimap/dist/react-minimap.css'
import { ErrorReload, MapView } from './WebPages/Map'
import { Loader } from '../utils/loader'

const AdSpace: React.FunctionComponent = () => {
  const reload = useAppSelector(selectReloadPage)
  const dispatch = useAppDispatch()
  const manager1 = new LoadingManager()
  const [texture1, setTexture1] = useState()
  const [texture2, setTexture2] = useState()
  const [texture3, setTexture3] = useState()
  const [load, setLoad] = useState(true)
  const [showError, setShowError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  // let loaded = false

  manager1.onStart = function () {
    setLoad(true)
  }

  // manager1.onLoad = function () {
  //   setLoad(false)
  // }

  // const getImage = async () => {}

  const getImage = useCallback(() => {
    setTimeout(async () => {
      try {
        await axios
          .get('https://api.quadspace.io/uploads/adspsdace.json')
          .then((data) => {
            // console.log(data.data)
            const texture = new TextureLoader().load(data.data)
            const texture2 = new TextureLoader(manager1).load(
              './highres-min.png'
            )
            const uploadImage = new TextureLoader().load('./defult-sq.png')
            const ownerLand = new TextureLoader().load('./defult-sq-yellow.png')
            dispatch(setImage(data.data))
            dispatch(setUpdateImage(uploadImage))
            setTexture2(texture2)
            setTexture1(texture)
            setTexture3(ownerLand)
            setLoad(false)
            setLoaded(true)
          })
      } catch (error) {
        setShowError(true)
      }
    }, 2000)
  }, [])

  // useEffect(() => {
  //   axios.get('https://quadspace.io/api/info').then((data) => {
  //     dispatch(setBoughtedLandList(data.data.meta))
  //   })
  // }, [])

  useEffect(() => {
    if (!loaded) getImage()
    console.log('hello')
  }, [getImage])

  const showMenu = useAppSelector(selectShowMenu)
  const [mouseDown, setMouseDown] = useState(false)
  const [mouseMove, setMouseMove] = useState(false)

  useEffect(() => {
    if (mouseDown && mouseMove)
      document.getElementById('container').style.cursor = 'grabbing'
    else document.getElementById('container').style.cursor = 'pointer'
  }, [mouseMove, mouseDown])

  return (
    <>
      <Fragment>
        <section id="grid-section">
          <div className={`grid-canvas  ${showMenu && ' '}`}>
            <div
              className="canvas-box  hoverable "
              id="container"
              onMouseDown={() => {
                setMouseDown(true)
              }}
              onMouseUp={() => {
                setMouseDown(false)
              }}
              onMouseMove={() => {
                setMouseMove(true)
              }}
            >
              {reload ? (
                load && !texture1 && !texture2 ? (
                  showError ? (
                    <ErrorReload />
                  ) : (
                    <Loader />
                  )
                ) : (
                  <MapView
                    minMap={false}
                    texture1={texture1}
                    texture2={texture2}
                    texture3={texture3}
                  />
                )
              ) : (
                ''
              )}
            </div>
          </div>
        </section>
      </Fragment>
      <PurchaseSection />
    </>
  )
}

export default AdSpace
