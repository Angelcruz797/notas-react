import { Route, Routes } from 'react-router'
import { useColor } from './useContext/colorMode/ColorContext'
import Draw from './pages/draw/Draw'
import Home from './pages/home/Home'
import Landing from './pages/home/components/Landing'
import Error404 from './pages/error/Error404'

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
      </div>
    </>
  )
}

export default App