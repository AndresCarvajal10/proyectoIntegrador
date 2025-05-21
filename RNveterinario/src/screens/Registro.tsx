import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import FullScreenLoader from '../components/FullScreenLoanding';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../components/Input';
import CustomAlert from '../components/CustomAlert';
import { RootStackParamList } from '../stacks/OutSessionStack';



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
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


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

    setLoading(true);
    console.log(JSON.stringify(requestData));

    fetch('https://07c2-181-49-197-21.ngrok-free.app/integrador/register', {
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
          navigation.navigate("Login")
        } else {
          setModalMessage('Ha ocurrido un error al registrar el usuario');
          setModalVisible(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setModalMessage('Error de conexión. Intenta nuevamente.');
        setModalVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          <View style={styles.container}>
            <Text style={styles.title}>Regístrate en la clínica veterinaria</Text>
            <View style={styles.containerImage}>
              {/* Imagen Local */}
              <Image source={require('../../assets/logo.png')} style={styles.image} />
            </View>

            <View style={styles.divRow}>
              <Input
                inputStyle={styles.inputDouble}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
              />
              <Input
                inputStyle={styles.inputDouble}
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
              <Input
                inputStyle={styles.inputDouble}
                placeholder="Dirección"
                value={direccion}
                onChangeText={setDireccion}
                lenght={30}
              />
              <Input
                inputStyle={styles.inputDouble}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
              />
            </View>

            <Input
              inputStyle={styles.input}
              placeholder="Usuario único"
              value={username}
              onChangeText={setUsername}
            />

            <Input
              inputStyle={styles.input}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              security
            />

            <TouchableOpacity
              disabled={disabledButton}
              style={[styles.button, { backgroundColor: disabledButton ? 'gray' : '#007bff' }]}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
          </View>

          <FullScreenLoader visible={loading} />


          <CustomAlert
            visible={modalVisible}
            message={modalMessage}
            onClose={() => setModalVisible(false)}
          />

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F2FFF5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E7D32',
  },
  input: {
    height: 50,
    borderColor: '#B2DFDB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  inputDouble: {
    height: 50,
    borderColor: '#B2DFDB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
    width: '47%',
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerImage: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 260,
    height: 180,
    resizeMode: 'contain',
  },
  divRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


export { Registro };
