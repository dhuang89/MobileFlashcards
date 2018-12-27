import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';

// styling to make text input from user look cleaner
const styles = StyleSheet.create({
  inputText: {
    fontSize: 18,
    textAlign: 'center',
    height: 60,
  },
  textInputContainer: {
    borderBottomWidth: 3,
    borderBottomColor: 'blue',
  },
});

const Input = ({ value, onChange, ...props }) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        onChangeText={onChange}
        value={value}
        style={styles.inputText}
        {...props}
      />
    </View>
  );
};

export default Input;