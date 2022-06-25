import React,{useState} from 'react'
import {KeyboardAvoidingView, Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err ,setErr] = useState("")
  
  const navigation = useNavigation()

  const getData =async ()=> {
    console.log(email,password);
      try{
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result);
        navigation.navigate("Home")
      }catch (error) {
        setErr("invalid login credentials !")
        setEmail("");
        setPassword("");
      }  
  }
  
  
  
  return (
    <>
    
     <NativeBaseProvider>
            <Center flex={1} px="3">
            <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="2xl" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Welcome back
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="md">
          Login to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <Text style={{color:"red"}}>{err}</Text>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input  value={email} onChangeText={(getEmail)=>setEmail(getEmail)} type='email' placeholder='Email' />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input  value={password} onChangeText={(getPassword)=>setPassword(getPassword)} placeholder='Password' type="password" />
            <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button _text={{
            fontWeight: "bold",
            fontSize: "md"
          }}  onPress={getData}  mt="2" colorScheme="amber">
            Login
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              I'm a new user.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }}  onPress={()=>navigation.navigate('SignUp')}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
            </Center>
          </NativeBaseProvider>
         
          </>
  )
}

export default LoginScreen;