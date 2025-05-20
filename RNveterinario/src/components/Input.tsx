import React from 'react';
import { TextInput, StyleSheet, TextStyle } from 'react-native';


interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  inputStyle?: TextStyle;
  security?: boolean;
  lenght?: number
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder = 'Username',
  inputStyle,
  security = false,
  lenght = 15
}) => {
  return (
    <TextInput
      style={[styles.defaultInput, inputStyle]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={security}
      maxLength={lenght} 
    />
  );
};

const styles = StyleSheet.create({
  defaultInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
});

export default Input;