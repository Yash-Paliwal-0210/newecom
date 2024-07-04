// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../Firebase/Config';
// import { useSelector } from 'react-redux';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const [login, setLogin] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigateTo = useNavigate();
//   const provider = new GoogleAuthProvider();
//   const isLoggedIn = useSelector(state => state.user.isLoggedIn);

//   useEffect(() => {
//     if (isLoggedIn) {
//       navigateTo('/');
//     }
//   }, [isLoggedIn, navigateTo]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, login.email, login.password);
//       const user = userCredential.user;
//       toast.success("Login Successfully");
//       setLoading(false);
//       navigateTo("/");
//     } catch (error) {
//       toast.error("Invalid Credentials");
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       toast.success("Login Successfully");
//       navigateTo("/");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <section className='bg-blue-200 dark:bg-gray-900'>
//         <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[87vh] lg:py-0'>
//           <div className='w-full bg-blue-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
//             <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
//               <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
//                 Sign in to your account
//               </h1>
//               <form className='space-y-4 md:space-y-6' onSubmit={handleLogin}>
//                 <div>
//                   <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
//                     Your email
//                   </label>
//                   <input
//                     type='email'
//                     name='email'
//                     id='email'
//                     className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
//                     placeholder='name@company.com'
//                     required
//                     value={login.email}
//                     onChange={(e) => setLogin({ ...login, email: e.target.value })}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
//                     Password
//                   </label>
//                   <input
//                     type='password'
//                     name='password'
//                     id='password'
//                     placeholder='••••••••'
//                     className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
//                     required
//                     value={login.password}
//                     onChange={(e) => setLogin({ ...login, password: e.target.value })}
//                   />
//                 </div>
//                 <button
//                   type='submit'
//                   className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
//                   disabled={loading}
//                 >
//                   Sign in
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleGoogleLogin}
//                   className="w-full px-4 py-2 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//                 >
//                   Sign in with Google
//                 </button>
//                 <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
//                   Don’t have an account yet? <Link to='auth/SignUp' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Sign up</Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Firebase/Config';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const provider = new GoogleAuthProvider();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigateTo('/');
    }
  }, [isLoggedIn, navigateTo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, login.email, login.password);
      const user = userCredential.user;
      toast.success("Login Successfully");
      setLoading(false);
      navigateTo("/");
    } catch (error) {
      toast.error("Invalid Credentials");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success("Login Successfully");
      navigateTo("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className='bg-blue-200 dark:bg-gray-900 min-h-screen flex items-center justify-center'>
        <div className='bg-white shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden'>
          <div className='md:w-1/2 hidden md:flex items-center justify-center bg-cover bg-center' style={{ backgroundImage: 'url(https://picsum.photos/800/600?random=7)' }}>
            <div className='text-white text-center'>
              <h2 className='text-3xl font-bold'>Welcome Back!</h2>
              <p className='mt-2'>Sign in to continue to your account.</p>
            </div>
          </div>
          <div className='md:w-1/2 p-8'>
            <h1 className='text-2xl font-bold leading-tight text-gray-900 dark:text-white'>
              Sign in to your account
            </h1>
            <form className='mt-6' onSubmit={handleLogin}>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-white'>
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm'
                  placeholder='name@company.com'
                  required
                  value={login.email}
                  onChange={(e) => setLogin({ ...login, email: e.target.value })}
                />
              </div>
              <div className='mt-4'>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-white'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm'
                  placeholder='••••••••'
                  required
                  value={login.password}
                  onChange={(e) => setLogin({ ...login, password: e.target.value })}
                />
              </div>
              <div className='mt-6'>
                <button
                  type='submit'
                  className='w-full bg-green-700 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                  disabled={loading}
                >
                  Sign in
                </button>
              </div>
              <div className='mt-4'>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in with Google
                </button>
              </div>
              <p className='mt-6 text-center text-sm text-gray-600 dark:text-gray-400'>
                Don’t have an account yet? <Link to='auth/SignUp' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

