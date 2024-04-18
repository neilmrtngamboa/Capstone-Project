import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Tenants from './Tenants.jsx';


function Home() {

    let navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp)
    const [userProfile, setUserProfile] = useState({})

    const [tenant, setTenant] = useState({
        firstname: '',
        lastname: '',
        unit: '',
        date: Timestamp.now()
    })

    const [tenantList, setTenantList] = useState([])
    const [editTenantDetails, setEditTenantDetails] = useState(false)
    const [timeEdited, setTimeEdited] = useState(false)

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

        onSnapshot(collection(db, 'tenants'), snapshot => {
            const newOccupiedList = [];

            snapshot.forEach(occupiedUnit => {
                let tenantID = occupiedUnit.data();
                tenantID['tenantID'] = occupiedUnit.id
                newOccupiedList.push(tenantID)
            })
            setTenantList(newOccupiedList);

        });

    }, [])

    const Logout = () => {
        signOut(auth).then(() => {
            navigate('/login');
        })

    }

    const addTenant = () => {

        if (tenant.firstname === '' || tenant.lastname === '' || tenant.unit === '') {
            alert('please fill out the empty fields')
        } else {
            if (2 > tenantList.length) {
                addDoc(collection(db, 'tenants'), tenant);
                setTenantList(tenantList => [...tenantList, tenant])
                alert('data has been successfully added!')
                setTimeEdited(false)
                setTenant({
                    ...tenant,
                    firstname: '',
                    lastname: '',
                    unit: '',
                })
            } else {
                alert('All of the units have been occupied!');
                setTenant({
                    ...tenant,
                    firstname: '',
                    lastname: '',
                    unit: '',
                })
            }
        }
    }

    const deleteTenant = (tenantID) => {
        deleteDoc(doc(db, 'tenants', tenantID))
    }

    const setUpdate = (tenantID, firstname, lastname, unit) => {
        setTenant({
            tenantID: tenantID,
            firstname: firstname,
            lastname: lastname,
            unit: unit,
            date: Timestamp.now()
        })
        setEditTenantDetails(true)
        setTimeEdited(true)
    }

    const updateTenantDetails = () => {

        updateDoc(doc(db, 'tenants', tenant.tenantID), {
            firstname: tenant.firstname,
            lastname: tenant.lastname,
            unit: tenant.unit,
            date: tenant.date
        })

        setTenant({
            ...tenant,
            firstname: '',
            lastname: '',
            unit: '',
        })

        setEditTenantDetails(false)
    }

    return (
        <main className='bg-sky-50 p-5'>
            <div className='flex mt-4 p-3'>
                <Link to='/' className='font-semibold sm:text-2xl'> Home </Link>
                <Link to='/payments' className='sm:text-2xl font-extralight ms-3'>Payments</Link>
                <button className='ms-auto sm:text-lg ' onClick={Logout}>Logout</button>
            </div>

            <h5 className='flex justify-center mb-5 font-semibold text-lg'>Add a new tenant</h5>
            <div className='grid grid-cols-3 gap-2'>
                <input type="text" placeholder='First Name' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    onChange={(e) => setTenant({ ...tenant, firstname: e.target.value })} value={tenant.firstname}
                />
                <input type="text" placeholder='Last Name' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    onChange={(e) => setTenant({ ...tenant, lastname: e.target.value })} value={tenant.lastname}
                />
                <input type="text" placeholder='Unit' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    onChange={(e) => setTenant({ ...tenant, unit: e.target.value })} value={tenant.unit}
                />

            </div>
            {
                editTenantDetails ?
                    (
                        <button className='mt-5 flex mx-auto py-2 px-4 bg-yellow-400 text-black font-thin rounded shadow-md hover:bg-yellow-500 hover:shadow-none hover:text-white'
                            onClick={updateTenantDetails}>Update</button>
                    )
                    :
                    (
                        <button className='mt-5 flex mx-auto py-2 px-4 bg-sky-950 text-white font-thin rounded shadow-md hover:bg-sky-800 hover:shadow-none'
                            onClick={addTenant}>Add+</button>
                    )
            }

            <h3 className='text-3xl flex justify-center mt-12 tracking-wider'
            >Units Occupied: {tenantList.length}/2</h3>

            <div className='grid grid-cols-2 gap-4 sm:grid sm:grid-cols-3 mt-10'>

                {
                    tenantList.map((showTenants) =>
                        <Tenants
                            key={showTenants.id}
                            firstname={showTenants.firstname}
                            lastname={showTenants.lastname}
                            unit={showTenants.unit}
                            tenantID={showTenants.tenantID}
                            deleteTenant={deleteTenant}
                            setUpdate={setUpdate}
                            timeEdited={timeEdited}
                            date={showTenants.date.toDate().toLocaleTimeString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', year: '2-digit' })}

                        />
                    )
                }

            </div>


        </main>
    )
}
export default Home;