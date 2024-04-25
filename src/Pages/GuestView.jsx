import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import rules from './PDF/ApartmentRules.pdf'


function GuestView() {

    const db = getFirestore(firebaseApp)              //Fetch API key & database 
    const [available, setAvailable] = useState([])     //The array where to store the fetched data

    useEffect(() => {

        onSnapshot(collection(db, 'tenants'), getAvailable => {            //use firebase function onSnapshot to fetch data from the database and collection
            const newAvailable = []
            getAvailable.forEach(availableUnit => {
                newAvailable.push(availableUnit.data())                   //push the fetched data into the array
                setAvailable(newAvailable)
            })
        }
        )
    }, [])

    if (2 > available.length) {   //return value if not all the units have been occupied 
        return (
            <div className="mt-60">
                <h1 className='flex justify-center font-semibold lg:text-2xl'>{available.length} unit/s have been occupied</h1>
                <h5 className='flex justify-center mt-3 font-semibold lg:text-xl text-gray-400'> Please contact the owner for more inquiries.</h5>
                <button className='flex mx-auto mt-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
                    <a href="mailto:johndoe@test.com">Send email</a>
                </button>
                <button className='flex mx-auto mt-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
                    <a href={rules} download='rules'>View Rules</a>
                </button>
            </div>
        )
    } else {
        return ( //return value if all the units have been occupied 
            <div className="mt-60">
                <h1 className='flex justify-center mt-3 font-semibold text-2xl text-gray-400'>All of the units have been occupied.</h1>
                <button className='flex mx-auto mt-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
                    <a href="mailto:johndoe@test.com">Send email</a>
                </button>
                <button className='flex mx-auto mt-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
                    <a href={rules} download='rules'>View Rules</a>
                </button>
            </div>
        )
    }


}


export default GuestView;