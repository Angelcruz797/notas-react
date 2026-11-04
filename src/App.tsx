import { Outlet } from 'react-router'
import { useColorStore } from './store/useColorStore'
import { ToastContainer, Slide } from 'react-toastify'
import { useEffect } from 'react';

function App() {
  const { colors } = useColorStore();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colors.mode);
  }, [colors.mode]);

  return (
    <>
      <div className='bg-secondary-500 fixed inset-0 duration-300'>
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