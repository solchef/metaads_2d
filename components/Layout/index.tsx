import Header from './Header'
import Footer from './Footer'
import { SpaceDetails } from '../../Views/WebPages.tsx/SpaceDetails'
import { PurchaseSection } from '../../Views/WebPages.tsx/PurchaseSection'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <PurchaseSection />
      <Footer />
    </>
  )
}
