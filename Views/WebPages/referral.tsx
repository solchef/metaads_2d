/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import { Fragment, useEffect, useState } from 'react'
import ShareSection from '../../components/ShareSection'
import { useWeb3Context } from '../../context'
import { Tabs } from '../../components/tab';

export const Referral = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <div className="card-body m-3">
            <h5 className="text-primary">
              <i>REFFERRALS</i>
            </h5>
                <Tabs />
               
          </div>
        </div>
        <hr style={{marginTop:'100px'}} />

<div className="col-12">
<div  className="card-body  m-3 mt-0">
  <p>
    The Quadspace referral system will incentivize users to invite others
    by locking TMDW Token, to generate a referral link. When someone uses
    the link, initial costs for joining the network will be covered by the
    referrer. Ten percent of transaction fees from subsequent transactions
    by members who joined Quadspace with a referral link will go to the
    referrer. More information on using the referral system is available
    here.
  </p>

  <p>
    All Quadspace users will be able to mint NFTs, send them to others,
    add them to their wallets and generate referral links beginning today.
  </p>

  <p>
    The referral system motivates users to involve new users in the
    Quadspace. When you invite people, you are the referrer. As a
    referrer, you’ll get 10% of your referral’s network fees. One referrer
    can have as many referrals as they like. And one referral can have
    only one referrer. The referral graph is stored on-chain, so users
    have to pay network fees for setting the link between referral and
    referrer. The referrer bonds some ETH, and when a referral joins the
    network using the referrer’s code, the bond amount is reduced in order
    to pay fees.
  </p>

  <p>
    It's that simple! Join us now to own a piece of crypto history! ❤️
  </p>
</div>
</div>
      </div>
    </Fragment>
  )
}
