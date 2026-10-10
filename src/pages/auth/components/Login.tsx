import { useFormik } from 'formik';
import useAuthMutations from '../../../hook/useAuthMutations';
import { useNavigate } from 'react-router';

const Login = () => {

  const { useLogin } = useAuthMutations();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        useLogin(values);
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
    <div className='flex flex-col items-center justify-center gap-4'>
      <h2 className="text-2xl font-bold">Login</h2>

      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
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
          className={`${formik.isSubmitting ? 'bg-gray-600' : 'bg-blue-500'} hover:bg-blue-600 active:bg-blue-700 text-white p-2 rounded`}
          disabled={formik.isSubmitting}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login