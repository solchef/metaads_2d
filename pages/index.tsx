import dynamic from 'next/dynamic'
import AdSpace from '../Views/AdSpace'
// import { SliderSection } from '../Views/WebPages/SliderSection'
// import { InfoSection } from '../Views/WebPages/InfoSection'

// eslint-disable-next-line @typescript-eslint/ban-types
// const AdSpace = dynamic(() => import('../Views/AdSpace'), {
//   ssr: false,
// })

const Home = () => {
  return <AdSpace />
}

export default Home
