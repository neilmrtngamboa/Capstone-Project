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

        onSnapshot(collection(db, 'tenants'), fetchData => {
            const newUnits = []
            fetchData.forEach(unit => {
                newUnits.push(unit.data())
                setUnits(newUnits)
            })
        } 
        )

    }, [])

    if (units.length > 0) {
        return (
            <main className='p-10 grid lg:grid-cols-5 lg:gap-5'>
                {
                    units.map(getUnits => 
                        <div className='border-2 border-slate-400 p-5 rounded shadow-md mt-5 grid lg:grid-cols-2'>
                            <img src="https://icons.iconarchive.com/icons/aha-soft/security/256/key-icon.png" className='h-14 w-14 my-auto' alt="" />
                            
                            <div>
                            <h3 className='font-light'>Unit: <b className='font-bold'>{getUnits.unit}</b> </h3>
                            <h3 className='font-light'>Contact No: <b className='font-bold'>{getUnits.phonenumber}</b></h3>
                            <h3 className='font-light'>Date of Arrival: <b className='font-bold'>{getUnits.date.toDate().toLocaleTimeString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', year: '2-digit' })}</b></h3>
                            </div>
                            
                                                  
                            
                        </div>
                        )
                }

            </main>
        )
    } else {
        return (
            <main className='p-20 mt-5'>
                <h1 className='flex justify-center mt-10 font-bold text-2xl text-gray-400'>There are no tenants available.</h1>
            </main>
        )
    }

}

export default ShowUnits;