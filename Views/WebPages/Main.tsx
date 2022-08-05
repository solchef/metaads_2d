import {
  selectShowMenu,
  setShowMenu,
  setViewState,
} from '../../components/reducers/Settings'
import { useAppSelector, useAppDispatch } from '../../components/store/hooks'
import { QuadSpaceContract } from '../../utils/constants'

const Main = () => {
  const dispatch = useAppDispatch()
  const showMenu = useAppSelector(selectShowMenu)

  return (
    <div className="offcanvas-body about ">
      <div
        className={`d-flex flex-column mt-0 justify-content-end ${
          showMenu ? 'align-items-start ' : 'align-items-end '
        } pe-2`}
      >
        <i
          onClick={() => {
            dispatch(setShowMenu(true))

            dispatch(setViewState(0))
          }}
          className="icon-menu bi bi-info-circle"
          custom-attribute="Info"
        ></i>

        <i
          onClick={() => {
            dispatch(setShowMenu(true))

            dispatch(setViewState(7))
          }}
          className="icon-menu bi bi-map mt-3"
          custom-attribute="Roadmap"
        ></i>

       <a
          target="_blank"
          className="mt-3  pl-2"
          href={'https://opensea.io/' + QuadSpaceContract}
        >
         
          <i custom-attribute="MarketPlace" className='icon-menu' >

          <img
            className="ml-2 "
            height="30"
            width="30"
            src="https://opensea.io/static/images/logos/opensea.svg"
          />
          
          </i>
        </a>
        
        <a
          target="_blank"
          className="mt-3"
          href={'https://t.me/TheMillionDollarWebsite'}
        >
          <i
            className="icon-menu bi bi-telegram mt-3"
            custom-attribute="Telegram"
          ></i>
        </a>
        <a
          target="_blank"
          className="mt-3"
          href={'https://twitter.com/themillliondillarwebsite'}
        >
          <i
            className="icon-menu bi bi-twitter mt-3"
            custom-attribute="Twitter"
          ></i>
        </a>
        {/* <a
          target="_blank"
          className="mt-3"
          href={'https://twitter.com/themilliondollarwebsite'}
        >
          <i
            className="icon-menu bi bi-twitter mt-3"
            custom-attribute="Twitter"
          ></i>
        </a>


        <a
          target="_blank"
          className="mt-3"
          href={'https://instagram.com/themilliondollarwebsite'}
        >
          <i
            className="icon-menu bi bi-instagram mt-3"
            custom-attribute="Instagram"
          ></i>
        </a> */}
      </div>
    </div>
  )
}

export default Main
