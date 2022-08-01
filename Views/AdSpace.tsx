import { Fragment, useEffect, useState } from 'react'
import useCanvas from '../hooks/useCanvas'
import PurchaseSection from './WebPages/PurchaseSection'
import axios from 'axios'
import {
  selectReloadPage,
  selectShowMenu,
  setBoughtedLandList,
} from '../components/reducers/Settings'
import { useAppDispatch, useAppSelector } from '../components/store/hooks'
// import 'react-minimap/dist/react-minimap.css'
import { MapView } from './WebPages/Map'

const AdSpace: React.FunctionComponent = () => {
  const reload = useAppSelector(selectReloadPage)
  const { cAreaRef, squreInfo } = useCanvas()
  const dispatch = useAppDispatch()

  useEffect(() => {
    axios.get('https://quadspace.io/api/info').then((data) => {
      dispatch(setBoughtedLandList(data.data.meta))
    })
  }, [])

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
              ref={cAreaRef}
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
              {reload ? <MapView /> : ''}
            </div>
          </div>
        </section>
      </Fragment>
      <PurchaseSection />
      {/* )} */}
    </>
  )
}

export default AdSpace
