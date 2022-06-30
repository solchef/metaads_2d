import '../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Web3ContextProvider } from '../context'
import { Layout } from '../components'
import 'sweetalert2/src/sweetalert2.scss'
import './space.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Web3ContextProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          hideProgressBar
          position="bottom-right"
          autoClose={2000}
        />
      </Layout>
    </Web3ContextProvider>
  )
}

export default MyApp
