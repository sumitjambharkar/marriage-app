import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBWlKemtlMnJRcQIJA3cjxL8PunlZE26Vg",
  authDomain: "marriage-d7c53.firebaseapp.com",
  databaseURL: "https://marriage-d7c53-default-rtdb.firebaseio.com",
  projectId: "marriage-d7c53",
  storageBucket: "marriage-d7c53.appspot.com",
  messagingSenderId: "775736086267",
  appId: "1:775736086267:web:b6f74777501621c6286a5e"
};

// Initialize Firebase
const firebaseApp  = firebase.initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const auth = firebase.auth()
const db = firebaseApp.firestore()
export {auth , db ,storage}
export const createUserCollecton =async(user,additionalData)=>{
  if(!user) return;
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists){
    const {email} = user;
    const {displayName} = additionalData;
    const {number} = additionalData;
    const {birth} = additionalData;
    const {gender} = additionalData;
    const {profile} = additionalData;

    try{
      userRef.set({
        email,
        displayName,
        profile,
        birth,
        number,
        createdAt :new Date(),
        gender,
        isOnline:true,
        uid:user.uid,
      })
    }
    catch(err){
      console.log(err);
    }
  }
}
