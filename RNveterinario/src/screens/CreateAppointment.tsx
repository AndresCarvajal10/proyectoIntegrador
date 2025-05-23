import React, { useContext, useEffect, useState } from 'react';
import { useHttpsCall } from '../hooks/useHttpsCall';
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
import { AuthContext } from '../context/AuthContext';
import { CreateAppointmentResponse } from '../interfaces/ListAppointment';
import CustomAlert from '../components/CustomAlert';
import FullScreenLoader from '../components/FullScreenLoanding';
import { ResponseDataGeneric } from '../interfaces/DataGeneric';
import { ResponseListPetties } from '../interfaces/ListPetties';

const MASCOTA = [
  { id: 1, name: 'Dra. Ana López' },
  { id: 2, name: 'Dr. Carlos Pérez' },
  { id: 3, name: 'Dra. María García' },
];


type dataCreateAppointment = {
  estadoId: number;
  clienteId: number;
  mascotaId: number
  medicoId: number;
  description: string;
  fecha: string;
  hora: string
};

export default function CreateAppointment() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('consulta');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [loanding, setLoanding] = useState(false);
  const { callServer } = useHttpsCall();
  const tipos = ['Consulta', 'Vacuna', 'Baño', 'Urgencia'];
  const { loginState } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [veterinarios, setVeterinarios] = useState<{ idVeterinarian: number; nombre: string }[]>([]);
  const [listPetties, setListPetties] = useState<{ idMascota: number; nombreMascota: string }[]>([]);



  const guardarCita = async () => {
    if (!nombre || !fecha || !hora) {
      Alert.alert('Campos requeridos', 'Por favor completa los campos obligatorios.');
      return;
    }
    
    setLoanding(true)

    try {

      const requestData: dataCreateAppointment = {
      estadoId: 1,
      clienteId: Number(loginState.idClient),
      medicoId: selectedDoctor ?? 0,
      description: tipo,
      mascotaId: selectedPet ?? 0,
      fecha,
      hora
};


      const { response } = await callServer<dataCreateAppointment, CreateAppointmentResponse>(
        `/integrador/agendaCita/scheduleAnAppointment`,
        requestData,
        'post'
      );
      console.log(response)
      if (response?.responseCode === '0000') {

        console.log('Cita guardada:', requestData);
        setModalMessage("Se creó la cita correctamente 🐶")
        setModalVisible(true)
        setLoanding(false)

      } else {
        setModalMessage("Ocurrió un problema al crear la cita, intenta de nuevo")
        setModalVisible(true)
        setLoanding(false)
      }

    } catch (error) {
      setLoanding(false)
      setModalMessage("Ocurrió un problema al crear la cita, intenta más tarde")
      setModalVisible(true)

    } finally {
      setLoanding(false)
    }

  };

  const veterinarioMascotas = async () => {
  setLoanding(true);

  try {
    const { response } = await callServer<'', ResponseDataGeneric>(
      `/integrador/selectors/All?idClient=${Number(loginState.idClient)}`,
      null,
      'get'
    );

    if (response?.responseCode === '0000') {
      setVeterinarios(response.responseObj.selectorVeterinarians);
    } else {
    setLoanding(false);

    }
  } catch (error) {
    console.log('error al listar doctores',error)
  } finally {
    setLoanding(false);
  }
};

  const listaMascotas = async () => {
  setLoanding(true);

  try {
    const { response } = await callServer<'', ResponseListPetties>(
      `/integrador/pets/getListPets?idClient=${Number(loginState.idClient)}`,
      null,
      'get'
    );

    if (response?.responseCode === '0000') {
      setListPetties(response.responseObj);
    } else {
          setLoanding(false);

    }
  } catch (error) {
    console.log('error al listar mascotas',error)
  } finally {
    setLoanding(false);
  }
};

  useEffect(() => {
  veterinarioMascotas()
  listaMascotas();
  }, [])
  
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

      <Text style={styles.label}>Mascota</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedPet}
          onValueChange={(itemValue) => setSelectedPet(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona una mascota" value={null} />
          {listPetties.map((pet) => (
            <Picker.Item key={pet.idMascota} label={pet.nombreMascota} value={pet.idMascota} />
          ))}
        </Picker>
      </View>


      <Text style={styles.label}>Veterinario</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDoctor}
          onValueChange={(itemValue) => setSelectedDoctor(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un veterinario" value={null} />
          {veterinarios.map((vet) => (
            <Picker.Item key={vet.idVeterinarian} label={vet.nombre} value={vet.idVeterinarian} />
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
        keyboardType='phone-pad'
        maxLength={8}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM, 24h) *"
        value={hora}
        onChangeText={setHora}
        keyboardType='phone-pad'
        maxLength={8}
      />

      <TouchableOpacity style={styles.boton} onPress={guardarCita}>
        <Text style={styles.botonTexto}>💾 Agendar cita</Text>
      </TouchableOpacity>
      <FullScreenLoader visible={loanding} />

      <CustomAlert
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}

function capitalizar(str: String) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function tipoEmoji(tipo: String) {
  switch (tipo) {
    case 'Consulta': return '🩺';
    case 'Vacuna': return '💉';
    case 'Baño': return '🛁';
    case 'Urgencia': return '🚨';
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