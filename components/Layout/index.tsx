import Header from './Header'
import Footer from './Footer'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Layout = ({ children }) =>  {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

