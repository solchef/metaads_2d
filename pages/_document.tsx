/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable @next/next/no-css-tags */
// pages/_document.js
import { Html, Head as MainHead, Main, NextScript } from 'next/document'
// import Head from 'next/Head'
// import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <MainHead>
        <div>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Quadspace metaverse allows businesses, meta realtors and individual NFT collectors to acquire
    Quad for $1. These estate can be used as space, 3d retail space or simply a place for you and your meta
    buddies to kick it!"
          />
          <meta name="author" />

          <title>QUADSPACE.IO</title>
          {/* Favicon*/}
          <link rel="icon" type="image/png" href="/assets/favicon.png" />
          {/* Core theme CSS (includes Bootstrap)*/}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link href="assets/css/style.css" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
            integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          
        </div>
      </MainHead>
      <body>
        <Main />
        <NextScript />
    
      </body>
    </Html>
  )
}
