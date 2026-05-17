import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { LoginSchema } from '../zod/LoginSchema';
import { clearAuthError, loginAsync } from '../features/auth/LoginSlice';

const Login = () => {
  //backend error handle for email&password
  const { error } = useSelector((state) => state.authLogin);

  // formData Inputs
  const [formData, setFormData] = useState({ email: '', password: '' });

  // zod error handling
  const [zodError, setZodError] = useState({});

  // password hide/Show
  const [eyeShow, setEyeShow] = useState(false);

  // success Maeesage after successfully
  const [success, setSuccess] = useState(false);
  const [comfirm, setComfirm] = useState(false);


  const dispatch = useDispatch()

  const handleSave = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (zodError[e.target.name]) {
      setZodError({ ...zodError, [e.target.name]: "" })
    }
    if (error) {
    dispatch(clearAuthError());
  }
   
  }

  // form validation
  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      const result = await LoginSchema.safeParse(formData);
      if (!result.success) {
        const existingData = result.error.issues.reduce((accum, items) => {
          if (!accum[items.path[0]]) {
            accum[items.path[0]] = items.message;
          }
          return accum;
        }, {});
        return setZodError(existingData);
      }

      setZodError({});

      const res =await dispatch(loginAsync(formData)).unwrap();
      console.log(res);

      setFormData({ email: '', password: '' });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);

 
      setComfirm(true);
      setTimeout(() => {
        setComfirm(false);
      }, 4000);

      

   
    } catch (error) {
      console.log('error in handleFormData Check in  login.jsx', error);
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3e7257] px-4">

      <form onSubmit={handleFormData} className="w-full max-w-md bg-[#216253] backdrop-blur-sm p-6 rounded-xl shadow-md space-y-5 transition hover:shadow-xl">
        <div className='flex justify-center items-center gap-3'>
           <h2 className='text-[#3dd600] font-semibold text-4xl'>Welcome to</h2>
          <h1 className='text-white font-semibold text-4xl'>Login</h1>
        </div>
        
        {/* email */}
        <div className="group">
          <label className="block text-sm font-semibold text-white mb-1 group-hover:text-black transition">
            Email
          </label>

          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Enter Your Email..."
            onChange={handleSave}
            className="w-full px-3 py-2 border rounded-md outline-none 
            transition-all duration-300
            focus:ring-2 focus:ring-black focus:border-black
            hover:border-black hover:shadow-sm
            text-white placeholder-gray-400"
          />
          {zodError.email ?(
            <p className="text-red-500 text-sm mt-1 font-semibold ">
              {zodError.email}
            </p>
          ):(error&&error.toLowerCase().includes('email'))&&(<p className="text-red-400 text-sm font-semibold italic">{error}</p>)}
 
        </div>

        {/* password */}
        <div className="group relative">
          <label className="block text-sm  font-semibold text-white mb-1 group-hover:text-black transition">
            Password
          </label>

          <div className="relative">
            <input
              type={eyeShow ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Enter Your password..."
              onChange={handleSave}
              className="w-full px-3 py-2 border rounded-md outline-none pr-10
              transition-all duration-300
              focus:ring-2 focus:ring-black focus:border-black
              hover:border-black hover:shadow-sm
              text-white placeholder-gray-400"
            />

            {/* eye icon */}
            <span
              onClick={() => setEyeShow(!eyeShow)}
              className="absolute right-3 top-2.5 cursor-pointer 
              text-gray-500 hover:text-black 
              hover:scale-110 active:scale-95 transition"
            >
              {eyeShow ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

            {zodError.password ?(
            <p className="text-red-500 text-sm mt-1 font-semibold ">
              {zodError.password}
            </p>
          ):(error&&error.toLowerCase().includes('password'))&&(<p className="text-red-400 text-sm font-semibold italic">{error}</p>)}
 
        </div>

        {/* button */}
        <div>
          <button
            type="submit"
            className={`w-full py-2 rounded-md ${success?'bg-[#242640]':comfirm?'bg-green-600':'bg-black'}  text-white font-medium
            transition-all duration-300
            hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]
            active:scale-95`}
          >
            {success ? <p className='uppercase'> processing...</p> : comfirm ?  <p className='uppercase'>Login successFully</p> : <p className='uppercase'>Login</p> }
          </button>
         <p className="text-sm font-semibold text-gray-400 mt-4 text-center">
  Create Account?{' '}
  <a 
    href="/signup" 
    className="text-white hover:text-green-400 font-bold underline underline-offset-4 decoration-2 transition-all duration-300 hover:scale-105 inline-block"
  >
    Signup
  </a>
</p>
        </div>

      </form>
    </div>

  )
}

export default Login;