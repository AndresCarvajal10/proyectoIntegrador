import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface CardAppointmentProps {
    title: string;
    date: string;
    hour: string;
    image: any;
    action: () => void;
}

const AppointmentCard = ({ title, date, hour, image, action }: CardAppointmentProps) => {
    return (
        <Pressable onPress={action}>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Image source={image} style={styles.avatar} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.infoWrapper}>
                            <View style={styles.infoContainer}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Dia</Text>
                                <Text style={{ fontSize: 12 }}>{date}</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Hora</Text>
                                <Text style={{ fontSize: 12 }}>{hour}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginBottom: 16,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 15,
    },
    infoWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
    },
    infoContainer: {
        flexDirection: 'column',
        marginHorizontal: 10,
    },
});

export { AppointmentCard }
