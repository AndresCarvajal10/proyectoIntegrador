import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

type RootStackParamList = {
    login: undefined;
    register: undefined;
  };
  
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'login'>

const Login = () => {

    const navigation = useNavigation<NavigationProps>(); 

    const {startSessionUser} = useContext(AuthContext);


    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const disabledButton = (user != '' && password != '') ? false : true;
    const loginSend = () => {
      if (user && password) {
        // Fetch al backend.
        if (user === "admin" && password === "123") {
          startSessionUser();
        }
        
      }
      console.log("Error: ", user, password);
    }
// andres es gay
  return (
    <View style={styles.container}>

  <View style={styles.containerImage}>
    {/* Imagen Local */}
    <Image
      source={require('../../assets/logo-illustration.png')}
      style={styles.image}
    />
   
   
  </View>
      <Text style={styles.title}>Login</Text>
      
      <TextInput placeholder="Username" style={styles.input} value={user} onChangeText={setUser} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <View style={{alignItems: 'center'}}>
      <TouchableOpacity disabled={disabledButton} style={[styles.buttons, {backgroundColor: disabledButton ? 'gray' : 'blue'}]} onPress={loginSend} >
      <Text style={styles.pageNavigation}>Iniciar Sesión</Text>
      </TouchableOpacity>
      </View>
      <View style={{width: '25%'}}>
      <TouchableOpacity  onPress={() => navigation.navigate("Registro")} >
      <Text style={{color: 'blue'}}>Registrar</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pageNavigation: {
    fontSize:14,
    fontWeight:'500',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttons:{
    backgroundColor: 'blue',
    width: '100%',
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 20
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  containerImage: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Login;
