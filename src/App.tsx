import { Route, Routes } from 'react-router'
import { useColorStore } from './store/useColorStore'
import Draw from './pages/fileView/draw/Draw'
import Home from './pages/home/Home'
import { Auth } from './pages/auth/Auth'
import Login from './pages/auth/components/Login'
import Landing from './pages/home/components/Landing'
import Error404 from './pages/error/Error404'
import { ToastContainer, Slide } from 'react-toastify'
import { File } from './pages/fileView/File'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
      const { colors } = useColorStore();
  return (
    <>
      <div data-theme={colors.mode === 'dark' ? "dark" : "light"} className='bg-secondary-500 min-h-screen fixed w-full duration-300'>
        <Routes>
          <Route element={<Auth />}>
            <Route path='/auth/login' element={<Login />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />}>
              <Route path='/' element={<Landing />} />
            </Route>
            <Route path="/view/" element={<File />}>
              <Route path="/view/draw/:id" element={<Draw />} />
            </Route>
          </Route>

          <Route path='*' element={<Error404 />} />
        </Routes>
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        // limit={4}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        />
      </div>
    </>
  )
}

export default App