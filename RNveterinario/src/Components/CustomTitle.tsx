import { View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native'
import React from 'react'

type Props = {
    title: string,
    addStyle?: StyleProp<TextStyle>,
}

const CustomTitle = ({ title, addStyle }: Props) => {
    return (
        <Text style={[styles.title, addStyle]}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 8,
    },
})

export { CustomTitle }