import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import AdSpace from '../Views/AdSpace'

// const AdSpace = dynamic(() => import('../Views/AdSpace'), {
//   ssr: true,
//   suspense: false,
// })
const Home = () => {
  return (
    <Suspense fallback={''}>
      <AdSpace />
    </Suspense>
  )
}

export default Home
