import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

const RadioGroup = ({ options, value, onChange }: Props) => {
  return (
    <View style={{ flexDirection: 'row', gap: 20 }}>
      {options.map((item) => {
        const selected = item.value === value;

        return (
          <TouchableOpacity
            key={item.value}
            style={styles.row}
            activeOpacity={0.7}
            onPress={() => onChange(item.value)}
          >
            <View style={[styles.outer, selected && styles.outerActive]}>
              {selected && <View style={styles.inner} />}
            </View>

            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioGroup;



const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 14,
  },
  outer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerActive: {
    borderColor: 'lightgrey',
  },
  inner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  label: {
    marginLeft: 12,
    marginRight: 12,
    fontSize: 15,
    color: '#111827',
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
});

