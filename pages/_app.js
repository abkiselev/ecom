import '../styles/globals.css'
import Layout from '../components/Layout'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (   
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <NextNProgress color="rgba(139, 123, 255, 1)" startPosition={0.7} options={{ showSpinner: false }}/>
    </> 
  )
}

export default MyApp
