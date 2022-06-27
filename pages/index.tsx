// import type { NextPage } from 'next'
// import { Web3Address, Web3Balance, Web3Network } from '../components'

import dynamic from 'next/dynamic'
import { SliderSection } from '../Views/WebPages.tsx/SliderSection'
import { InfoSection } from '../Views/WebPages.tsx/InfoSection'
// import { AdSpace } from '../Views/AdSpace'

// eslint-disable-next-line @typescript-eslint/ban-types
const AdSpace = dynamic(() => import('../Views/AdSpace'), {
  ssr: false,
})

const Home = () => {
  return (
    // <div className="flex h-screen flex-col">
    //   <main className="grow p-8 text-center">
    //     <h1 className="pb-8 text-4xl font-bold">Home Page</h1>
    //     <Web3Address />
    //     <Web3Network />
    //     <Web3Balance />
    //   </main>

    //   <AdSpace />
    // </div>
    <>
      <SliderSection />
      <AdSpace />
      <InfoSection />
    </>
  )
}

export default Home
