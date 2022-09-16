import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton
  } from 'react-share'
  import { FacebookIcon, TelegramIcon, TwitterIcon , LinkedinIcon,WhatsappIcon,} from 'react-share';
  import React , {useEffect, useState} from 'react'
import { useWeb3Context } from '../context'


export function ShareCustom(props) {
  
  return (<> 
  
  <FacebookShareButton
                  url={props.referral}
                  quote={'THE MILLION DOLLAR WEBSITE!'}
                  hashtag={'#hashtag'}
                  title="THE MILLION DOLLAR WEBSITE! This is your chance to truly own for the first time a piece of digital history through blockchain technology. Click on the below link to avail the referral benefits"
                  className="m-2"
                >
                  <FacebookIcon size={25} round />
                </FacebookShareButton>

                <TwitterShareButton
                  // title={'THE MILLION DOLLAR WEBSITE!'}
                  title="THE MILLION DOLLAR WEBSITE! This is your chance to truly own for the first time a piece of digital history through blockchain technology. Click on the below link to avail the referral benefits"
                  url={props.referral}
                  hashtags={['quadspace', 'themilliondollarwebsite']}
                  className="m-2"
                >
                  <TwitterIcon size={25} round />
                </TwitterShareButton>

                <TelegramShareButton
                  title="THE MILLION DOLLAR WEBSITE! This is your chance to truly own for the first time a piece of digital history through blockchain technology. Click on the below link to avail the referral benefits"
                  url={props.referral}
                  className="m-2"
                >
                  <TelegramIcon size={25} round />
                </TelegramShareButton>
                <LinkedinShareButton
                title="THE MILLION DOLLAR WEBSITE! This is your chance to truly own for the first time a piece of digital history through blockchain technology. Click on the below link to avail the referral benefits"
                  url={props.referral}
                  className="m-2"
                >
                    <LinkedinIcon size={25} round />
                </LinkedinShareButton>
                <WhatsappShareButton
                title="THE MILLION DOLLAR WEBSITE! This is your chance to truly own for the first time a piece of digital history through blockchain technology. Click on the below link to avail the referral benefits"
                url={props.referral}
                className="m-2"
                >
                    <WhatsappIcon size={25} round />
                </WhatsappShareButton>
                
                {/*<a href="#" className="nav-link" data-toggle="modal">
												<i className="fa-solid fa-share-from-square"></i></a> */}
  
  </>)
}
