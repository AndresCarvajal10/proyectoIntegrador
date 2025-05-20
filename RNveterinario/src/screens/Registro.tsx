import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

type RootStackParamList = {
  login: undefined;
  register: undefined;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Registro'>

const Registro = () => {

  const navigation = useNavigation<NavigationProps>();

  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');

  const disabledButton = (
    username !== '' &&
    apellido !== '' &&
    email !== '' &&
    direccion !== '' &&
    telefono !== '' &&
    password !== ''
  ) ? false : true;

  const handleRegister = () => {
    if (!username || !apellido || !email || !direccion || !telefono || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }


    const requestData = {
      username,
      nombre,
      apellido,
      email,
      direccion,
      telefono,
      password,
    };

    console.log(JSON.stringify(requestData));

    fetch('https://302b-190-99-252-240.ngrok-free.app/integrador/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud de registro');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.responseCode === "0000") {
          Alert.alert('Éxito', 'Usuario registrado correctamente');
          navigation.navigate("login")
        } else {
          Alert.alert('Error', 'Ha ocurrido un error al registrar el usuario');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Ocurrió un error al registrar el usuario');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate en la clínica veterinaria</Text>
      <View style={styles.containerImage}>
        {/* Imagen Local */}
        <Image source={require('../../assets/logo.png')} style={styles.image} />
      </View>

      <View style={styles.divRow}>
        <TextInput
          style={styles.inputDouble}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.inputDouble}
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.divRow}>
        <TextInput
          style={styles.inputDouble}
          placeholder="Dirección"
          value={direccion}
          onChangeText={setDireccion}
        />
        <TextInput
          style={styles.inputDouble}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        disabled={disabledButton}
        style={[styles.button, { backgroundColor: disabledButton ? 'gray' : 'blue' }]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
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
    zIndex: 1,
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
  divRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  inputDouble: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '47%',
  },
});

export { Registro };
