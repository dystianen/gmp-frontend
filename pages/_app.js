import '../styles/globals.scss';
import 'tailwindcss/tailwind.css';
import {StoreProvider} from "../components/StoreProvider";
import {useEffect} from "react";
import {useRouter} from "next/router";

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem('access_token')) {
        router.push('/login')
      }
    }
  }, [])

  return getLayout(<StoreProvider {...pageProps}>
    <Component {...pageProps} />
  </StoreProvider>);
}

export default MyApp
