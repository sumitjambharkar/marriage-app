import React, { useState } from "react";
import {
  Box,
  Text,
  Select,
  CheckIcon,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  View,
  ScrollView
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import DateField from 'react-native-datefield';
import { auth,createUserCollecton } from "../firebase";



const SignScreen = () => {

  const [profile,setProfile] = useState("")
  const [err,setErr] = useState("")
  const [displayName,setDisplayName] = useState("")
  const [number,setNumber] = useState("")
  const [gender ,setGender] = useState("")
  const [birthDate,setBirthDate] = useState("")
  const [email ,setEmail] = useState("")
  const [password ,setPassword] = useState("")
  const navigation = useNavigation()
  const birth = birthDate.toString().slice(4, 15);

  const getData = async()=> {
    // const dateOfBirth = birth.toString().slice(4, 15);
    // const {profile,displayName,email,password,gender,birth,number} = data
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        await createUserCollecton(user, { displayName,birth, number, gender,profile });
        navigation.navigate('Personal Details') 
        
      }catch (err) {
        navigation.navigate('SignUp')
        setErr("email already exists")
        
      }

  }
  return (
    <>
      <NativeBaseProvider>
        <Center px="3">
          <Center w="100%" h="100%">
          <ScrollView maxW="300" h="80" _contentContainerStyle={{px: "4px",minW: "72"}}>
            <Box safeArea w="100%" maxW="290" py="4">
              <Heading
                size="lg"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                fontWeight="semibold"
              >
                Welcome
              </Heading>
              <Heading
                mt="1"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="medium"
                size="xs"
              >
                Sign up to continue!
              </Heading>
              <Text style={{color:"red"}}>{err}</Text>
              <VStack space={1} mt="2">
                <Select
                  selectedValue={profile}
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Profile for"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemProfile) => setProfile(itemProfile)}
                >
                  <Select.Item label="My Son" value="My Son" />
                  <Select.Item label="My Self" value="My Self" />
                  <Select.Item label="My Daughter" value="My Daughter" />
                  <Select.Item label="My Sister" value="My Sister" />
                  <Select.Item label="My Brother" value="My Brother" />
                </Select>
                <FormControl>
                  <FormControl.Label>Full Name</FormControl.Label>
                  <Input value={displayName} onChangeText={(itemName)=>setDisplayName(itemName)} placeholder="Full Name"/>
                </FormControl>
                <FormControl.Label>Gender</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Choose Gender"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  selectedValue={gender}
                  onValueChange={(itemGender)=>setGender(itemGender)}
                >
                  <Select.Item label="Male" value="Male"  />
                  <Select.Item label="Female" value="Female" />
                </Select>
                <FormControl>
                  <FormControl.Label>Mobile No.</FormControl.Label>
                  <Input keyboardType="numeric"  value={number} onChangeText={(itemNumber)=>setNumber(itemNumber)} />
                </FormControl>
                <FormControl>
                <FormControl.Label>Birth Date</FormControl.Label>
                <DateField
                  labelDate="Day"
                  labelMonth="Month"
                  labelYear="Year"
                  containerStyle={{borderWidth:1,borderColor:"#ccc",height:45,borderRadius:4,padding:8}}
                  value={birthDate}
                  onSubmit={(textBirth) => setBirthDate(textBirth)}
                />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input value={email} onChangeText={(itemEmail)=>setEmail(itemEmail)} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input value={password} onChangeText={(itemPassword)=>setPassword(itemPassword)} type="password" />
                </FormControl>
                <Button _text={{
            fontWeight: "bold",
            fontSize: "md"
          }} mt="2" colorScheme="amber" onPress={getData}>
                  Sign Up
                </Button>
              </VStack>
            </Box>
            </ScrollView>
          </Center>
        </Center>
      </NativeBaseProvider>
    </>
  );
};

export default SignScreen;
