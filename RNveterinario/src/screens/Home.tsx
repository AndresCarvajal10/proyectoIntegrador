import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AppointmentCard } from '../components/AppointmentCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../stacks/InSessionStack';
import { ListAppointment } from '../interfaces/ListAppointment';
import { useHttpsCall } from '../hooks/useHttpsCall';
import { AuthContext } from '../context/AuthContext';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Appointment = {
  agendaCitaId: number;
  fechaInicio: string;
  horaInicio: string;
  estado: string;
  descripcion: string;
};

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { callServer } = useHttpsCall();
  const { loginState } = useContext(AuthContext);
  
  const getListAppointment = async () => {
    try {
      const response = await callServer<'', ListAppointment>(
        `/integrador/agendaCita/list?idClient=${loginState.idClient}`,
        null,
        'get'
      );
      if (response.response && response.response.responseCode === '0000') {
        const { responseObj } = response.response;
        setAppointments(Array.isArray(responseObj) ? responseObj : []);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error('Error al obtener la lista de citas', error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListAppointment();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🐶 Bienvenido {loginState.name}</Text>
        <Text style={styles.subtitle}>
          A continuación podrás ver tus próximas citas con los especialistas para tu mascota
        </Text>
      </View>
      <View style={{ padding: 24 }}>

        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.agendaCitaId}
              title={appointment.descripcion || 'Cita'}
              date={appointment.fechaInicio}
              hour={
                appointment.horaInicio
                  ? `${appointment.horaInicio.slice(0, 2)}:${appointment.horaInicio.slice(2, 4)}`
                  : ''
              }
              image={require('../../assets/Cachorro.png')}
              action={() => navigation.navigate('DetailAppointment')}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes citas agendadas</Text>
            <Image
              source={require('../../assets/empty_appointments.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.boton}
              onPress={() => navigation.navigate('CreateAppointment')}
            >
              <Text style={styles.botonTexto}>Agendar nueva cita</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FFF5',
    marginTop: 24,
  },
  header: {
    backgroundColor: '#F2FFF5',
    padding: 24,
    borderBottomColor: '#B2DFDB',
    borderBottomWidth: 1,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#388E3C',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#388E3C',
    marginBottom: 20,
    textAlign: 'center',
  },
  illustration: {
    width: 250,
    height: 200,
    marginBottom: 24,
  },
  boton: {
    backgroundColor: '#43A047',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginTop: 70,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { Home };
