import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
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

    const [tenantList, setTenantList] = useState([])

    useEffect (() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserProfile({
                    email: user.email,
                    username: user.displayName
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

    const goToPayments = () => {
        navigate('/payments')
    }

    return (
        <>

        <h1>Home Page</h1>
        <button className='border-2 border-black p-2 bg-sky-200 hover:bg-sky-400' onClick={Logout}>Logout</button>
        <hr />
        <h5>Add a new tenant</h5>
        <input type="text" placeholder='First Name' 
        onChange={(e) => setTenant({...tenant, firstname: e.target.value})} value={tenant.firstname}
        />
        <input type="text" placeholder='Last Name'
        onChange={(e) => setTenant({...tenant, lastname: e.target.value})} value={tenant.lastname}
        />
        <input type="text" placeholder='Unit'
        onChange={(e) => setTenant({...tenant, unit: e.target.value})} value={tenant.unit}
        />
        <button className='border-2 border-black p-2 bg-blue-500 hover:bg-blue-700' onClick={addTenant}>Add+</button>
        <br />
        <br />
        <hr />
        <p>Units Occupied: {tenantList.length}/2</p>
        <Link to='/payments'>Payments</Link>

        {
            tenantList.map ((showTenants) =>
            <Tenants 
            key = {showTenants.id}
            firstname = {showTenants.firstname}
            lastname = {showTenants.lastname}
            unit = {showTenants.unit}
            tenantID = {showTenants.tenantID}
            deleteTenant = {deleteTenant}

            />
            )
        }
        </>
    )
}
export default Home;