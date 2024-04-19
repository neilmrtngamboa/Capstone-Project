import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getFirestore, addDoc, collection, Timestamp, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import ListOfPayments from "./ListOfPayments.jsx";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import Swal from "sweetalert2";

function Payments() {

    const db = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);
    let navigate = useNavigate();

    const [paymentDetails, setPaymentDetails] = useState({
        name: '',
        unit: '',
        amount: 0,
        status: 'PAID',
        date: Timestamp.now()
    })
    const [paymentList, setPaymentList] = useState([])
    const [totalEarnings, setTotalEarnings] = useState(0)
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
        if (paymentDetails.name === '' || paymentDetails.unit === '' || paymentDetails.amount === 0
            || paymentDetails.amount === '') {
                
                Swal.fire({
                    title: 'Process Failed!',
                    text: 'Please fill out the empty fields!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
        } else {
            addDoc(collection(db, 'payments'), paymentDetails)
            setPaymentList(paymentList => [...paymentList, paymentDetails])
            setTotalEarnings(totalEarnings + parseInt(paymentDetails.amount));
            Swal.fire({
                title: 'Payment added!',
                text: 'Data has been successfully added!',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            setPaymentDetails({
                ...paymentDetails,
                name: '',
                unit: '',
            })
        }
    }

    const deletePayment = (paymentID, amount) => {
        deleteDoc(doc(db, 'payments', paymentID))
        setTotalEarnings(totalEarnings - parseInt(amount));
    }

    return (
        <section className="bg-indigo-50 p-5">

            <h1 className="flex justify-center md:text-3xl font-semibold">Payments</h1>
            <div className="grid grid-cols-3 gap-1 mt-5 p-3">
                <input type="text" placeholder="Name" onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                    value={paymentDetails.name} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight 
                    focus:outline-none focus:shadow-outline'
                />
                <input type="text" placeholder="Unit" onChange={(e) => setPaymentDetails({ ...paymentDetails, unit: e.target.value })}
                    value={paymentDetails.unit} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight 
                    focus:outline-none focus:shadow-outline'
                />
                <input type="number" placeholder="Amount"
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
                    value={paymentDetails.amount} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight 
                    focus:outline-none focus:shadow-outline'
                />
            </div>

            <button onClick={addPayment} className='mt-5 flex mx-auto py-2 px-4 rounded shadow-lg bg-indigo-700 hover:bg-indigo-800 text-white font-bold border-b-4 
                        border-indigo-800 hover:border-indigo-950'> Add Payment</button>
            <h5 className="flex justify-center mt-5 text-2xl font-semibold">Earnings: {totalEarnings}</h5>
                            
            {
                paymentList.map((showPayments) =>
                    <ListOfPayments
                        key={showPayments.id}
                        name={showPayments.name}
                        unit={showPayments.unit}
                        amount={showPayments.amount}
                        status={showPayments.status}
                        date={showPayments.date.toDate().toLocaleTimeString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', year: '2-digit' })}
                        paymentID={showPayments.paymentID}
                        deletePayment={deletePayment}
                    />
                )
            }
        </section>
    )
}
export default Payments;