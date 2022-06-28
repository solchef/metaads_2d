import dynamic from 'next/dynamic'
import { SliderSection } from '../Views/WebPages.tsx/SliderSection'
import { InfoSection } from '../Views/WebPages.tsx/InfoSection'
import { PurchaseSection } from '../Views/WebPages.tsx/PurchaseSection'

// eslint-disable-next-line @typescript-eslint/ban-types
const AdSpace = dynamic(() => import('../Views/AdSpace'), {
  ssr: false,
})

const Home = () => {
  return (
    <>
      <SliderSection />
      <AdSpace />
      <InfoSection />
      <PurchaseSection />
    </>
  )
}

export default Home
