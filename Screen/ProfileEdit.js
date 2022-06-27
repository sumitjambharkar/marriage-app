import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Button } from "native-base";

const ProfileEdit = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.img}>
          <Image
            style={{ width: 120, height: 120, borderRadius: 60 }}
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
          <Text style={{ paddingTop: 15, fontSize: 18 }}>Sumit Jambhakar</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.lable}>Mobile No</Text>

          <TextInput
            style={styles.input}
            placeholder="Type here to"
          ></TextInput>

          <Text style={styles.lable}>Email id</Text>

          <TextInput
            style={styles.input}
            placeholder="Type here to"
          ></TextInput>

          <Text style={styles.lable}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Type here to"
          ></TextInput>

          <Text style={styles.lable}>Work</Text>

          <TextInput
            style={styles.input}
            placeholder="Type here to"
          ></TextInput>

          <Text style={styles.lable}>Date</Text>

          <TextInput
            style={styles.input}
            placeholder="Type here to"
          ></TextInput>

         <View style={{display:"flex", alignItems:"center"}}>
         <Text style={styles.button}>Update</Text>
         </View>
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
    height: 45,
    textAlign: "center",
    backgroundColor: "#FFA500",
    borderRadius:20,
    padding: 10,
    letterSpacing:2,

  },
});

export default ProfileEdit;
