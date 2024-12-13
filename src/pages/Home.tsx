import router from "@/shared/router";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    router.navigate('/users')
  })
  return <></>
}

export default Home;