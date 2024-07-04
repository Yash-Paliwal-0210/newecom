// import { useEffect, useState } from "react";
// import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, db } from "../Firebase/Config";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { addDoc, collection, doc, setDoc } from "firebase/firestore";

// const SignUp = () => {
//   const [register, setRegister] = useState({
//     email: "",
//     password: "",
//     cpassword: "",
//   });
//   //   let user ={isLoggedIn: true}
//   const [loading, setloading] = useState(false);
//   const navigateTo = useNavigate();
//   const provider = new GoogleAuthProvider();
//   const isLoggedIn = useSelector(state => state.user.isLoggedIn);

//   useEffect(() => {
//     if (isLoggedIn === true) {
//       // navigateTo("/");
//     }
//     console.log(isLoggedIn)
//   }, [isLoggedIn])


//   const RegisterUser = async (e) => {
//     e.preventDefault();
//     //     setloading(true);
//     let user;
//     if (register.password !== register.cpassword) {
//       toast.error("Password do not Match.");
//       //   setloading(false);
//     } else {
//       createUserWithEmailAndPassword(auth, register.email, register.password)
//         .then((userCredential) => {
//           const user = userCredential.user;
//           setDoc(doc(db, "Users", user.uid), {
//             uid: user.uid,
//             email: user.email,
//             wishlist:[],
//           })
//             .then(() => {
//               toast.success("Registered successfully!");
//             })
//             .catch((error) => {
//               toast.error("Error saving user data");
//             });
//           navigateTo("/auth/login");
//           //   setloading(false);
//         })
//         .catch((error) => {
//           toast.error("Email already Registered");
//           navigateTo("/auth/login");
//           //   setloading(false);
//         });
//     }
//   };

//   const handleGoogle = (e) => {
//     e.preventDefault();
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         const user = result.user;
//         console.log(token);
//         console.log(user);
//         // toast.success("Registered Successfully");
//         navigateTo("/auth/login");
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         const email = error.customData.email;
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         console.log(errorMessage);
//         console.log(email);
//         console.log(credential);
//         toast.error(error.message);
//       });
//   };

//   return (
//     <>
//       <ToastContainer />
//       {/* {loading && <Loader />} */}
//       <section className='bg-blue-200 dark:bg-gray-900'>
//         <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[87vh] lg:py-0'>
//           <div className='w-full bg-blue-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
//             <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
//               <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
//                 Create and account
//               </h1>
//               <form
//                 className='space-y-4 md:space-y-6'
//                 action='#'
//                 onSubmit={RegisterUser}
//               >
//                 <div>
//                   <label
//                     htmlFor='email'
//                     className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
//                   >
//                     Your email
//                   </label>
//                   <input
//                     type='email'
//                     name='email'
//                     id='email'
//                     className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                     placeholder='name@company.com'
//                     required=''
//                     value={register.email}
//                     onChange={(e) =>
//                       setRegister({ ...register, email: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor='password'
//                     className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
//                   >
//                     Password
//                   </label>
//                   <input
//                     type='password'
//                     name='password'
//                     id='password'
//                     placeholder='••••••••'
//                     className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                     required=''
//                     value={register.password}
//                     onChange={(e) =>
//                       setRegister({ ...register, password: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor='confirm-password'
//                     className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
//                   >
//                     Confirm password
//                   </label>
//                   <input
//                     type='password'
//                     name='confirm-password'
//                     id='confirm-password'
//                     placeholder='••••••••'
//                     className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                     required=''
//                     value={register.cpassword}
//                     onChange={(e) =>
//                       setRegister({ ...register, cpassword: e.target.value })
//                     }
//                   />
//                 </div>
//                 <button
//                   type='submit'
//                   aria-label="sign up"

//                   className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
//                 >
//                   Create an account
//                 </button>
//                 <div className='inline-flex items-center justify-center w-full'>
//                   <hr className='w-64 h-px bg-gray-200 border-0 dark:bg-gray-700' />
//                   <span className='absolute px-3 font-medium text-gray-900 -translate-x-1/2 left-1/2 dark:text-white '>
//                     or
//                   </span>
//                 </div>
//                 <button
//                   type='button'
//                   aria-label="sign in google"

//                   className='flex justify-center items-center w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
//                   onClick={handleGoogle}
//                 >
//                   <svg
//                     className='w-4 h-4 me-2'
//                     aria-hidden='true'
//                     xmlns='http://www.w3.org/2000/svg'
//                     fill='currentColor'
//                     viewBox='0 0 18 19'
//                   >
//                     <path
//                       fillRule='evenodd'
//                       d='M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z'
//                       clipRule='evenodd'
//                     />
//                   </svg>
//                   Sign in with Google
//                 </button>
//                 <p className='text-sm font-light text-black dark:text-gray-400'>
//                   Already have an account?{" "}
//                   <Link
//                     to='/auth/login'
//                     className='font-medium text-primary-600 hover:underline dark:text-primary-500'
//                   >
//                     Login here
//                   </Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SignUp;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../Firebase/Config';
// import { doc, setDoc } from 'firebase/firestore';

// const SignUp = () => {
//   const [register, setRegister] = useState({
//     email: '',
//     password: '',
//     cpassword: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const navigateTo = useNavigate();

//   const registerUser = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (register.password !== register.cpassword) {
//       alert('Passwords do not match.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, register.email, register.password);
//       const user = userCredential.user;
//       await setDoc(doc(db, 'Users', user.uid), {
//         uid: user.uid,
//         email: user.email,
//         cart: [],
//         orders: [],
//       });
//       alert('Registered successfully!');
//       navigateTo('/');
//     } catch (error) {
//       alert(error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="hidden md:block relative">
//           <img
//             src="https://source.unsplash.com/random/800x600/?shoes"
//             alt="Signup Background"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
//         </div>
//         <div className="p-8 md:p-12">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
//           <form onSubmit={registerUser} className="space-y-4">
//             {/* Form inputs */}
//           </form>
//           <div className="mt-4 flex justify-center items-center">
//             <span className="mr-2">Already have an account?</span>
//             <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Login here</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/Config';
// import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useSelector } from 'react-redux';

const SignUp = () => {
  const [register, setRegister] = useState({
    email: '',
    password: '',
    cpassword: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const provider = new GoogleAuthProvider();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigateTo("/");
    }
  }, [isLoggedIn])

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (register.password !== register.cpassword) {
      alert('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, register.email, register.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'Users', user.uid), {
        uid: user.uid,
        email: user.email,
        username: register.username,
        cart: [],
        orders: [],
        createdAt: new Date().toLocaleString(),
        Role:"user",
      });
      alert('Registered successfully!');
      navigateTo('/');
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, 'Users', user.uid), {
        uid: user.uid,
        email: user.email,
        username: register.username,
        orders: [],
        createdAt: new Date().toLocaleString(),
        Role:"user",
        wishList:[],
      });
      alert('Registered successfully with Google!');
      navigateTo('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-5 max-w-screen-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:block relative">
          <img
            src="https://picsum.photos/800/600?random=8"
            alt="Signup Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
          <form onSubmit={registerUser} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={register.email}
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                required
                value={register.username}
                onChange={(e) => setRegister({ ...register, username: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                required
                value={register.password}
                onChange={(e) => setRegister({ ...register, password: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                autoComplete="new-password"
                required
                value={register.cpassword}
                onChange={(e) => setRegister({ ...register, cpassword: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full px-4 py-2 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Sign Up with Google
            </button>
          </form>
          <div className="mt-4 flex justify-center items-center">
            <span className="mr-2">Already have an account?</span>
            <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
