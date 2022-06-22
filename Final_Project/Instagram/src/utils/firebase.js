import { initializeApp } from "firebase/app";
import { getAuth,
         createUserWithEmailAndPassword , 
         signInWithEmailAndPassword ,
         onAuthStateChanged, 
         signOut } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { getStorage } from"firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC6w5f-p3nj6AOmrb5PvcNvo_rU8rYxMdo",
    authDomain: "welife-4385a.firebaseapp.com",
    projectId: "welife-4385a",
    storageBucket: "welife-4385a.appspot.com",
    messagingSenderId: "913305088412",
    appId: "1:913305088412:web:d61de1e78cc10a45a5d859",
    measurementId: "G-L1DJG2SX42"
  };

const firebase = initializeApp(firebaseConfig);
const auth= getAuth();

export default firebase;
export function signup(email,password){
    return createUserWithEmailAndPassword(auth, email, password);
}
export function login(email,password){
    return signInWithEmailAndPassword(auth,email,password);
}
export function logout(){
    return signOut(auth);
}

export function useAuth(){
    const [currentUser,setCurrentUser]=useState();
    useEffect(()=>{
        const unsub=onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
        });
        return unsub;
    },[])
    return currentUser;
}
export const storage =getStorage(firebase);