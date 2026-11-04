import { Outlet } from 'react-router'
import bgAuth from '../../assets/images/bg-auth.jpeg';

export const Auth = () => {
  
  return (
    <div className='bg-cover bg-center bg-no-repeat h-dvh p-4 flex items-center justify-center'
    style={{ backgroundImage: `url(${bgAuth})` }}
    >
      <div className='bg-white p-10 py-14 rounded-lg shadow-md max-sm:max-w-sm w-sm'>
        <Outlet />
      </div>
    </div>
  )
}