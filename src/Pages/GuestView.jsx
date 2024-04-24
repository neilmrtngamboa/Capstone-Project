import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot} from "firebase/firestore";
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'


function GuestView() {

    const db = getFirestore(firebaseApp)
    const [available,setAvailable] = useState([])

    useEffect (() => {

        onSnapshot(collection(db, 'tenants'), getAvailable => {
            const newAvailable = []
            getAvailable.forEach(availableUnit => {
                newAvailable.push(availableUnit.data())
                setAvailable(newAvailable)
            })
        }
        )
    }, [])

    if (2 > available.length){
        return (
            <div className="mt-60">
                <h1 className='flex justify-center font-semibold text-2xl'>{available.length} unit/s have been occupied</h1>
                <h5 className='flex justify-center mt-3 font-semibold text-xl text-gray-400'> Please contact the owner for more inquiries.</h5>
            </div>
        )
    } else {
        return (
            <div className="mt-60">
            <h1 className='flex justify-center mt-3 font-semibold text-2xl text-gray-400'>All of the units have been occupied.</h1>
            </div>
            )
    }
    
  
}


export default GuestView;