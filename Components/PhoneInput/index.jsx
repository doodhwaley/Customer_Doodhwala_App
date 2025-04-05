import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

const PhoneInput = ({
  value,
  onChangeText,
  countryCode = '+92',
  containerStyle,
  codeContainerStyle,
  inputContainerStyle,
  codeTextStyle,
  inputStyle,
  placeholder = 'Enter phone number',
  placeholderTextColor = '#999',
  maxLength = 10,
  keyboardType = 'numeric',
  ...otherProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.codeContainer, codeContainerStyle]}>
        <Text style={[styles.codeText, codeTextStyle]}>{countryCode}</Text>
      </View>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          maxLength={maxLength}
          {...otherProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  codeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
  },
  codeText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
});

export default PhoneInput;
