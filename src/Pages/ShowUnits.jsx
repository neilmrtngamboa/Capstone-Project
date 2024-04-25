import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function ShowUnits () {
    
    const db = getFirestore(firebaseApp)
    const auth = getAuth(firebaseApp)

    const [units, setUnits] = useState([])
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {                //Authentication
            if (user) {
                setUserProfile({
                    email: user.email,
                })
            } else {
                navigate('/login');
            }
        });

    }, [])

}

export default ShowUnits;