import { Outlet } from 'react-router'
import bgAuth from '../../assets/images/bg-auth.jpeg';

export const Auth = () => {
  
  return (
    <div className='bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center'
    style={{ backgroundImage: `url(${bgAuth})` }}
    >
      <div className='bg-white p-10 py-14 rounded-lg shadow-md *:w-80'>
        <Outlet />
      </div>
    </div>
  )
}