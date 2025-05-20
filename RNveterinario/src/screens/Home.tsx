import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { AppointmentCard } from '../components/AppointmentCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../stacks/InSessionStack';
import { ListAppointment } from '../interfaces/ListAppointment';
import { useHttpsCall } from '../hooks/useHttpsCall';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(true);

  // Hooks
  const { callServer } = useHttpsCall();

  const getListAppointment = async () => {


    try {
      const response = await callServer<ListAppointment, ''>('/integrador/agendaCita/list?idClient=1', null, 'get');

      console.log('Response: ', response);
      if (response.response) {
        const { responseBody } = response.response;
        if (responseBody) {
        }
      }
    } catch (error) {
      console.error(' Error al obtener la lista de citas', error);
    }
  }

  useEffect(() => {
    getListAppointment();
  }, []);

  return (
    // <View style={styles.container}>
    //   <Text>Bienvenido</Text>
    //   {data && Array.isArray(data) ? (
    //     data.map((appointment, idx) => (
    //       <AppointmentCard
    //         key={idx}
    //         title={appointment.title || 'Cita'}
    //         date={appointment.date || ''}
    //         hour={appointment.hour || ''}
    //         image={require('../../assets/Cachorro.jpg')}
    //         action={() => { navigation.navigate('DetailAppointment'); }}
    //       />
    //     ))
    //   ) : (
    //     <Text>No hay citas disponibles.</Text>
    //   )}
    // </View>

    <View style={styles.container}>
      <Text>Bienvenido</Text>
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