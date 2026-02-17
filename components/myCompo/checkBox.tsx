import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  columns?: number;
};

const CheckboxGroup: React.FC<Props> = ({
  options,
  selectedValues,
  onChange,
  columns = 2,
}) => {
  const toggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <View style={styles.container}>
      {options.map(item => {
        const checked = selectedValues.includes(item.value);
        return (
          <TouchableOpacity
            key={item.value}
            style={[styles.item, { width: `${100 / columns}%` }]}
            onPress={() => toggle(item.value)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, checked && styles.checkedBox]}>
              {checked && <View style={styles.innerDot} />}
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CheckboxGroup;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedBox: {
    borderColor: '#004F9F',
    backgroundColor: '#004F9F',
  },
  innerDot: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  label: {
    fontSize: 14,
    color: '#000',
  },
});
