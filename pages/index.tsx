import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const AdSpace = dynamic(() => import('../Views/AdSpace'), {
  // ssr: false,
  suspense: true,
})
const Home = () => {
  return (
    <Suspense fallback={''}>
      <AdSpace />
    </Suspense>
  )
}

export default Home
