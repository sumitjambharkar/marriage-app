import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import { db } from "../firebase";
import { StyleSheet, Text, View, Image,Button } from "react-native";
import User from "./User";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";



const Matches = () => {
  
  const [data, setData] = useState([]);
  const [profile,setProfile] = useState('')
  const navigation = useNavigation();
  const {currentUser } = useAuth()

  
  useEffect(() => {
    const unSub = db.collection("users").onSnapshot((snapshot) => {
      setData(
        snapshot.docs
        .filter((doc)=>(doc.id!==currentUser.uid))
        .map((doc) => ({
          id: doc.id,
          data:doc.data()
        }))
      );
      });
      return ()=> unSub()
  }, []);

  useEffect(() => {
    if (currentUser.uid) {
      db.collection("users").doc(currentUser.uid).onSnapshot(snapshot=>(
        setProfile(snapshot.data())
      ))
    }
  }, [currentUser.uid])
  

  const getData =async(doc) => {
      const uid = doc.data.uid
      const displayName = doc.data.displayName
      const image = doc.data.image
    if(currentUser.uid){
      db.collection("users").doc(currentUser.uid).collection("chat").doc(uid).set({
        uid,
        displayName,
        image:image || null,
      })
      if (uid) {
        db.collection("users").doc(uid).collection("chat").doc(currentUser.uid).set({
          uid : currentUser.uid,
          displayName: profile.displayName,
          image : profile.image || null,
        })
      }
      navigation.navigate("Chat",{
        uid,displayName,image
        })
    }
    
   
  };

  return (
    <View style={styles.container}>
      <Swiper
      dotStyle={{display:"none"}}
      activeDotStyle={{display:"none"}}
        >
        {data.filter((doc)=>(profile.gender!==doc.data.gender)).map((doc,i) => (
          <User key={i} birth={doc.data.birth} getData={getData} uid={doc.data.uid} doc={doc} />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 34,
    paddingBottom: 34,
  },
});

export default Matches;
