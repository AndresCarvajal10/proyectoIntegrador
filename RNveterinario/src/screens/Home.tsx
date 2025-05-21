import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { AppointmentCard } from '../components/AppointmentCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../stacks/InSessionStack';
import { ListAppointment } from '../interfaces/ListAppointment';
import { useHttpsCall } from '../hooks/useHttpsCall';

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

  const getListAppointment = async () => {
    try {
      const response = await callServer<'', ListAppointment>('/integrador/agendaCita/list?idClient=3', null, 'get');
      if (response.response && response.response.responseCode === "0000") {
        const { responseObj } = response.response;
        if (Array.isArray(responseObj)) {
          setAppointments(responseObj);
        } else {
          setAppointments([]);
        }
      } else {
        Alert.alert('Error', response.response?.responseDesc || 'No se encontraron datos');
        setAppointments([]);
      }
    } catch (error) {
      console.error('Error al obtener la lista de citas', error);
      Alert.alert('Error', 'Ocurrió un error al obtener los datos');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListAppointment();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Bienvenido</Text>
      {appointments.length > 0 ? (
        appointments.map((appointment, idx) => (
          <AppointmentCard
            key={appointment.agendaCitaId}
            title={appointment.descripcion || 'Cita'}
            date={appointment.fechaInicio}
            hour={appointment.horaInicio ? appointment.horaInicio.slice(0, 2) + ':' + appointment.horaInicio.slice(2, 4) : ''}
            image={require('../../assets/Cachorro.jpg')}
            action={() => { navigation.navigate('DetailAppointment'); }}
          />
        ))
      ) : (
        <Text>No hay citas disponibles.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
});

export { Home };