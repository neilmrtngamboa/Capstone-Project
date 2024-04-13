import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx';

function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, (user) => {
        if (user) {
            navigate('/')
        } else {

        }
        });

    }, [])

    const Login = () => {

        if (email !== '' && password !== '') {
    
          const auth = getAuth(firebaseApp);
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
    
              const user = userCredential.user;
              alert('sign in successful')
              navigate('/');
            })
            .catch((error) => {
                alert('sign in failed')
            });
    
        } else {
          alert('please fill out the empty fields')
        }
    
    
      }

    
    return (
        <>
        <input type="email" placeholder='Email'
                onChange={(e) => setEmail(e.target.value)} value={email}
        />

        <input type="password" placeholder='Password'
                onChange={(e) => setPassword(e.target.value)} value={password}
        />

        <button onClick={Login}>Login</button>
        </>
    )
}

export default Login;