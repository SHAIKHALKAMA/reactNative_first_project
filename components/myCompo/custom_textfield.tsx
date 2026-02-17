import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  maxLength?: number;
};

const CustomTextField = ({
  label,
  value,
  onChangeText,
  multiline = false,
  maxLength,
}: Props) => {
  const [focused, setFocused] = useState(false);

  const isActive = focused || value.length > 0;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isActive && styles.labelActive]}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          multiline && styles.multilineInput,
        ]}
        cursorColor="black"
        selectionColor="black"
        multiline={multiline}
        maxLength={maxLength}
        textAlignVertical={multiline ? 'top' : 'center'}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

export default CustomTextField;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 16,
    top: 18,
    color: '#999',
    fontSize: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    zIndex: 1,
  },
  labelActive: {
    top: -8,
    fontSize: 12,
    color: '#000',
    opacity: 0.5,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  multilineInput: {
    height: 120,
    paddingTop: 14,
  },
});
