import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


function Home () {

    let navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const [userProfile, setUserProfile] = useState({})

    useEffect (() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserProfile({
                    email: user.email,
                    username: user.displayName
                })
            } else {
                navigate('/login');
            }
        });
    }, [])

    const Logout = () => {
        signOut(auth).then(() => {
            navigate('/login');
        })

    }

    return (
        <>

        <h1>Home Page</h1>
        <button className='border-2 border-black p-2 bg-sky-200 hover:bg-sky-400' onClick={Logout}>Logout</button>
        <hr />
        <h5>Add a new tenant</h5>
        <input type="text" placeholder='First Name' />
        <input type="text" placeholder='Last Name' />
        <input type="text" placeholder='Unit' />
        <button className='border-2 border-black p-2 bg-blue-500 hover:bg-blue-700'>Add+</button>
        </>
    )
}
export default Home;