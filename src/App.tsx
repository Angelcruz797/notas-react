import { Outlet } from 'react-router'
import { useColorStore } from './store/useColorStore'
import { ToastContainer, Slide } from 'react-toastify'

function App() {
      const { colors } = useColorStore();
  return (
    <>
      <div data-theme={colors.mode} className='bg-secondary-500 min-h-screen fixed w-full duration-300'>
        <Outlet />
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