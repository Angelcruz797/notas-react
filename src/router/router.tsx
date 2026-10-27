import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router'
import App from '../App'
import Draw from '../pages/fileView/draw/Draw'
import Home from '../pages/home/Home'
import { Auth } from '../pages/auth/Auth'
import Login from '../pages/auth/components/Login'
import Landing from '../pages/home/components/Landing'
import Error404 from '../pages/error/Error404'
import { File } from '../pages/fileView/File'
import ProtectedRoute from '../components/ProtectedRoute'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route element={<Auth />}>
        <Route path="/auth/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />}>
          <Route index element={<Landing />} />
        </Route>
        <Route path="/view" element={<File />}>
          <Route path="draw/:id" element={<Draw />} />
        </Route>
      </Route>

      <Route path="*" element={<Error404 />} />
    </Route>
  )
)