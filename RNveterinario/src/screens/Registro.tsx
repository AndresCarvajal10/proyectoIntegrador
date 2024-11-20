import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
 const Registro = () => {

   // Estados para manejar los valores del formulario
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const disabledButton = (username != '' && password != '' && email != '' && confirmPassword != '') ? false : true;
  
   // Función de validación y envío de datos
   const handleRegister = () => {

     if (!username || !email || !password || !confirmPassword) {
       Alert.alert('Error', 'Por favor, completa todos los campos.');
       return;
     }
     if (password !== confirmPassword) {
       Alert.alert('Error', 'Las contraseñas no coinciden.');
       return;
     }

     const requestData = {
      username,
      email,
      password,
      
    };
    console.log(JSON.stringify(requestData)); 

     // Aquí puedes realizar la llamada a tu API para registrar al usuario
     fetch('https://871c-181-49-197-21.ngrok-free.app/integrador/register', {
      method: 'POST', headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(requestData), 
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud de registro');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        Alert.alert('Éxito', 'Usuario registrado correctamente');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Ocurrió un error al registrar el usuario');
      });
   };

  return (

    <View style={styles.container}>
     <Text style={styles.title}>
      Registrate a la clinica veterinaria
      </Text>     
    <View style={styles.containerImage}>
    {/* Imagen Local */}
    <Image
      source={require('../../assets/logo.png')}
      style={styles.image}
    />
   
   
  </View>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <TouchableOpacity disabled={disabledButton} style={[styles.button, {backgroundColor: disabledButton ? 'gray' : 'blue'}]}  onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
   

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    zIndex:1
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  containerImage: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});


export {Registro};