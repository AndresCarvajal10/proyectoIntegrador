import React, { useState, useEffect } from 'react';
import { View, Alert, Text, StyleSheet } from 'react-native';
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
    const [data, setData] = useState<ClientData | null>(null);

    // useEffect(() => {
    //     fetch('https://302b-190-99-252-240.ngrok-free.app/integrador/agendaCita/list?idClient=1', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Error en la solicitud de registro');
    //             }
    //             return response.json();
    //         })
    //         .then((responseData) => {
    //             if (responseData.responseCode === "0000") {
    //                 setData(responseData.responseObj as ClientData);
    //             } else {
    //                 Alert.alert('Error', responseData.responseDesc || 'No se encontraron datos');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             Alert.alert('Error', 'Ocurrió un error al obtener los datos');
    //         });
    // }, []);

    // if (!data) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <Text style={styles.loadingText}>Cargando datos...</Text>
    //         </View>
    //     );
    // }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.headerText}>Detalles de la cita</Text>

            <DataTable style={styles.table}>
                <DataTable.Header style={styles.header}>
                    <DataTable.Title >Campo</DataTable.Title>
                    <DataTable.Title >Datos</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row style={styles.row}>
                    <DataTable.Cell style={styles.cell}>Nombre</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>Juan</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell style={styles.cell}>Apellido</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>Pérez</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell style={styles.cell}>Dirección</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>Calle Falsa 123</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell style={styles.cell}>Teléfono</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>+1234567890</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell style={styles.cell}>Correo</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>juan.perez@example.com</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell style={styles.cell}>ID Cliente</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>1</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell style={styles.cell}>Usuario</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>juanperez</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    table: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#007bff',
    },
    row: {
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cell: {
        fontSize: 14,
        paddingVertical: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#555',
    },
});

export { DetailAppointment };
