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

        onAuthStateChanged(auth, (user) => {       //Authentication
            if (user) {
                setUserProfile({
                    email: user.email,
                })
            } else {
                navigate('/login');
            }
        });

        onSnapshot(collection(db, 'payments'), snapshot => {     //Fetch the data from the firestore database
            const newPaymentList = [];

            snapshot.forEach(payment => {
                let paymentID = payment.data();                 //where to store the fetched data id
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
                    text: 'Please fill out the empty fields!',  //Alert if the fields are empty
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
        } else {
            addDoc(collection(db, 'payments'), paymentDetails)    //Add the data to the firestore database and collection
            setPaymentList(paymentList => [...paymentList, paymentDetails])  //Push the data to the main array
            setTotalEarnings(totalEarnings + parseInt(paymentDetails.amount)); //To calculate the total earnings after adding a payment
            Swal.fire({
                title: 'Payment added!',
                text: 'Data has been successfully added!',                  //Alert if the data has been added dsuccessfully
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            setPaymentDetails({
                ...paymentDetails,                                          //Clear the values after adding
                name: '',
                unit: '',
            })
        }
    }

    const deletePayment = (paymentID, amount) => {                          //Delete Function
        deleteDoc(doc(db, 'payments', paymentID))                           //Delete specific data
        setTotalEarnings(totalEarnings - parseInt(amount));                 //Subtract the payment to the total earnings
    }

    return (
        <body className="bg-indigo-50 p-5">

            <h1 className="flex justify-center md:text-3xl font-semibold">Payments</h1>
            {
                paymentList.length > 0 ? 
                (
                    <button className="flex mx-auto mt-3 px-4 py-2 border-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded shadow"
                    onClick={() => window.print()} 
                    >
                    Print payments
                    </button>
                )
                :
                (
                    <></>
                )
            }   
                        
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
                    paymentList.map((showPayments) => //Pass data and function to other component (ListOfPayments.jsx)
                        <ListOfPayments
                            key={showPayments.id}
                            name={showPayments.name}
                            unit={showPayments.unit}
                            amount={showPayments.amount}
                            status={showPayments.status}
                            date={showPayments.date.toDate().toLocaleTimeString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', year: '2-digit' })}
                            //Convert the date(Timestamp) to Date and then to String
                            paymentID={showPayments.paymentID}
                            deletePayment={deletePayment}
                        />
                    )
                }
            

                
                            
            
        </body>
    )
}
export default Payments;