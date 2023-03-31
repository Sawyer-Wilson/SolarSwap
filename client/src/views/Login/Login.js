import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthID }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: {errors} } = useForm({
    mode: "onChange"
  });

  // Validation config for input fields
  const validation = {
    email: { required: "Email address is required"}, 
    password: { required: "Password is required"}
  }
  
  // Called when login form gets submitted
  const handleLogin = async (data, event) => {
    // Prevent submit button from refreshing the page
    event.preventDefault();

    // Call auth login endpoint to log user in
    try {
      const response = await axios.post('/auth/login', data);

      if (response.status === 200) {
        setAuthID(response.data);
        navigate('/dashboard');
      } else if (response.status === 401) {
        // TODO: display login error message
        console.log(response);
      }
    } catch (error) {
      // TODO: redirect to error page
      console.log('Login error: ', error)
    }

    // Clear data from form input fields
    reset();
  }

  return ( 
    <div className="mx-auto max-w-xs py-16">
      <form onSubmit={ handleSubmit(handleLogin) } 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" 
                 className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input type="email" id="email" name="email"
                 placeholder="Email"
                 {...register('email', validation.email)}
                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          <small>
            {errors?.email && errors.email.message}
          </small>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input type="password" id="password" name="password" 
                 placeholder="******************"
                 {...register('password', validation.password)}
                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          <small>
            {errors?.password && errors.password.message}
          </small>
        </div>
        
        {/* Sign in Button */}
        <div>
          <button type="submit"
                  className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
 
export default Login;
