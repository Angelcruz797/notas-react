import { Route, Routes } from 'react-router'
import { useColor } from './useContext/colorMode/ColorContext'
import Draw from './pages/files/draw/Draw'
import Home from './pages/home/Home'
import Landing from './pages/home/components/Landing'
import Error404 from './pages/error/Error404'
import { ToastContainer, Slide } from 'react-toastify'

function App() {
      const { colors } = useColor();
  return (
    <>
      <div data-theme={colors.mode === 'dark' ? "dark" : "light"} className='bg-secondary-500 min-h-screen fixed w-full duration-300'>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path='/' element={<Home />}>
            <Route path='/' element={<Landing />} />
            <Route path="/draw/:id" element={<Draw />} />
            <Route path='/*' element={<Error404 />} />
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