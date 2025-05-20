import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import { RootStackParamList } from '../stacks/OutSessionStack';


type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'login'>

const Login = () => {

  const navigation = useNavigation<NavigationProps>();

  const { startSessionUser } = useContext(AuthContext);


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const disabledButton = (username != '' && password != '') ? false : true;
  const loginSend = () => {
    if (username && password) {
      const requestData = {
        username,
        password,
      };

      console.log(JSON.stringify(requestData));

      fetch('https://302b-190-99-252-240.ngrok-free.app/integrador/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la solicitud de login');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.responseCode === "0000") {
            startSessionUser();
          } else {
            Alert.alert('Error', 'Ha ocurrido un error al loggear el usuario');
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert('Error', 'Ocurrió un error al loggear el usuario');
        });
    };
  }

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

      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity disabled={disabledButton} style={[styles.buttons, { backgroundColor: disabledButton ? 'gray' : 'blue' }]} onPress={loginSend} >
          <Text style={styles.pageNavigation}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '25%' }}>
        <TouchableOpacity onPress={() => navigation.navigate("Registro")} >
          <Text style={{ color: 'blue' }}>Registrar</Text>
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
    fontSize: 14,
    fontWeight: '500',
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
  buttons: {
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
