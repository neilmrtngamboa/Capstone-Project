import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot} from "firebase/firestore";
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'

function ShowPayments() {

    const db = getFirestore(firebaseApp)
    const [payments, setPayments] = useState([])
    
    useEffect (() => {

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