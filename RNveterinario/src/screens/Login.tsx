import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
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
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Username" style={styles.input} value={user} onChangeText={setUser} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <TouchableOpacity  onPress={() => navigation.navigate("Registro")} >
      <Text style={styles.title}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={loginSend} >
      <Text style={styles.title}>Loguearse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default Login;
