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

    return (
        <>
        <h1>Home Page</h1>
        </>
    )
}
export default Home;