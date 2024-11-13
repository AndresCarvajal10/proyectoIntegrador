import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, TextInput, Image} from 'react-native';

export default function App() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Veterinaria</Text>
      <Text style={styles.subtitulo}>Regístrate!</Text>
      <TextInput
      placeholder='Nombres'
      style={styles.input}
      />
      <TextInput
      placeholder='Apellidos'
      style={styles.input}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold'
  },
  subtitulo:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  input:{
    borderWidth: 1,
    color: 'gray',
    padding: 10,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 20,
    paddingStart: 20,
  }
});
