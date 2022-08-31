import dynamic from 'next/dynamic'
import { Suspense } from 'react'
// import { SliderSection } from '../Views/WebPages/SliderSection'
// import { InfoSection } from '../Views/WebPages/InfoSection'

// eslint-disable-next-line @typescript-eslint/ban-types

const AdSpace = dynamic(() => import('../Views/AdSpace'), {
  ssr: false,
  suspense: false,
})
const Home = () => {
  return (
    <Suspense fallback={''}>
      <AdSpace />
    </Suspense>
  )
}

export default Home
