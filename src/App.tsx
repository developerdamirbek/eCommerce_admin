import { Route, Routes } from "react-router-dom"
import { MainLayout } from "./layout/main-layout"
import { Login } from "./pages/login/login"
import { routes } from "./routes/routes"

function App(): JSX.Element {

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