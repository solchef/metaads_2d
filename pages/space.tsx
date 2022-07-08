import dynamic from 'next/dynamic'
import { SliderSection } from '../Views/WebPages/SliderSection'
import { InfoSection } from '../Views/WebPages/InfoSection'

// eslint-disable-next-line @typescript-eslint/ban-types
const Space = dynamic(() => import('../Views/Space'), {
  ssr: false,
})

const Home = () => {
  return (
    <>
      <Space />
    </>
  )
}

export default Home
