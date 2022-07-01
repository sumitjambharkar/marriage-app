import React,{useState} from 'react';
import { useNavigation } from "@react-navigation/native";
import { Select, Button, Text, Box, CheckIcon, Center, NativeBaseProvider,ScrollView } from "native-base";
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';

const stateArry = ["Andhra Pradesh","Arunachal Pradesh","Assam"	,"Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal ","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Nagaland",	"Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"]

const cityArry = ['Mumbai','Delhi','Chennai','Bangalore','Hyderabad','Pune','Kochi','Kolkata']

const maritalArry = ["Never Married","Divorced","Widowed","Awaiting Divorce","Annulled"]

const dietArry = ["veg","Non-Veg","Occasionally Non-Veg","Eggetarian","jain","Vegan"]

const heightArry = ['4.0','4.1','4.2','4.3','4.4','4.5','4.6','4.7','4.8','4.9','5.0','5.1','5.2','5.3','5.4','5.5','5.6','5.7','5.8','5.9','6.0','6.1','6.2','6.3','6.4','6.5','6.6','6.7','6.8','6.9','6.0','7.0','7.1 ']

const communityArry = ['96 Kuli Maratha', 'Agri', 'Ahir', 'Shimpi', 'Ahirwar','Anjana (Chowdary) Patel','Aramari / Gabit',
'Arya Vysya','Bairwa','Balai','Banjara','Barai','Bari','Bhandari','Bhavasar', 'kshatriya','Bhil,','Bhoi',
'Bhoyar','Brahmin - Anaviln Desai','Brahmin - Baidhiki/Vaidhiki','Brahmin - Bardai','Brahmin - Bhargav',
'Brahmin - Daivadnya','Brahmin - Deshastha','Brahmin - Karhade','Brahmin - Khadayata','Brahmin - Khedaval',
'Brahmin - Kokanastha','Brahmin - Mevada','Brahmin - Others','Brahmin - Rajgor','Brahmin - Rarhi/Radhi',
'Brahmin - Rigvedi','Brahmin - Saraswat','Brahmin - Sarua','Brahmin - Shri Gaud','Brahmin - Smartha',
'Brahmin - Tapodhan','Brahmin - Valam','Brahmin - Zalora','CKP','Chambhar','Charan','Daivadnya',  
'Brahmin','Deshastha',  'Brahmin','Deshmukh','Devang Koshthi','Devrukhe Brahmin','Dhanak','Dhangar',
'Dhor / Kakkayya','Gabit','Gavandi','Gawali','Ghisadi','Gomantak','Gond','Gondhali','Gurav','Halba Koshti',
'Holar','Intercaste','Jangam','Jhadav','Jogi (Nath)','Julaha','Kalar','Kanakkan Padanna','Kandara',
'Karhade  Brahmin','Kasar','Kayastha','Khatik','Kokanastha',  'Brahmin','Kokanastha Maratha','Koli',
'Koli Mahadev','Konkani','Kori/Koli','Kosthi','Kshatriya','Kshatriya Raju','Kumaoni Rajput','Kumbhar',
'Kunbi','Kunbi Lonari','Kunbi Maratha','Kunbi Tirale','Kuruva','Leva patil','Lingayath','Lohar',
'Madivala / Dhobi','Mahar','Mair Rajput Swarnkar','Mali','Malwani','Mannan / Velan / Vannan','Maratha',
'Maratha Kshatriya','Matang','Meghwal','Nabit','Nath','Nhavi','Otari','Pallan / Devandra Kula Vellalan',
'Panan','Paravan / Bharatar','Parit','Paswan / Dusadh','Patel','Pathare Prabhu','Patil','Poundra',
'Pulaya / Cheruman','Rajput','Ramoshi','Rigvedi  Brahmin', 'Rohit / Chamar','SC','SKP','ST','Samagar',
'Sambava','Saraswat  Brahmin','Satnami','Savji','Shilpkar','Shimpi/Namdev','Smartha  Brahmin', 'Sonar',
'Sonkar','Suthar','Swakula Sali','Teli','Thandan','Vadar','Vaishnav','Vaishnav Kapol','Vaishnav Khadyata',
'Vaishnav Lad','Vaishnav Modh','Vaishnav Porvad','Vaishnav Shrimali','Vaishnav Sorathaiya','Vaishnav Vania',
'Vaishya Vani','Vani','Vaniya','Vanjari','Vysya','Yadav']




