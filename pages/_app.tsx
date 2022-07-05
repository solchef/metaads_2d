import '../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Web3ContextProvider } from '../context'
import { Layout } from '../components'
import { Provider } from 'react-redux'
import { store } from '../components/store'
import 'sweetalert2/src/sweetalert2.scss'
import '@sweetalert2/themes/dark/dark.scss'

import './space.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default MyApp
