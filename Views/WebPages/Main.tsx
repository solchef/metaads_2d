import { selectShowMenu, setShowMenu, setViewState } from "../../components/reducers/Settings"
import { useAppSelector, useAppDispatch } from '../../components/store/hooks'

const Main = () => {
  const dispatch = useAppDispatch()
  const showMenu = useAppSelector(selectShowMenu)

  return (
    <div className="offcanvas-body about pt-5   ">
      <div className={`d-flex flex-column justify-content-end ${showMenu ? 'align-items-start ' :'align-items-end '} pe-2`}>
        <i
          onClick={() => {
            dispatch(setShowMenu(true))

            dispatch(setViewState(0))
          }}
          className="icon-menu bi bi-info-circle" custom-attribute="Info"></i>
        <i className="icon-menu bi bi-twitter mt-3" custom-attribute="Twitter" ></i>
        <i className="icon-menu bi bi-map mt-3" custom-attribute="Roadmap" ></i>
        <i className="icon-menu bi bi-cart mt-3" custom-attribute="Marketplace" ></i>
        <i className="icon-menu bi bi-reddit mt-3"  custom-attribute="Reddit" ></i>
        <i className="icon-menu bi bi-instagram mt-3" custom-attribute="Instagram" ></i>
      </div>
    </div>



  )

}

export default Main

