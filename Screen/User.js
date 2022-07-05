import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'


const User = ({doc,getData,birth}) => {

    function calculate_age(dob) { 
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

  return (
    <View style={{width:"100%",height:"100%",display:"flex",alignItems:"center"}}>
       <View style={styles.details}>
       <View style={{height:"70%",width:"100%",alignItems:"center"}}><Image style={styles.image} source={{uri:doc.data.image}}alt="image"/></View>
       <View style={styles.card}>
       <Text style={styles.title}>{doc.data.displayName}</Text>
       <Text style={styles.text}>Age       :  {calculate_age(new Date(birth))} Yrs </Text>
       <Text style={styles.text}>Height  :  5.2</Text>
       <Text style={styles.text} onPress={()=>getData(doc)}>Send Message</Text>
       </View>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
    details : {
        position:"absolute",
        paddingTop:30,
        paddingBottom:6,
        bottom:0,
        width:"100%",
        height: "100%",
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24,
        opacity:0.9,
      
    
    },
    image : {
        height:"100%",
        width:"100%",
        resizeMode:"cover",
        position:"relative",
        borderTopRightRadius:24,
        borderTopLeftRadius:24,

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
    },
    card : {
        paddingLeft:"5%",
        paddingTop:"5%",
        backgroundColor:"black",
        height:"30%",
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24
    }
})

export default User;