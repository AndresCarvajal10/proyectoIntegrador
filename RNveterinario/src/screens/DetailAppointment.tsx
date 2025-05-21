import React, { useState, useEffect } from 'react';
import { View, Alert, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { DataTable } from 'react-native-paper';
import { CustomTitle } from '../components/CustomTitle';
import { Separator } from '../components/Separator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../stacks/InSessionStack';
import { Button } from '../components/Button';

interface ClientData {
  addres: string;
  email: string;
  idClient: string;
  lastName: string;
  name: string;
  phone: string;
  username: string;
}

type ScreenPropsStack = NativeStackScreenProps<RootStackParamList, 'DetailAppointment'>;

const DetailAppointment = ({ route }: ScreenPropsStack) => {

  const { id } = route.params;

  const servicio = {
    fechaInicio: '2025-12-31',
    horaInicio: '180000',
    estado: 'Pendiente',
    descripcion: 'consulta',
    nombreVeterinario: 'Carlos Gómez',
    infoMascota: {
      idMascota: 1,
      codigo: 'f8ffc6ce',
      nombreMascota: 'Lupe',
      tipoRaza: 'Labrador Retriever',
      edad: 2,
      genero: 'Hembra',
    },
  }
  const formatHora = (hora: string) => {
    return `${hora.substring(0, 2)}:${hora.substring(2, 4)}`;
  };

  useEffect(() => {
    console.log('ID de la cita:', id);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomTitle title="Detalle de la cita" addStyle={{ textAlign: 'center', marginBottom: 20 }} />

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
          <Image source={require('../../assets/Cachorro.png')} style={styles.avatar} />
          <View>
            <Text style={styles.dateInformation}>{servicio.fechaInicio}</Text>
            <Text style={[styles.dateInformation, { textAlign: 'left', fontSize: 14 }]}>{formatHora(servicio.horaInicio)}</Text>
          </View>
        </View>
        {/* <Text style={styles.valueFull}>Información de la cita</Text> */}

        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{servicio.estado}</Text>
        <Separator />

        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{servicio.descripcion}</Text>
        <Separator />

        <Text style={styles.label}>Veterinario:</Text>
        <Text style={styles.value}>{servicio.nombreVeterinario}</Text>
        <Separator />

        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{servicio.infoMascota.nombreMascota}</Text>
        <Separator />

        <Text style={styles.label}>Código:</Text>
        <Text style={styles.value}>{servicio.infoMascota.codigo}</Text>
        <Separator />

        <Text style={styles.label}>Raza:</Text>
        <Text style={styles.value}>{servicio.infoMascota.tipoRaza}</Text>
        <Separator />

        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.value}>{servicio.infoMascota.edad} años</Text>
        <Separator />

        <Text style={styles.label}>Género:</Text>
        <Text style={styles.value}>{servicio.infoMascota.genero}</Text>
      </View>
      <Button disabledButton={false} text="Cancelar cita" />


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 48,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666',
    width: '50%',
  },
  value: {
    fontSize: 16,
    color: '#111',
    width: '50%',
  },
  valueFull: {
    fontSize: 14,
    width: '100%',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 5
  },
  dateInformation: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
    opacity: 0.4,
    width: '50%',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 15,
  },
});

export { DetailAppointment };
