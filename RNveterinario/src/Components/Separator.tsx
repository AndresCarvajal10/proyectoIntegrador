import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Separator = () => {
    return (
        <View style={{ width: "100%", alignContent: "center", justifyContent: "center", alignItems: "center" }}>
            <View style={styles.separator} />
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 8,
        opacity: 0.4,
        width: '100%',
    },
})

export { Separator }