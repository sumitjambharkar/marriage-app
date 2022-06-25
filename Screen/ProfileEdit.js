import { View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'

const ProfileEdit = () => {
  return (
    <View>
      <View></View>
      <Text>Full Name</Text>
      <Text>Full Name</Text>

      <View>
      <Text>Mobile No</Text>
         <View style={{padding: 5}}>           
      <TextInput style={styles.input} placeholder="Type here to"></TextInput>
      </View>
      </View>
      

      <View>
      <Text>Email id</Text>
         <View style={{padding: 5}}>           
      <TextInput style={styles.input} placeholder="Type here to"></TextInput>
      </View>
      </View>

      <View>
      <Text>Password</Text>
         <View style={{padding: 5}}>           
      <TextInput style={styles.input} placeholder="Type here to"></TextInput>
      </View>
      </View>

      <View>
      <Text></Text>
         <View style={{padding: 5}}>           
      <TextInput style={styles.input} placeholder="Type here to"></TextInput>
      </View>
      </View>

      <View>
      <Text>Mobile No</Text>
         <View style={{padding: 5}}>           
      <TextInput style={styles.input} placeholder="Type here to"></TextInput>
      </View>
      </View>
    
    </View>
  )
}

const styles=StyleSheet.create({
input : {
  width: "100%",
  height: 40,
  borderColor:"black",
  borderWidth:1,
  paddingLeft:5,
}
})

export default ProfileEdit;