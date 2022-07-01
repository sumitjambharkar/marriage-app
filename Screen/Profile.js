import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView } from "react-native";
import {db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import UserAvatar from 'react-native-user-avatar';




const Profile = () => {
  
  const navigation = useNavigation()
  const {logout,currentUser}  = useAuth()
  const [data, setData] = useState("");
  const [sdata,setSData] = useState("")


  useEffect(() => {
      if (currentUser.uid) {
        db.collection("users")
          .doc(currentUser.uid)
          .onSnapshot((snapshot) => {
            setData(snapshot.data());
        });
      }
      db.collection("users").doc(currentUser.uid).collection("profile")
      .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setSData(doc.data());
          });
        });
  }, [currentUser]);

  
  
  function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  return (
    <>
    
     <SafeAreaView>
     <ScrollView>
        <View style={styles.section}>
         <View style={{backgroundColor:"#FFA500",padding:10}}>
         <View style={styles.container}>
            <Text style={{fontSize:18}}>MarriageOrbit</Text>
            <Text style={{fontSize:18}} onPress={logout}>
              Logout
            </Text>
          </View>
          
          <View style={styles.logo} >
             <UserAvatar size={150} name={data.displayName}
             src={data.image || null }
             />
          </View>
         </View>

          <View style={{display:"flex", flexDirection:"row", borderBottomWidth:1, borderBottomColor:"#ccc"}}>
           <View style={{width:"35%", padding:15}}>
            <Text style={{fontSize:18,}}>Name   </Text>
           </View>
           <View style={{width:"65%",paddingTop:15}}>
            <Text style={{fontSize:18,}}>{data.displayName} </Text>
            </View>                           
           </View>

           <View style={{display:"flex", flexDirection:"row", borderBottomWidth:1, borderBottomColor:"#ccc"}}>
           <View style={{width:"35%", padding:15}}>
            <Text style={{fontSize:18,}}>Gender </Text>
           </View>
           <View style={{width:"65%",paddingTop:15}}>
            <Text style={{fontSize:18,}}>{data.gender}</Text>
            </View>                           
           </View>

           <View style={{display:"flex", flexDirection:"row", borderBottomWidth:1, borderBottomColor:"#ccc"}}>
           <View style={{width:"35%", padding:15}}>
            <Text style={{fontSize:18,}}>Age       </Text>
           </View>
           <View style={{width:"65%",paddingTop:15}}>
            <Text style={{fontSize:18,}}>{calculate_age(new Date(data.birth))}</Text>
            </View>                           
           </View>

           <View style={{display:"flex", flexDirection:"row", borderBottomWidth:1, borderBottomColor:"#ccc"}}>
           <View style={{width:"35%", padding:15}}>
            <Text style={{fontSize:18,}}>Height   </Text>
           </View>
           <View style={{width:"65%",paddingTop:15}}>
            <Text style={{fontSize:18,}}>{sdata.height} </Text>
            </View>                           
           </View>

           <View style={{display:"flex", flexDirection:"row", borderBottomWidth:1, borderBottomColor:"#ccc"}}>
           <View style={{width:"35%", padding:15}}>
            <Text style={{fontSize:18,}}>Mobile No  </Text>
           </View>
           <View style={{width:"65%",paddingTop:15}}>
            <Text style={{fontSize:18,}}>{data.number}</Text>
            </View>                           
           </View>

           <View style={{display:"flex", flexDirection:"row", borderBottomWidth:1, borderBottomColor:"#ccc"}}>
           <View style={{width:"35%", padding:15}}>
            <Text style={{fontSize:18,}}>Email Id</Text>
           </View>
           <View style={{width:"65%",paddingTop:15}}>
            <Text style={{fontSize:18,}}>{data.email}</Text>
            </View>                           
           </View>

           <View style={{display:"flex", flexDirection:"row", borderBottomWidth:1, borderBottomColor:"#ccc"}}>
           <View style={{width:"35%", padding:15}}>
            <Text style={{fontSize:18,}}>City </Text>
           </View>
           <View style={{width:"65%",paddingTop:15}}>
            <Text style={{fontSize:18,}}>{sdata.city}</Text>
            </View>                           
           </View>
           
           <View style={{padding:10, display:"flex", alignItems:"center"}}>
           <Text style={styles.button} onPress={()=>navigation.navigate('Edit')}>Edit Profile</Text>
           </View>
           
              
            </View>
        </ScrollView>
        </SafeAreaView>
      
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  section: {
    height: "100%",
    width: "100%",
    paddingTop:30
  },
  container: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    padding:10,
  },
  logo: {
    display: "flex",
    alignItems:"center",
    marginTop:30,
  },
  button: {
    width: "50%",
    marginTop:1,
    height: 45,
    textAlign: "center",
    backgroundColor: "#FFA500",
    padding: 10,
    letterSpacing:2,
    borderRadius:20,

  },

});
