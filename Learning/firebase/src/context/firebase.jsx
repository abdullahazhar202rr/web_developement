import { createContext } from "react";
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyCP2G7bvOhYzznhkoBcTS1yb82A1X51WLo",
    authDomain: "password-mana-4811c.firebaseapp.com",
    projectId: "password-mana-4811c",
    storageBucket: "password-mana-4811c.firebasestorage.app",
    messagingSenderId: "454966742913",
    appId: "1:454966742913:web:5c2a11f5670235fd26a280",
    measurementId: "G-SYC8FN2H35",
    databaseURL: "https://password-mana-4811c-default-rtdb.firebaseio.com",
  };


const firebaseapp=initializeApp(firebaseConfig)
const firebaseauth=getAuth(firebaseapp)
const database=getDatabae(firebaseapp)


const firebaseContext=createContext(null)
export const usefirebase=createContext(firebaseContext)
export const firebaseProvider=(props)=>{
    //emailpassword create function
    //putdata function
    <firebaseContext.Provider>
        {props.children}
    </firebaseContext.Provider>
}