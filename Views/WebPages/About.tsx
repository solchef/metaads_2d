/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import ShareSection from '../../components/ShareSection'

export const About = () => {
  return (
    <div
      style={{ paddingLeft: 0 }}
      className="offcanvas-body about  pl-0 ml-0 pr-3  pb-5 w-100"
      id="about"
    >
      <div className="m-2 p-3">
        <div className="d-flex">
          <img
            src="assets/images/million-dollar-logo.svg"
            height={30}
            width={30}
          />
          <h3 className="mb-4"> The Million Dollar Website!</h3>
        </div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <h4 className="pb-2 ps-3">
                    {' '}
                    TMDW is the homepage billboard of the Metaverse!
                  </h4>
                  <p>Check out what's hot by scrolling and selecting tokens.</p>
                  {/* 
                  <video
                    width={'100%'}
                    autoPlay={true}
                    className="pb-2 ps-3"
                    loop={true}
                    playsInline={true}
                    src="https://milliondollartokenpage.com/assets/pixel-block.mp4"
                  ></video> */}
                  <img
                    className="pb-2 ps-3"
                    src="assets/images/step1.png"
                    width={'100%'}
                  />

                  <p>Mint new tokens by selecting ones for sale.</p>
                  {/* <video
                    width={'100%'}
                    className="pb-2 ps-3"
                    autoPlay={true}
                    loop={true}
                    playsInline={true}
                    src="https://milliondollartokenpage.com/assets/minting-block.mp4"
                  >
                  </video> */}
                  <img
                    className="pb-2 ps-3"
                    src="assets/images/step2.png"
                    width={'100%'}
                  />
                  <p>Update tokens to show off what you've got!</p>
                  {/* <video
                    width={'100%'}
                    className="pb-2 ps-3"
                    autoPlay={true}
                    loop={true}
                    playsInline={true}
                    src="https://milliondollartokenpage.com/assets/update-block.mp4"
                  >
                    <br />
                  </video> */}

                  <img
                    className="pb-2 ps-3"
                    src="assets/images/step3.png"
                    width={'100%'}
                  />
                  <p>
                    It's that simple! Join us now to own a piece of crypto
                    history! ❤️
                  </p>
                </div>

                <div>
                  <h4 className="pb-2 ps-3"> About Us</h4>
                  <p>
                    We created the Meta-Board the online version of your
                    traditional billboard. <br /> <br />
                    <a
                      target="_blank"
                      href="https://www.TheMillionDollarWebsite.com"
                    >
                      The Million Dollar Website
                    </a>{' '}
                    leads to the domain{' '}
                    <a target="_blank" href="https://www.quadspace.io">
                      www.quadspace.io
                    </a>
                    .Because Quadspace powers the Metaverse component of this
                    project.
                    <br /> <br />
                    Each pixel on the Meta-Board will also come with 1 parcel of
                    land in the Quadspace metaverse as a BONUS!
                  </p>
                </div>
                <div>
                  <h4 className="pb-2 ps-3 mt-4">
                    {' '}
                    What’s so special about The Million Dollar Website?{' '}
                  </h4>
                  <p>
                    This is your chance to truly own for the first time a piece
                    of digital history through blockchain technology. We divided
                    the MetaBoard to 1 million pixels.
                    <br /> <br />
                    Each pixel you own tied to the ownership or holder of the
                    TMDW nft will grant you access to any image, input a URL
                    domain and even name the specific pixels.
                    <br /> <br />
                    Since we are building towards a fully decentralized system
                    everything in uncensored we are for the liberty of the
                    people. You can post about yourself, your business, a crypto
                    project, you’re nft.
                    <br /> <br />
                    Anything you like! Through the partnership with Quadspace
                    each pixel will come with it’s own meta land. Here you can
                    get creative and design anything you like.
                    <br /> <br />
                    So that when people click on your pixel it gives them the
                    option to jump into your meta space!
                  </p>
                </div>
                <div>
                  <h4 className="pb-2 ms-4 mt-4">
                    {' '}
                    Purchase Price ONLY $1 per pixel{' '}
                  </h4>
                  <p className="w-100">
                    When it was created in 2005, milliondollarhomepage.com{' '}
                    <a
                      target="_blank"
                      href="https://www.TheMillionDollarWebsite.com"
                    >
                      The Million Dollar Website
                    </a>
                    acted as an advertising board on the internet, selling one
                    million pixels on the web for $1 each.
                    <br /> <br />
                    Back then the web was still very static and there were no
                    digital native forms of transacting value so when pixels
                    were bought and set, they could no longer be re-sold or
                    updated.
                    <br /> <br />
                    Today the internet is a lot more fun to play with and
                    cryptocurrencies like Bitcoin
                    <a target="_blank" href="https://bitcoin.org/en/faq">
                      Bitcoin
                    </a>
                    and{' '}
                    <a
                      target="_blank"
                      href="https://ethereum.org/en/what-is-ethereum"
                    >
                      {' '}
                      Ethereum
                    </a>{' '}
                    have ushered in a whole new age known as{' '}
                    <a
                      target="_blank"
                      href="https://ethereum.org/en/developers/docs/web2-vs-web3/"
                    >
                      Web3
                    </a>{' '}
                    where digitally native money and assets, represented by
                    <a
                      target="_blank"
                      href="https://blog.coinbase.com/a-beginners-guide-to-ethereum-tokens-fbd5611fe30b"
                    >
                      tokens
                    </a>{' '}
                    and{' '}
                    <a
                      target="_blank"
                      href="https://opensea.io/blog/guides/non-fungible-tokens"
                    >
                      NFTs
                    </a>{' '}
                    , can be transacted openly{' '}
                    <a
                      target="_blank"
                      href="https://www.investopedia.com/terms/p/peertopeer-p2p-service.asp"
                    >
                      peer-to-peer
                    </a>{' '}
                    across the internet.
                    <br /> <br />
                    TMDW infuses these modern innovations into the original idea
                    to build a much more fun and functional virtual space to
                    share content on anything you like!{' '}
                  </p>
                </div>
                <div>
                  <h4 className="pb-2 ms-4 mt-4"> How does it work? </h4>
                  <p>
                    TMDW has 1,000,000 blocks on a 1000 x 1000 2D grid
                    represented by 1,000,000 NFTs on the Ethereum network. Each
                    NFT can either be minted or bought second-hand from someone
                    who's already minted it.
                    <br /> <br />
                    Once owned, you can put any image within that block, along
                    with a title, description and url to another website! To
                    mint new blocks and make use of Ethereum and Web3
                    technologies you need to have a Web3 enabled plugin like{' '}
                    <a target="_blank" href="https://metamask.io">
                      Metamask
                    </a>{' '}
                    or browser like{' '}
                    <a target="_blank" href="https://brave.com/">
                      Brave
                    </a>{' '}
                    , which has a native crypto wallet, and to have some
                    cryptocurrency in your wallet.
                    <br /> <br />
                    You'll need{' '}
                    <a target="_blank" href="https://ethereum.org/en/eth/">
                      Ether
                    </a>{' '}
                    in your wallet to pay for the{' '}
                    <a
                      target="_blank"
                      href="https://postergrind.com/how-much-does-it-cost-to-mint-an-nft/"
                    >
                      minting fees
                    </a>{' '}
                    of the NFT collection and{' '}
                    <a
                      target="_blank"
                      href="https://www.coindesk.com/learn/ethereum-101/ethereum-mining-works"
                    >
                      mining fees
                    </a>{' '}
                    of the network. Simply select "mint" in the side-panel for a
                    block that's not yet been minted and confirm the
                    transaction.
                    <br /> <br />
                    Once you own the NFT that represents a block you can then
                    change the image, title, description and url by clicking it
                    and selecting "update token" on the side-panel.
                    <br /> <br />
                    By connecting your wallet the site will recognizes that you
                    own that NFT and allow you to update the content associated
                    with that block.
                    <br /> <br />
                    And its a simple as that, buy blocks as NFTs then share your
                    NFTs, projects and creations in this digital content space
                    with the entire world!
                  </p>
                </div>
                <p className="mt-4 text-nowrap"></p>
                <div className="text-center mt-2">
                  <p> Share with your friends and followers</p>
                  <div className="d-flex mt-2 justify-content-center">
                    <ShareSection />
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}
