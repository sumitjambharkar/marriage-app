import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import React from "react";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useEffect,useState } from "react";
import { updateEmail, updatePassword } from "firebase/auth";


const ProfileEdit = () => {
  const {currentUser} = useAuth()
  const [data,setData] = useState("")
  const [number,setNumber] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  useEffect(() => {
    const unSub = db.collection("users").doc(currentUser.uid).onSnapshot(snapshot=>(
      setData(snapshot.data())
    ))
  
    return () => {
      unSub()
    }
  }, [])
  
 const updateNumber =(e)=> {
  e.preventDefault();
    db.collection("users").doc(currentUser.uid).update({
     number:number
    })
    setNumber("")
 }
 const changeEmail =async (e) => {
  e.preventDefault();
    try{
      const result = await updateEmail(currentUser,email)
      db.collection("users").doc(currentUser.uid).update({
        email:email
      })
      console.log(result);
    }
    catch(error){
      console.log(error);
    }
    setEmail("")
 }
 const changePassword =async(e) => {
  e.preventDefault();
    try {
      const result = await updatePassword(currentUser,password)
      console.log(result)
    }
    catch(error){
      console.log(error)
    }
    setPassword("")
  }
  console.log(data.displayName);
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.img}>
          <Image
            style={{ width: 120, height: 120, borderRadius: 60,backgroundColor:"gray" }}
            source={{ uri: data.image }}
          />
          <Text style={{ paddingTop: 15, fontSize: 26 }}>{data.displayName}</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.lable}>Mobile No</Text>

          <TextInput
            keyboardType="numeric"
            onChangeText={(text)=>setNumber(text)}
            style={styles.input}
            placeholder="Type here to"
            value={number}
          ></TextInput>

          <TouchableOpacity disabled={!number}  onPress={updateNumber}>
         <View style={{display:"flex", alignItems:"center"}}>
         <Text style={styles.button}>Update Contact</Text>
         </View>
         </TouchableOpacity>
         

          <Text style={styles.lable}>Email id</Text>

          <TextInput
          onChangeText={(text)=>setEmail(text)}
          value={email}
            style={styles.input}
            placeholder="Type here to"
          ></TextInput>

         <TouchableOpacity disabled={!email}  onPress={changeEmail}>
         <View style={{display:"flex", alignItems:"center"}}>
         <Text style={styles.button}>Change Email Id</Text>
         </View>
         </TouchableOpacity>

          <Text style={styles.lable}>Password</Text>

          <TextInput
          onChangeText={(text)=>setPassword(text)}
          value={password}
            style={styles.input}
            placeholder="Type here to"
          ></TextInput>

         <TouchableOpacity disabled={!password}  onPress={changePassword}>
         <View style={{display:"flex", alignItems:"center"}}>
         <Text style={styles.button}>Change Password</Text>
         </View>
         </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ffa500",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius:10,
  },
  img: {
    width: "100%",
    backgroundColor: "#ffa500",
    alignItems: "center",
    padding: 15,
  },
  lable: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 2,
    margin: 10,
  },
  form: {
    padding: 10,
  },
  button: {
   width: "50%",
    marginTop: 20,
    height: 40,
    textAlign: "center",
    backgroundColor: "#FFA500",
    borderRadius:20,
    padding: 10,
    letterSpacing:2,
    borderColor:"black",
    borderWidth:1


  },
});

export default ProfileEdit;
