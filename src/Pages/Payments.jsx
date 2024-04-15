import { Link } from "react-router-dom";
import { useState } from "react";
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getFirestore, addDoc, collection, Timestamp, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

function Payments () {

    const db = getFirestore(firebaseApp);

    const [paymentDetails,setPaymentDetails] = useState({
        name: '',
        unit: '',
        amount: 0,
        status: 'PAID',
        date: Timestamp.now()
    })

    return (
        <>
        <h1>This is the payments page</h1>
        <Link to='/' className='text-blue-500 underline hover:no-underline hover:text-blue-700'>Owner Dashboard</Link>

        <div>
            <input type="text" placeholder="Name" onChange={(e) => setPaymentDetails({...paymentDetails, name: e.target.value})} 
            value={paymentDetails.name} 
            />
            <input type="text" placeholder="Unit" onChange={(e) => setPaymentDetails({...paymentDetails, unit: e.target.value})} 
            value={paymentDetails.unit}
            />
            <input type="number" placeholder="Amount"
            onChange={(e) => setPaymentDetails({...paymentDetails, amount: e.target.value})} 
            value={paymentDetails.amount}
            />
        </div>
        
        </>
    )
}
export default Payments;