import '../styles/globals.css';
import Layout from '../components/Layout';
import NextNProgress from "nextjs-progressbar";
import store from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (   
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
      <NextNProgress color="rgba(139, 123, 255, 1)" startPosition={0.7} options={{ showSpinner: false }}/>
    </> 
  )
}

export default MyApp
