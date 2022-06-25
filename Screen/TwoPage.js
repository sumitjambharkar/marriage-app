import { useNavigation } from "@react-navigation/native";
import { Select,ScrollView, Button,FormControl,Input, Text, Box, CheckIcon, Center, NativeBaseProvider } from "native-base";
import React, { useState } from 'react';
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const religionArry = ["Hindu","Muslim","Christian","Sikh","Parsi","Jain","Buddhist","Jewish","No_Religion","Spiritual","Other"]

const toungeArry = ['Hindi', 'Marathi', 'Punjabi', 'Bengali', 'Gujarati', 'Urdu', 'Telugu', 'Kannada', 'Tamil', 'Odia' , 'Marwari', 'Aka' ,'Arabic', 'Arunachali' , 'Assamese', 'Awadhi', 'Baluchi', 'Bengali', 'Bhojpuri', 'Bhutia', 'Brahui', 'Brij', 'Burmese', 'Chattisgarhi', 'Chinese', 'Coorgi', 'Dogri', 'English', 'French', 'Garhwali', 'Garo' ,'Gujarati', 'Himachali', 'Pahari', 'Hindi', 'Hindko', 'Kakbarak', 'Kanauji', 'Kannada', 'Kashmiri', 'Khandesi','Khasi','Konkani', 'Koshali', 'Kumaoni', 'Kutchi', 'Ladakhi', 'Lepcha', 'Magahi', 'Maithili', 'Malay', 'Malayalam', 'Manipuri', "Marathi", 'Marwari', 'Miji', 'Mizo', 'Monpa', 'Nepali', 'Odia', 'Pashto', 'Persian', 'Punjabi', 'Rajasthani', 'Russian', "Sanskrit", "Santhali", "Seraiki", "Sindhi", "Sinhala", "Sourashtra", "Spanish", "Swedish","Tagalog", "Tamil", 'Telugu', 'Tulu', 'Urdu']

const workArry = ["Private Company","Goverment / Public Sector","Defense / Civil Services","Business / Self Employed","Not Working"]

const TwoPage = () => { 
  const [religion,setReligion] = useState("")
  const [tounge,setTounge] = useState("")
  const [work,setWork] = useState("")
  const [qualification,setQualification] = useState("")
  const [collage,setCollage] = useState("")
  const [income,setIncome] = useState("")
    const navigation = useNavigation()
    const {currentUser} = useAuth()
   
   const submit = () => {
        if(currentUser.uid){
          db.collection("users").doc(currentUser.uid).collection("details").add({
            religion:religion,
            tounge:tounge,
            work:work,
            income:income,
            collage:collage,
            qualification:qualification
          })
            
        }
        navigation.navigate('Home')
   }
    
  return (
    
      <NativeBaseProvider>
      <Center px="1">
      <Center h="100%" w="100%">
      <ScrollView maxW="300" h="80" _contentContainerStyle={{px: "4px",minW: "72"}}>
      <Box w="100%" maxW="300" py="8">
        <Text >Just a few question your about.</Text>
        <Text style={{marginTop:15,color:"#0008"}}>Your Religion</Text>
        <Select  minWidth="200" accessibilityLabel="Choose Religion" placeholder="Choose Religion" mt={1} selectedValue={religion}  onValueChange={(itemState)=>setReligion(itemState)} >
          {religionArry.map(ele=>(
              <Select.Item key="religion"  label={ele}  value={ele} />
          ))}
        </Select>
        <Text style={{marginTop:15,color:"#0008"}}>Your Mother Tongue</Text>
        <Select  minWidth="200" accessibilityLabel="Choose Mother Tongue" placeholder="Choose Mother Tongue" mt={1} selectedValue={tounge}  onValueChange={(itemState)=>setTounge(itemState)} >
          {toungeArry.map(ele=>(
              <Select.Item key="tounge"  label={ele}  value={ele} />
          ))}
        </Select>
        <Text style={{marginTop:15,color:"#0008"}}>Your works with</Text>   
        <Select  minWidth="200" accessibilityLabel="Choose Works" placeholder="Choose works" mt={1} selectedValue={work}  onValueChange={(itemState)=>setWork(itemState)} >
          {workArry.map(ele=>(
              <Select.Item key="work"  label={ele}  value={ele} />
          ))}
        </Select>
        <Text style={{marginTop:15,color:"#0008"}}>Your highest Qualification</Text>
        <FormControl>
            <Input type='text' placeholder='Enter Your Qualification' value={qualification} onChangeText={(textValue)=>setQualification(textValue)} />
          </FormControl>
         <Text style={{marginTop:15,color:"#0008"}}>Your Collage</Text>
          <FormControl>
            <Input type='text' placeholder='Enter your Collage' value={collage} onChangeText={(textValue)=>setCollage(textValue)}  />
          </FormControl>
          <Text style={{marginTop:15,color:"#0008"}}>Your Annual Income</Text>
          <FormControl>
            <Input type='text' placeholder='Enter your Income' value={income} onChangeText={(textValue)=>setIncome(textValue)} />
          </FormControl>

        <Text style={{marginTop:30, textAlign:"center", fontSize:12,color:"#0008"}}>Not particuler about my partner's community</Text>
        <Button onPress={submit} mt="2" colorScheme="amber">
            Contiune
          </Button>
      </Box>
      </ScrollView>
      </Center>
      </Center>
    </NativeBaseProvider>
  )
}


export default TwoPage;