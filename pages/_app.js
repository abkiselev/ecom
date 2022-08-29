import '../styles/globals.css'
import Layout from '../components/Layout'
import NextNProgress from "nextjs-progressbar";
import { store } from '../redux/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  return (   
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
      <NextNProgress color="rgba(139, 123, 255, 1)" startPosition={0.7} options={{ showSpinner: false }}/>
    </> 
  )
}

export default MyApp
