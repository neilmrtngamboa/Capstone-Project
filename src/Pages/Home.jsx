import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Tenants from './Tenants.jsx';


function Home () {

    let navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp)
    const [userProfile, setUserProfile] = useState({})

    const [tenant,setTenant] = useState({
        firstname: '',
        lastname: '',
        unit: ''
    })
    const [editTenant, setEditTenant] = useState({})

    const [tenantList, setTenantList] = useState([])

    useEffect (() => {
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

        if (tenant.firstname === '' || tenant.lastname === '' || tenant.unit === ''){
            alert('please fill out the empty fields')
        }else{
            if ( 2 > tenantList.length) {
            addDoc(collection(db,'tenants'),tenant);
            setTenantList (tenantList => [...tenantList, tenant])
            alert('data has been successfully added!')
            setTenant({
                firstname: '',
                lastname: '',
                unit: '',
            })
            }else {
                alert('All of the units have been occupied!');
                setTenant({
                    firstname: '',
                    lastname: '',
                    unit: '',
                })
            }
        }
    }

    const deleteTenant = (tenantID) => {
        deleteDoc(doc(db,'tenants',tenantID))
    }

    const setUpdate = (tenantID,firstname,lastname,unit) => {
        setEditTenant({
            tenantID: tenantID,
            firstname: firstname,
            lastname: lastname,
            unit: unit
        })

    }

    const updateTenantDetails = () => {

        updateDoc(doc(db,'tenants',editTenant.tenantID), { 
            firstname: editTenant.firstname,
            lastname: editTenant.lastname,
            unit: editTenant.unit,
          })
    }

    return (
        <>

        <h1>Home Page</h1>
        <button className='border-2 border-black p-2 bg-sky-200 hover:bg-sky-400' onClick={Logout}>Logout</button>
        <hr />
        <h5>Add a new tenant</h5>
        <input type="text" placeholder='First Name' 
        onChange={(e) => setTenant({...tenant, firstname: e.target.value})} value={editTenant.firstname}
        />
        <input type="text" placeholder='Last Name'
        onChange={(e) => setTenant({...tenant, lastname: e.target.value})} value={editTenant.lastname}
        />
        <input type="text" placeholder='Unit'
        onChange={(e) => setTenant({...tenant, unit: e.target.value})} value={editTenant.unit}
        />
        <button className='border-2 border-black p-2 bg-blue-500 hover:bg-blue-700' onClick={addTenant}>Add+</button>
        <button className='border-2 border-black p-2 bg-yellow-500 hover:bg-yellow-700' onClick={updateTenantDetails}>Update</button>
        <br />
        <br />
        <hr />
        <p>Units Occupied: {tenantList.length}/2</p>
        <Link to='/payments' className='text-blue-500 underline hover:no-underline hover:text-blue-700'>Payments</Link>

        {
            tenantList.map ((showTenants) =>
            <Tenants 
            key = {showTenants.id}
            firstname = {showTenants.firstname}
            lastname = {showTenants.lastname}
            unit = {showTenants.unit}
            tenantID = {showTenants.tenantID}
            deleteTenant = {deleteTenant}
            setUpdate = {setUpdate}

            />
            )
        }
        </>
    )
}
export default Home;