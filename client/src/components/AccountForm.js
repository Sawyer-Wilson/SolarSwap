import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const AccountForm = ({ onSubmit, submitText, isEdit, defaultValues }) => {
  const { register, handleSubmit, getValues, formState: {errors} } = useForm({
    mode: "onChange",
    defaultValues: defaultValues
  });

  // Validation config for input fields
  const validation = {
    firstName: { required: "First name is required"}, 
    lastName: { required: "Last name is required"}, 
    email: { required: "Email address is required"}, 
    password: { 
      required: "Password is required",
      minLength: { 
        value: 8, 
        message: "Password must have at least 8 characters"
      }
    },
    confirmPassword: {
      required: "Password is required",
      validate: () => String(getValues("password")) === String(getValues("confirmPassword")) 
                || "Passwords must match"
    }
  }

  return (
    <div className="mx-auto max-w-lg py-16">
      <form onSubmit={ handleSubmit(onSubmit) }
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        {/* Row 1 of form - first and last name fields */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="first-name"
                   className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input type="text" id="first-name" name="firstName" 
                   placeholder="Jane"
                   {...register('firstName', validation.firstName)}
                   className={"appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white" + (errors?.firstName ? " border-red-500" : "")}/>
            <small className="text-red-500">
              {errors?.firstName && errors.firstName.message}
            </small>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label htmlFor="last-name"
                   className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
            <input type="text" id="last-name" name="lastName" 
                   placeholder="Doe"
                   {...register('lastName', validation.lastName)}
                   className={"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" + (errors?.lastName ? " border-red-500" : "")}/>
            <small className="text-red-500">
              {errors?.lastName && errors.lastName.message}
            </small>
          </div>
        </div>

        {/* Row 2 of form - email field */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label htmlFor="email"
                   className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email Address
            </label>
            <input type="email" id="email" name="email" 
                   placeholder="jane@gmail.com"
                   {...register('email', validation.email)}
                   className={"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" + (errors?.email ? " border-red-500" : "")}/>
            <small className="text-red-500">
              {errors?.email && errors.email.message}
            </small>
          </div>
        </div>

        {/* Row 3 of form - password and confirm password fields */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="password"
                   className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              { isEdit ? "New Password" : "Password" }
            </label>
            <input type="password" id="password" name="password"
                   placeholder="******************"
                   {...register('password', validation.password)}
                   className={"appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white" + (errors?.password ? " border-red-500" : "")}/>
            <small className="text-red-500">
              {errors?.password && errors.password.message}
            </small>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label htmlFor="confirm-password"
                   className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              { isEdit ? "Confirm New Password" : "Confirm Password" }
            </label>
            <input type="password" id="confirm-password" name="confirmPassword"
                   placeholder="******************"
                   {...register('confirmPassword', validation.confirmPassword)}
                   className={"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" + (errors?.confirmPassword ? " border-red-500" : "")}/>
            <small className="text-red-500">
              {errors?.confirmPassword && errors.confirmPassword.message}
            </small>
          </div>
        </div>
        <div className="flex space-x-4">
          {/* Register Button */}
          <button type="submit"
                  className="bg-rose-light hover:bg-rose-dark text-white font-bold py-2 px-4 rounded">
            { submitText }
          </button>

          {/* Cancel Button (if editing info) */}
          { isEdit && 
            <Link to="/dashboard"
                  className="text-rose-light hover:text-rose-dark py-2 px-4 rounded">
              Cancel
            </Link>
          }
        </div>
      </form>
    </div>
  )
}

export default AccountForm