import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Tenants from './Tenants.jsx';
import Swal from 'sweetalert2';


function Home() {

    let navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp)
    const [userProfile, setUserProfile] = useState({})

    const [tenant, setTenant] = useState({                  //Object where you can input fields 
        firstname: '',
        lastname: '',
        unit: '',
        phonenumber: '',
        date: Timestamp.now()
    })

    const [tenantList, setTenantList] = useState([])       //Array where to store the fetched data from the firestore database
    const [editTenantDetails, setEditTenantDetails] = useState(false) //Boolean, to setup the edit function
    const [timeEdited, setTimeEdited] = useState(false)         //Boolean, to show the time edited
    const [deleteButtonStatus, setDeleteButtonStatus] = useState(false)    

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

        onSnapshot(collection(db, 'tenants'), snapshot => {     //onSnapshot to fetch the data from the firestore database
            const newOccupiedList = [];

            snapshot.forEach(occupiedUnit => {  
                let tenantID = occupiedUnit.data();             //set the fetched data to 'tenantID'
                tenantID['tenantID'] = occupiedUnit.id          //set the fetched data id to 'tenantID'
                newOccupiedList.push(tenantID)                  //push the fetched data id to the array
            })
            setTenantList(newOccupiedList);                     //set the fetched data to the main array

        });

    }, [])

    const addTenant = () => {

        if (tenant.firstname === '' || tenant.lastname === '' || tenant.unit === '' || tenant.phonenumber === '') {
            Swal.fire({
                title: 'Add Tenant Error!',
                text:  'Please fill out the empty fields!',                         //Alert if the inputed values are empty
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        } else {
            if (2 > tenantList.length) {                                            
                addDoc(collection(db, 'tenants'), tenant);                          //Add the data if the length doesn't exceeds the limit (2)
                setTenantList(tenantList => [...tenantList, tenant])                //Push the data to the main array
                Swal.fire({
                    title: 'Add Tenant Successful',
                    text:  'Data has been added',                                   //Alert when data is successfully added
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                setTimeEdited(false)                                                
                setTenant({
                    ...tenant,                                                      //Make the object have the same values
                    firstname: '',
                    lastname: '',                                                   //Clear the values after adding data
                    unit: '',
                    phonenumber: ''
                })
            } else {
                Swal.fire({
                    title: 'Add Tenant Error!',
                    text:  'All of the units have been occupied',                   //Alert if the data exceeds the limit
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
                setTenant({
                    ...tenant,
                    firstname: '',                                                  //Clear the values
                    lastname: '',
                    unit: '',
                    phonenumber: ''
                })
            }
        }
    }

    const deleteTenant = (tenantID) => {                                            

        Swal.fire({
            title: 'Delete successful',
            text:  'Data has been removed',
            icon: 'success',                                                    //Alert when data has been removed
            confirmButtonText: 'Ok'
          })

        deleteDoc(doc(db, 'tenants', tenantID))                                 //Delete the specific data 
    }

    const setUpdate = (tenantID, firstname, lastname, unit, phonenumber) => {                //Setup update
        setTenant({
            tenantID: tenantID,
            firstname: firstname,                                               //set the values to specific data
            lastname: lastname,
            unit: unit,
            phonenumber: phonenumber,
            date: Timestamp.now()
            
        })
        setDeleteButtonStatus(true)
        setEditTenantDetails(true)
        setTimeEdited(true)
    }

    const updateTenantDetails = () => {

        updateDoc(doc(db, 'tenants', tenant.tenantID), {                        //update the specific data
            firstname: tenant.firstname,
            lastname: tenant.lastname,
            unit: tenant.unit,
            date: tenant.date,
            phonenumber: tenant.phonenumber
        })

        Swal.fire({
            title: 'Update successful!',
            text:  'Data has been updated',                                     //alert if the data has been updated
            icon: 'success',
            confirmButtonText: 'Ok'
          })

        setTenant({
            ...tenant,
            firstname: '',                                                      //Clear the values
            lastname: '',
            unit: '',
            phonenumber: ''
        })
        setDeleteButtonStatus(false)

        setEditTenantDetails(false)
    }

    return (
        <main className='bg-indigo-50 p-5'>

            <h5 className='flex justify-center mb-5 font-semibold text-lg lg:text-3xl'>Add a new tenant</h5>
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 gap-2'>
                <input type="text" placeholder='First Name' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    onChange={(e) => setTenant({ ...tenant, firstname: e.target.value })} value={tenant.firstname}
                />
                <input type="text" placeholder='Last Name' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    onChange={(e) => setTenant({ ...tenant, lastname: e.target.value })} value={tenant.lastname}
                />
                <input type="text" placeholder='Unit' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    onChange={(e) => setTenant({ ...tenant, unit: e.target.value })} value={tenant.unit}
                />
                <input type="text" placeholder='Phone Number' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    onChange={(e) => setTenant({ ...tenant, phonenumber: e.target.value })} value={tenant.phonenumber}
                />

            </div>
            {
                editTenantDetails ?
                    (
                        <button className='mt-5 flex mx-auto py-2 px-4 rounded shadow-lg bg-indigo-500 hover:bg-indigo-700 text-white font-bold border-b-4 
                        border-indigo-800 hover:border-indigo-950'
                            onClick={updateTenantDetails}>Update</button>
                    )
                    :
                    (
                        <button className='mt-5 flex mx-auto py-2 px-4 rounded shadow-lg bg-indigo-700 hover:bg-indigo-800 text-white font-bold border-b-4 
                        border-indigo-800 hover:border-indigo-950'
                            onClick={addTenant}>Add+</button>
                    )
            }

            <h3 className='text-3xl flex justify-center mt-12 tracking-wider'
            >Units Occupied: {tenantList.length}/2</h3>

            <div className='grid grid-cols-2 gap-4 sm:grid sm:grid-cols-3 mt-10'>

                {
                    tenantList.map((showTenants) =>    //map to pass data to other component (Tenants.jsx)
                        <Tenants
                            key={showTenants.id}
                            firstname={showTenants.firstname}
                            lastname={showTenants.lastname} 
                            unit={showTenants.unit}
                            tenantID={showTenants.tenantID}
                            deleteTenant={deleteTenant}
                            setUpdate={setUpdate}
                            timeEdited={timeEdited}
                            phonenumber={showTenants.phonenumber}
                            date={showTenants.date.toDate().toLocaleTimeString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', year: '2-digit' })}
                            //convert the date(Timestamp) to a date and to a string
                            deleteButtonStatus={deleteButtonStatus}
                        />
                    )
                }

            </div>


        </main>
    )
}
export default Home;