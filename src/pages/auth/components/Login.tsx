import { useFormik } from 'formik';
import useAuthMutations from '../../../hook/useAuthMutations';
import { useNavigate } from 'react-router';
import { Divider } from '@mui/material';

const Login = () => {

  const { useLogin } = useAuthMutations();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await useLogin(values);
        navigate('/');
      } catch (error) {
        resetForm({ values: { username: '', password: '' } });
      } finally {
        setSubmitting(false);
      }
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.username) {
        errors.username = 'Username is required';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      }
      return errors;
    }
  });

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <h2 className="text-3xl font-bold">Login</h2>

      <form className="flex flex-col gap-4 w-full" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <input type="text"
            placeholder="Username"
            className="border border-gray-300 p-2 rounded"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="text-red-500">{formik.errors.username && formik.touched.username && formik.errors.username}</p>
        </div>

        <div className="flex flex-col">
          <input type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="text-red-500">{formik.errors.password && formik.touched.password && formik.errors.password}</p>
        </div>

        <button
          type="submit"
          className={`${formik.isSubmitting ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'} text-white p-2 w-full h-10 flex items-center justify-center rounded font-bold`}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 
            <>
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-white"></div>
            </> : 'Login'}
        </button>
      </form>
      <div className="flex flex-col items-center gap-5 w-full">

        <div className="flex flex-row items-center justify-between gap-2 w-full">
          <div>
            <input type="checkbox" id="rememberMe" className="mr-2" disabled />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</label>
          </div>
          <div>
            <p className="text-sm text-blue-500 w-full hover:underline cursor-pointer">Forgot password?</p>
          </div>
        </div>
      
        <Divider className="w-full text-gray-400" />
        <p className="text-sm text-gray-400">
          Don't have an account? <a href="/auth/register" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Login