import {useRouter} from "next/router";
import {useStore} from "../components/StoreProvider";
import {TokenUtil} from "../utils/token";
import {useEffect} from "react";

export default function Home() {
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    console.log('masuk')
    if (typeof window !== 'undefined') {
      if (!store.authentication.isLoggedIn) {
        router.push('/login');
      } else {
        router.push('/investment_package');
      }
    }
  }, [])

  return (
      <div></div>
  )
}
