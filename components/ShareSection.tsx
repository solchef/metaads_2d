import {

  TelegramShareButton,
  TwitterShareButton,

} from 'react-share'

import {
  TelegramIcon,
  TwitterIcon
} from 'react-share'

export default function ShareSection() {
  return (
    <>
      {/* <FacebookShareButton
        url={'http://www.themilliondollarwebsite.com/'}
        quote={'THE MILLION DOLLAR WEBSITE!'}
        hashtag={'#hashtag'}
        title="THE MILLION DOLLAR WEBSITE! This is your chance to truly own for the first time a piece of digital history through blockchain technology. We divided the MetaBoard to 1 million pixels. "
        className="m-2"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton> */}

      <a href='https://www.instagram.com/TheMillionDollarWebsite/' className="mr-4 fs-12" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-instagram me-7 mt-2 mr-4" style={{fontSize:"30px", marginRight:"10px"}}></i>{' '}
      </a>
    
      <TwitterShareButton
        // title={'THE MILLION DOLLAR WEBSITE!'}
        title="THE MILLION DOLLAR WEBSITE! This is your chance to truly own for the first time a piece of digital history through blockchain technology. We divided the MetaBoard to 1 million pixels. "
        url={'http://www.themilliondollarwebsite.com/'}
        hashtags={['quadspace', 'themilliondollarwebsite']}
        className="m-2"
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <TelegramShareButton
        title="THE MILLION DOLLAR WEBSITE! This is your chance to truly own for the first time a piece of digital history through blockchain technology. We divided the MetaBoard to 1 million pixels. "
        url={'http://www.themilliondollarwebsite.com/'}
        className="m-2"
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </>
  )
}
