import { View, Text,StyleSheet,Image, TouchableOpacity} from "react-native";
import React from "react";


const ChatList = ({doc,selectUser}) => {
  return (
    <TouchableOpacity onPress={()=>selectUser(doc)}>
        <View style={styles.container}>
      <View style={styles.profle}>
        <View style={styles.image}>
            <Image style={{width:70,height:70,borderRadius:50}} source={{uri:doc.data.image}} alt="s" />
        </View>
        <View style={styles.name}>
            <Text style={{fontSize:20,fontWeight:"700"}}>{doc.data.displayName}</Text>
            <Text>Message</Text>
        </View>
      </View>
      <View>
        <Text>Time</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container : {
        display:"flex",
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center",
        flexDirection:"row",
        padding:6,
        height:90,
        paddingLeft:18,
        paddingRight:18,
        borderBottomWidth:1,
        borderColor:"#ccc"
    },
    profle : {
        display: "flex",
        flexDirection:"row",
        alignItems:"center"
    },
    image : {
        width:70,
        height:70,
        backgroundColor:"gray",
        borderRadius:50
    },
    name : {
        padding:18
    }
})

export default ChatList;
