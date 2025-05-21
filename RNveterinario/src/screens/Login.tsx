import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/Input';
import FullScreenLoader from '../components/FullScreenLoanding';
import CustomAlert from '../components/CustomAlert';
import { RootStackParamList } from '../stacks/OutSessionStack';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<NavigationProps>();
  const { startSessionUser } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const disabledButton = !(username && password);

  const loginSend = () => {
    if (!disabledButton) {
      const requestData = { username, password };

      setLoading(true);

      fetch('https://07c2-181-49-197-21.ngrok-free.app/integrador/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) throw new Error('Error en la solicitud de login');
          return response.json();
        })
        .then((data) => {
          if (data.responseCode === '0000') {
            startSessionUser();
          } else {
            setModalMessage('Ha ocurrido un error al iniciar sesión');
            setModalVisible(true);
          }
        })
        .catch(() => {
          setModalMessage('Error de conexión. Intenta nuevamente.');
          setModalVisible(true);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={require('../../assets/logo-illustration.png')}
          style={styles.image}
        />
      </View>

      <Text style={styles.title}>Iniciar sesión</Text>

      <Input
        value={username}
        onChangeText={setUsername}
        inputStyle={styles.input}
        placeholder="Usuario"
        lenght={30}
      />

      <Input
        value={password}
        onChangeText={setPassword}
        inputStyle={styles.input}
        placeholder="Contraseña"
        security
        lenght={15}
      />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          disabled={disabledButton}
          style={[
            styles.button,
            { backgroundColor: disabledButton ? '#BDBDBD' : '#43A047' },
          ]}
          onPress={loginSend}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Registro')}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>

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
    padding: 24,
    backgroundColor: '#F2FFF5',
    justifyContent: 'center',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
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
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 10,
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
  },
  secondaryButton: {
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: '#2E7D32',
    fontSize: 14,
  },
});

export default Login;
