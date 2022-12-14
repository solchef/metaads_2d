import dynamic from 'next/dynamic'
// import MainPage from '../Views/MainPage'
// import { SliderSection } from '../Views/WebPages/SliderSection'
// import { InfoSection } from '../Views/WebPages/InfoSection'

// eslint-disable-next-line @typescript-eslint/ban-types
const MainPage = dynamic(() => import('../Views/MainPage'), {
  ssr: false,
})

const Home = () => {
  return <MainPage />
}

export default Home
