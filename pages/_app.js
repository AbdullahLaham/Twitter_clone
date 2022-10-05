import '../styles/globals.css'
import {StoreProvider} from '../store'
import { RecoilRoot } from 'recoil'
function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </StoreProvider>
  )
}

export default MyApp
