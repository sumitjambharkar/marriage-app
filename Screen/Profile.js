import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { Avatar, VStack, Center, NativeBaseProvider, Input } from "native-base";
import {db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";


const Profile = () => {

  const navigation = useNavigation()
  const {logout,currentUser}  = useAuth()
  const [image,setImage] = useState(null)
  const [data, setData] = useState("");

  useEffect(() => {
      if (currentUser.uid) {
        db.collection("users")
          .doc(currentUser.uid)
          .onSnapshot((snapshot) => {
            setData(snapshot.data());
        });
      }
  }, [currentUser]);

  

  return (
    <>
    <SafeAreaProvider>
      <NativeBaseProvider>
        <View style={styles.head}>
          <View style={styles.container}>
            <Text style={styles.logo}>MarriageOrbit</Text>
            <Text onPress={logout} style={styles.logo}>
              Logout
            </Text>
          </View>
          <Center mt="10">
            <Avatar
              size="2xl"
              source={{uri:data.image}}
            />
            
          </Center>
          <Center>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <View
                style={{ display: "flex", flexDirection: "row", margin: 8 }}
              >
                
                <Text style={{ fontSize: 18 }}>Name :</Text>
                <Text style={{ fontSize: 18 }}> {data.displayName}</Text>
              </View>
              <View
                style={{ display: "flex", flexDirection: "row", margin: 8 }}
              >
                <Text style={{ fontSize: 18 }}>Gender :</Text>
                <Text style={{ fontSize: 18 }}> {data.gender}</Text>
              </View>
              <View
                style={{ display: "flex", flexDirection: "row", margin: 8 }}
              >
                <Text style={{ fontSize: 18 }}>Age :</Text>
                <Text style={{ fontSize: 18 }}> {data.birth}</Text>
              </View>
              <View
                style={{ display: "flex", flexDirection: "row", margin: 8 }}
              >
                <Text style={{ fontSize: 18 }}>Height :</Text>
                <Text style={{ fontSize: 18 }}> 5.7</Text>
              </View>
              <View
                style={{ display: "flex", flexDirection: "row", margin: 8 }}
              >
                <Text style={{ fontSize: 18 }}>Country :</Text>
                <Text style={{ fontSize: 18 }}> India</Text>
              </View>
              <Text onPress={()=>navigation.navigate('Edit')}>Edit Profile</Text>
            </View>
          </Center>
        </View>
      </NativeBaseProvider>
      </SafeAreaProvider>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    margin: 30,
  },
  logo: {
    fontSize: 22,
    
  },
  head: {
    backgroundColor: "#FFA50080",
    height: "30%",
    padding: 12,
    width: "100%",
  },
});
