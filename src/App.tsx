import { Route, Routes, useLocation } from "react-router-dom"
import { MainLayout } from "./layout/main-layout"
import { Login } from "./pages/login/login"
import { routes } from "./routes/routes"
// import Cookies from "js-cookie"
// import { useEffect } from "react"

function App(): JSX.Element {

  // const token = Cookies.get("token")
  // const location = useLocation()

  
  // useEffect(() => {
  //   if(!token && location.pathname !== "/"){
  //     location.pathname = "/"
  //   }
  // }, [location])

  return (
    <>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
          {routes.map(({ component: Component, path, id }) => (
            <Route path={path} key={id} index={!path ? true : false} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </>
  )
}
``
export default App