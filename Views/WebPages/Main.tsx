import {
  selectShowMenu,
  setShowMenu,
  setViewState,
} from '../../components/reducers/Settings'
import { useAppSelector, useAppDispatch } from '../../components/store/hooks'

const Main = () => {
  const dispatch = useAppDispatch()
  const showMenu = useAppSelector(selectShowMenu)

  return (
    <div className="offcanvas-body about pt-5   ">
      <div className="d-flex flex-column justify-content-end align-items-end pe-2">
        <i
          //     onClick={() => {
          // dispatch(setShowMenu(!showMenu))

          //       dispatch(setViewState(0))
          //     }}
          className="icon-menu bi bi-info-circle"
        ></i>
        <i className="icon-menu bi bi-twitter mt-5"></i>
        <i className="icon-menu bi bi-reddit mt-5" />
        <i className="icon-menu bi bi-instagram mt-5"></i>
      </div>
    </div>
  )
}

export default Main
