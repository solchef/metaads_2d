/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'



export const About = () => {
  return (
    <div className="offcanvas-body about pt-5 p-0">
    <h3 className="mb-4">How does it work?</h3>
    <p>
      Let's make history together with the Worlds largest cooperative NFT
      project, where you can upload whatever image and URL to our 1 million
      NFT squares on the Ethereum network. Each square is 10 X 10px and sold
      for $1 only.
    </p>

    <div className="d-flex">
      <p>
        <h4>Explore (View Mode)</h4>
        Drag with your mouse (or fingers) to explore the grid.
      </p>
    </div>
    <div className="d-flex">
      <p>
        <h4>More Info (View Mode)</h4>
        Tap on the grid for info on a selected parcel or NFT.
      </p>
    </div>
    <div className="d-flex">
      <p>
        <h4>Purchase NFT (Buy Mode)</h4> Tap the Buy Now Button,
        where you can select the NFT size, name, image and URL.
      </p>
    </div>
    <div className="d-flex">
      <p>
        <h4>Edit your NFT (View Mode)</h4>
        Tap on an already owned parcel to edit the image, URL or name.
      </p>
    </div>

    <div className="d-flex">
      <p>
        <h4>Resell your NFT (Coming Soon)</h4> Soon, you will be
        able to select the "For Sale on Opensea" checkbox to mark your parcel
        block as For Sale, connecting you directly with the Opensea
        marketplace.
      </p>
    </div>
    <div>
      <p>
        Show off your NFTs, project creations and even your business to the
        entire world in the digital content space. <br />
        <br /> Share the site with your friends and followers and own a piece
        of crypto history! ❤️ For any help or question, please contact us via
        discord.
      </p>
    </div>
  </div>
  )
}
