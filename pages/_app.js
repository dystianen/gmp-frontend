import '../styles/globals.scss';
import 'tailwindcss/tailwind.css';
import {StoreProvider} from "../components/StoreProvider";

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<StoreProvider {...pageProps}>
    <Component {...pageProps} />
  </StoreProvider>);
}

export default MyApp
