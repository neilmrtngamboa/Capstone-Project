import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot} from "firebase/firestore";
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function ShowPayments() {

    const db = getFirestore(firebaseApp)
    const auth = getAuth(firebaseApp);
    const [payments, setPayments] = useState([])
    const [userProfile, setUserProfile] = useState({})
    
    useEffect (() => {

        onAuthStateChanged(auth, (user) => {                //Authentication
            if (user) {
                setUserProfile({
                    email: user.email,                      
                })
            } else {
                navigate('/login');
            }
        });

        onSnapshot(collection(db, 'payments'), getPayments => {            //use firebase function onSnapshot to fetch data from the database and collection
            const newPayments = []                         
            getPayments.forEach(payment => {
                newPayments.push(payment.data())                   //push the fetched data into the array
                setPayments(newPayments)
            })
        }
        )
    }, [])

    

}

export default ShowPayments;