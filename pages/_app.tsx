import 'react-toastify/dist/ReactToastify.css'
import { Web3ContextProvider } from '../context'
import { Layout } from '../components'
import { Provider } from 'react-redux'
import { store } from '../components/store'

import './space.css'
import PurchaseSection from '../Views/WebPages/PurchaseSection'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Web3ContextProvider>
        <Layout>
          <Component {...pageProps} />
          <PurchaseSection />
        </Layout>
      </Web3ContextProvider>
    </Provider>
  )
}

export default MyApp
