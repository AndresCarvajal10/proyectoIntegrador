import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { AppointmentCard } from '../Components/AppointmentCard';
import { NavigationContainerProps, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../stacks/OutSessionStack';



type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>

const Home = () => {

  const navigation = useNavigation<NavigationProps>();


  return (
    <View style={styles.container}>
      <Text>Bienvenido</Text>
      <AppointmentCard
        title="Cita de vacunacion"
        date="1909/2025"
        hour="11:00"
        image={require('../../assets/Cachorro.jpg')}
        action={() => { navigation.navigate('DetailAppointment') }}
      />
      <AppointmentCard
        title="Cita de vacunacion"
        date="1909/2025"
        hour="11:00"
        image={require('../../assets/Cachorro.jpg')}
        action={() => { navigation.navigate('DetailAppointment') }}
      />
      <AppointmentCard
        title="Cita de vacunacion"
        date="1909/2025"
        hour="11:00"
        image={require('../../assets/Cachorro.jpg')}
        action={() => { navigation.navigate('DetailAppointment') }}
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
});

export { Home };