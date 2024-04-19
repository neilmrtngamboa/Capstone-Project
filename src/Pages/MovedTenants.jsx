import firebaseApp from '../FirebaseConfig/FirebaseConfig.jsx'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

function MovedTenants () {
    return (
        <></>
    )
}

export default MovedTenants