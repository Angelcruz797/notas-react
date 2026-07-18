import { Route, Routes } from 'react-router'
import { useColorStore } from './store/useColorStore'
import Draw from './pages/fileView/draw/Draw'
import Home from './pages/home/Home'
import Landing from './pages/home/components/Landing'
import Error404 from './pages/error/Error404'
import { ToastContainer, Slide } from 'react-toastify'
import { File } from './pages/fileView/File'

function App() {
      const { colors } = useColorStore();
  return (
    <>
      <div data-theme={colors.mode === 'dark' ? "dark" : "light"} className='bg-secondary-500 min-h-screen fixed w-full duration-300'>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path='/' element={<Home />}>
            <Route path='/' element={<Landing />} />
            <Route path='/*' element={<Error404 />} />
          </Route>
          <Route path="/view/" element={<File />}>
            <Route path="/view/draw/:id" element={<Draw />} />
          </Route>
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