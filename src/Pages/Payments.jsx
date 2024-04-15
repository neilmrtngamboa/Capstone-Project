import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getFirestore, addDoc, collection, Timestamp, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import ListOfPayments from "./ListOfPayments.jsx";

function Payments () {

    const db = getFirestore(firebaseApp);

    const [paymentDetails,setPaymentDetails] = useState({
        name: '',
        unit: '',
        amount: '',
        status: 'PAID',
        date: Timestamp.now()
    })
    const [paymentList, setPaymentList] = useState([])


    useEffect (() => {
        onSnapshot(collection(db, 'payments'), snapshot => {
            const newPaymentList = [];

            snapshot.forEach(payment => {
                let paymentID = payment.data();
                paymentID['paymentID'] = payment.id
                newPaymentList.push(paymentID)
            })
            setPaymentList(newPaymentList);

        });
    }, [])

    const addPayment = () => {
        if (paymentDetails.name !== '' || paymentDetails.unit !== '' || paymentDetails.amount !== '' || paymentDetails.amount !== ''){
            addDoc(collection(db,'payments'),paymentDetails)
                setPaymentList (paymentList => [...paymentList, paymentDetails])
                alert('data has been successfully added')
                setPaymentDetails({
                    ...paymentDetails,
                    name: '',
                    unit: '',
                    amount: '',
                })
            
        }else{
            alert('Please fill out the empty fields')
        }
    }

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
            <button onClick={addPayment} className='border-2 border-black p-2 bg-sky-200 hover:bg-sky-400'> Add</button>
        </div>
        
        {
            paymentList.map ((showPayments) => 
            <ListOfPayments 
                key={showPayments.id}
                name={showPayments.name}
                unit={showPayments.unit}
                amount={showPayments.amount}
                status={showPayments.status}
                date={showPayments.date.toDate().toLocaleTimeString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', year: '2-digit'})}
                paymentID={showPayments.paymentID}
            />
            )
        }
        </>
    )
}
export default Payments;