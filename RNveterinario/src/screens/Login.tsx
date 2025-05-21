import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/Input';
import FullScreenLoader from '../components/FullScreenLoanding';
import CustomAlert from '../components/CustomAlert';
import { RootStackParamList } from '../stacks/StackNavigation';


type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'login'>

const Login = () => {

  const navigation = useNavigation<NavigationProps>();

  const { startSessionUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  const disabledButton = (username != '' && password != '') ? false : true;
  const loginSend = () => {
    if (username && password) {
      const requestData = {
        username,
        password,
      };

      setLoading(true);

      console.log(JSON.stringify(requestData));

      fetch('https://07c2-181-49-197-21.ngrok-free.app/integrador/login', {
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
            setModalMessage('Ha ocurrido un error al iniciar sesión');
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

      <Input
        value={username}
        onChangeText={setUsername}
        inputStyle={styles.input}
        placeholder="Username"
        lenght={30}
      />

      <Input
        value={password}
        onChangeText={setPassword}
        inputStyle={styles.input}
        placeholder="Password"
        security
        lenght={15}
      />

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity disabled={disabledButton} style={[styles.buttons, { backgroundColor: disabledButton ? 'gray' : '#007bff' }]} onPress={loginSend} >
          <Text style={styles.pageNavigation}>Iniciar sesión</Text>
        </TouchableOpacity>

      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Registro")} style={styles.buttons} >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Registrar</Text>
      </TouchableOpacity>

      <FullScreenLoader visible={loading} />

      <CustomAlert
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
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
    backgroundColor: '#007bff',
    width: '100%',
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 10
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
