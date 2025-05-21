import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DOCTORS = [
  { id: 1, name: 'Dra. Ana López' },
  { id: 2, name: 'Dr. Carlos Pérez' },
  { id: 3, name: 'Dra. María García' },
];

export default function CreateAppointment() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('consulta');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  const tipos = ['consulta', 'vacuna', 'baño', 'urgencia'];

  const guardarCita = () => {
    if (!nombre || !fecha || !hora || !selectedDoctor) {
      Alert.alert('Campos requeridos', 'Por favor completa los campos obligatorios.');
      return;
    }

    const cita = { nombre, descripcion, tipo, fecha, hora, doctorId: selectedDoctor };
    console.log('Cita guardada:', cita);
    Alert.alert('¡Cita creada!', 'Tu cita fue registrada correctamente 🐶');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>🐾 Agendar cita veterinaria</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la mascota *"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción o síntomas"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Text style={styles.label}>Doctor</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDoctor}
          onValueChange={(itemValue) => setSelectedDoctor(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un doctor..." value={null} />
          {DOCTORS.map((doctor) => (
            <Picker.Item key={doctor.id} label={doctor.name} value={doctor.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Tipo de cita</Text>
      <View style={styles.tipoContainer}>
        {tipos.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tipoButton, tipo === t && styles.tipoButtonActivo]}
            onPress={() => setTipo(t)}
          >
            <Text style={tipo === t ? styles.tipoTextoActivo : styles.tipoTexto}>
              {tipoEmoji(t)} {capitalizar(t)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD) *"
        value={fecha}
        onChangeText={setFecha}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM, 24h) *"
        value={hora}
        onChangeText={setHora}
      />

      <TouchableOpacity style={styles.boton} onPress={guardarCita}>
        <Text style={styles.botonTexto}>💾 Agendar cita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function capitalizar(str: String) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function tipoEmoji(tipo: String) {
  switch (tipo) {
    case 'consulta': return '🩺';
    case 'vacuna': return '💉';
    case 'baño': return '🛁';
    case 'urgencia': return '🚨';
    default: return '🐾';
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F2FFF5',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 20,
    color: '#2E7D32',
    textAlign: 'center',
  },
  input: {
    borderColor: '#B2DFDB',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#388E3C',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '600',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#B2DFDB',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  tipoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  tipoButton: {
    backgroundColor: '#E0F2F1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tipoButtonActivo: {
    backgroundColor: '#4CAF50',
  },
  tipoTexto: {
    color: '#004D40',
  },
  tipoTextoActivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  boton: {
    backgroundColor: '#43A047',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});