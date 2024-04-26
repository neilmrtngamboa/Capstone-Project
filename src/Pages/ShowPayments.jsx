import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

function ShowPayments() {

    const db = getFirestore(firebaseApp)
    const auth = getAuth(firebaseApp);
    let navigate = useNavigate();
    
    const [payments, setPayments] = useState([])
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

        onSnapshot(collection(db, 'payments'), getPayments => {            //use firebase function onSnapshot to fetch data from the database and collection
            const newPayments = []
            getPayments.forEach(payment => {
                newPayments.push(payment.data())                   //push the fetched data into the array
                setPayments(newPayments)
            })
        }
        )


    }, [])

    if (payments.length > 0) {

        return (
            <main className='p-20'>
                {
                    payments.map(showPayments =>
                        <>
                            <button className="flex mx-auto mt-3 px-4 py-2 border-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded shadow
                            dark:bg-slate-500 dark:hover:bg-slate-400 dark:border-none"
                                onClick={() => window.print()}
                            >
                                Print payments
                            </button>
                            <div className="border-2 border-slate-400 p-5 rounded shadow-md mt-5 dark:text-gray-300 dark:text-white">
                                <h4 className="font-light">Name: <b className="font-semibold me-1">{showPayments.name}</b>
                                    Unit: <b className="font-semibold">{showPayments.unit}</b> Amount: <b className="font-semibold me-1">{showPayments.amount}</b>
                                    Status: <b className="font-semibold">{showPayments.status}</b> Date: <b className="font-semibold">{showPayments.date.toDate().toLocaleTimeString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', year: '2-digit' })}</b></h4>
                            </div>
                        </>
                    )
                }
            </main>
        )
    } else {
        return (
            <main className='p-20 mt-5'>
                <h1 className='flex justify-center mt-10 font-bold text-2xl text-gray-400'>There are no payments to show.</h1>
            </main>
        )
    }



}

export default ShowPayments;