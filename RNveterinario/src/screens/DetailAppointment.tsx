import React, { useState, useEffect } from 'react';
import { View, Alert, Text, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

interface ClientData {
    addres: string;
    email: string;
    idClient: string;
    lastName: string;
    name: string;
    phone: string;
    username: string;
}

const DetailAppointment = () => {
    
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

    return (
        <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalle del Servicio</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Fecha de Inicio:</Text>
        <Text style={styles.value}>{servicio.fechaInicio}</Text>

        <Text style={styles.label}>Hora de Inicio:</Text>
        <Text style={styles.value}>{formatHora(servicio.horaInicio)}</Text>

        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{servicio.estado}</Text>

        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{servicio.descripcion}</Text>

        <Text style={styles.label}>Veterinario:</Text>
        <Text style={styles.value}>{servicio.nombreVeterinario}</Text>
      </View>

      <Text style={styles.title}>Información de la Mascota</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{servicio.infoMascota.nombreMascota}</Text>

        <Text style={styles.label}>Código:</Text>
        <Text style={styles.value}>{servicio.infoMascota.codigo}</Text>

        <Text style={styles.label}>Raza:</Text>
        <Text style={styles.value}>{servicio.infoMascota.tipoRaza}</Text>

        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.value}>{servicio.infoMascota.edad} años</Text>

        <Text style={styles.label}>Género:</Text>
        <Text style={styles.value}>{servicio.infoMascota.genero}</Text>
      </View>

      
    </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#333',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#111',
  },
});

export { DetailAppointment };
