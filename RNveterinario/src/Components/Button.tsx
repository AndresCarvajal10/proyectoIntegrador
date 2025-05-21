import { View, Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native'
import React from 'react'

interface ButtonProps extends TouchableOpacityProps {
    disabledButton: boolean
    text: string
}

const Button = ({ disabledButton, text, ...props }: ButtonProps) => {
    return (
        <TouchableOpacity
            disabled={disabledButton}
            style={[
                styles.button,
                { backgroundColor: disabledButton ? '#BDBDBD' : '#43A047' },
            ]}
            activeOpacity={0.7}
            {...props}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export { Button }