import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#999"
        {...props}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },

  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});