const FirstPage = () => { 
    
    const [state, setState] = useState("")
    const [city,setCity] = useState("")
    const [marital,setMarital] = useState("")
    const [diet,setDiet] = useState("")
    const [height,setHeight] = useState("")
    const [community,setCommunity] = useState("")
    const [error,setError] = useState("")
    const navigation = useNavigation()
    const {currentUser} = useAuth()

    const submit = () => {
      if (!state || !city || !marital || !diet || !height || !community) {
        setError("fill out the Details")
      }else {
        if(currentUser.uid){
          db.collection("users").doc(currentUser.uid).collection("profile").add({
            state:state,
            city:city,
            marital:marital,
            diet:diet,
            height:height,
            community:community
          })
            
        }
      navigation.navigate('Details')
      }
    }
    
  return (
    
      <NativeBaseProvider>
      <Center px="3" >
        <Center h="100%" w="100%">
      <ScrollView maxW="300" h="80" _contentContainerStyle={{px: "4px",minW: "72"}}>
      <Box w="100%" maxW="300" py="8">
          <Text >Thanks for Registering. Now let's build Profile</Text>
          <Text style={{color:"red"}}>{error}</Text>
          <Text style={{marginTop:15,color:"#0008"}}>He lives in*</Text>
        <Select  minWidth="200" accessibilityLabel="Choose State" placeholder="Choose State" mt={1} selectedValue={state}  onValueChange={(itemState)=>setState(itemState)} >
          {stateArry.map(ele=>(
              <Select.Item key="live"  label={ele}  value={ele} />
          ))}
        </Select>
        <Select  minWidth="200" accessibilityLabel="Choose City" placeholder="Choose City" mt={1} selectedValue={city}  onValueChange={(itemState)=>setCity(itemState)} >
          {cityArry.map(ele=>(
              <Select.Item key="city"  label={ele}  value={ele} />
          ))}
        </Select>
        <Text style={{marginTop:15,color:"#0008"}}>His marital status*</Text>
        <Select  minWidth="200" accessibilityLabel="Choose Marital Status" placeholder="Choose Marital Status" mt={1} selectedValue={marital}  onValueChange={(itemState)=>setMarital(itemState)} >
          {maritalArry.map(ele=>(
              <Select.Item key="status"  label={ele}  value={ele} />
          ))}
        </Select>
        <Text style={{marginTop:15,color:"#0008"}}>His Diet*</Text>
        <Select  minWidth="200" accessibilityLabel="Choose His Diet" placeholder="Choose His Diet" mt={1} selectedValue={diet}  onValueChange={(itemState)=>setDiet(itemState)} >
          {dietArry.map(ele=>(
              <Select.Item key="diet"  label={ele}  value={ele} />
          ))}
        </Select>
        <Text style={{marginTop:15,color:"#0008"}}>His height*</Text>
        <Select  minWidth="200" accessibilityLabel="Choose His Height" placeholder="Choose His Height" mt={1} selectedValue={height}  onValueChange={(itemState)=>setHeight(itemState)} >
          {heightArry.map(ele=>(
              <Select.Item key="height"  label={ele}  value={ele} />
          ))}
        </Select>
        <Text style={{marginTop:15,color:"#0008"}}>His sub-community*</Text>
        <Select  minWidth="200" accessibilityLabel="Choose His sub-community" placeholder="Choose His sub-community" mt={1} selectedValue={community}  onValueChange={(itemState)=>setCommunity(itemState)} >
          {communityArry.map(ele=>(
              <Select.Item key="sub"  label={ele}  value={ele} />
          ))}
        </Select>
        
        <Text style={{marginTop:30, textAlign:"center", fontSize:12,color:"#0008"}}>Not particuler about my partner's community</Text>
        <Button onPress={submit}  mt="2" colorScheme="amber">
            Contiune
          </Button>
      </Box>
      </ScrollView>
      </Center>
      </Center>
    </NativeBaseProvider>
  )
}


export default FirstPage;