import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot} from "firebase/firestore";
import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'


function GuestView() {
    
    return (
        <div className="mt-60">
        <h5>This is the guest page</h5>
        </div>
        )
}


export default GuestView;