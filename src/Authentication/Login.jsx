import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx';
import Swal from "sweetalert2";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(firebaseApp);              //Fetch API key 
    onAuthStateChanged(auth, (user) => {            //Condition if the user is logged in
      if (user) {
        navigate('/')
      } else {

      }
    });

  }, [])

  const Login = () => {                           //Login function 

    if (email !== '' && password !== '') {                    //Condition if the email and password is empty

      const auth = getAuth(firebaseApp);
      signInWithEmailAndPassword(auth, email, password)      //Firebase auth function
        .then((userCredential) => {

          const user = userCredential.user;
          Swal.fire({
            title: 'Sign in successful!',                    //Alert when the sign in is successful
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          navigate('/');
        })
        .catch((error) => {
          Swal.fire({
            title: 'Sign in failed',                        //Alert when the sign in is unsuccessful
            text: 'Incorrect credentials!',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          setEmail('')                                      //Clear the values after logging in
          setPassword('')
        });

    } else {
      Swal.fire({
        title: 'Sign in failed',
        text: 'Please fill out the empty fields!',          //Alert if the fields are empty 
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }


  }


  return (
    <>
      <div className="max-w-xs mt-44 mx-auto">
        <div className=' bg-indigo-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>

            <input type="email" placeholder='Email' id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:bg-blue-100 focus:text-black"
              onChange={(e) => setEmail(e.target.value)} value={email}    //Applied onChange to target the input value of the email
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input type="password" placeholder='Password' id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:bg-blue-100"
              onChange={(e) => setPassword(e.target.value)} value={password}  //Applied onChange to target the input value of the password
            />
          </div>

          <div className="flex justify-center">
            <button onClick={Login}               //Applied onClick to call the Login function
            className="bg-indigo-200 text-gray-700 py-2 px-4 rounded shadow-md font-bold hover:bg-indigo-400 hover:shadow-none hover:text-white" 
            >Login</button>
          </div>

          <div className="flex justify-center mt-3">
            <button
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded shadow-md font-bold hover:bg-indigo-400 hover:shadow-none hover:text-white" 
            > <Link to='/guestview'>Guest View</Link>               
            </button>
          </div>

        </div>
        <p className="text-xs text-center text-gray-400">Apartment Management System ©2024</p>
      </div>


    </>
  )
}

export default Login;