import { Outlet } from 'react-router'
import bgAuth from '../../assets/images/bg-auth.jpeg';

export const Auth = () => {
  
  return (
    <div className={`bg-[url("${bgAuth}")] bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center`}>
        <div className='bg-white p-8 rounded-lg shadow-md *:w-52'>
            <Outlet />
        </div>
    </div>
  )
}