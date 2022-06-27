import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'

const User = ({doc,getData}) => {
  return (
    <View>
       <Image style={styles.image} source={{uri:doc.data.image}}alt="image"/>
       <View style={styles.details}>
       <Text style={styles.title}>{doc.data.displayName}</Text>
       <Text style={styles.text}>Age   :  24 Yrs </Text>
       <Text style={styles.text}>Height    :  5.2</Text>
       <Text style={styles.text} onPress={()=>getData(doc)}>Send Message</Text>
       </View>
      </View>
  )
}

const styles = StyleSheet.create({
    details : {
        position:"absolute",
        paddingTop:6,
        paddingBottom:6,
        opacity:0.8,
        bottom:0,
        width:"100%",
        paddingLeft:30,
        backgroundColor:"#000002",
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24
    },
    image : {
        height:"100%",
        width:"100%",
        borderRadius:24,
        position:"relative"

    },
    title : {
        fontSize:24,
        fontWeight:"bold",
        color:"#FFA500"
    },
    text : {
        fontSize:18,
        fontWeight:"bold",
        color:"#FFA500"
    }
})

export default User;