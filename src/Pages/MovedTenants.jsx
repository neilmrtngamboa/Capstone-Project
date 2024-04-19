import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

function MovedTenants () {

    let navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp)
    const [userProfile, setUserProfile] = useState({})


    useEffect(() => {
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserProfile({
                    email: user.email,
                })
            } else {
                navigate('/login');
            }
        });

    }, [])

    return (
        <></>
    )
}

export default MovedTenants