import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from 'react-share'

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from 'react-share'

export default function ShareSection() {
  return (
    <>
      <FacebookShareButton
        url={'http://www.themilliondollarwebsite.com/'}
        quote={'THE MILLION DOLLAR WEBSITE!'}
        hashtag={'#hashtag'}
        title={'THE MILLION DOLLAR WEBSITE!'}
        // description="THE MILLION DOLLAR WEBSITE!"
        className="m-2"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        title={'THE MILLION DOLLAR WEBSITE!'}
        url={'http://www.themilliondollarwebsite.com/'}
        hashtags={['quadspace', 'themilliondollarwebsite']}
        className="m-2"
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <TelegramShareButton
        title={'THE MILLION DOLLAR WEBSITE!'}
        url={'http://www.themilliondollarwebsite.com/'}
        className="m-2"
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </>
  )
}
