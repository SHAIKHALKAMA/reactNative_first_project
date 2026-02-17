
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Option = {
    label: string;
    value: string;
};

type Props = {
    options: Option[];
    value: string;
    onChange: (val: string) => void;
    columns?: number;
};

const RadioGroup2 = ({ options, value, onChange, columns = 2 }: Props) => {
    return (
        <View style={styles.container}>
            {options.map((item) => {
                const selected = value === item.value;

                return (
                    <TouchableOpacity
                        key={item.value}
                        style={[styles.item, { width: `${100 / columns}%` }]}
                        onPress={() => onChange(item.value)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.radio, selected && styles.radioSelected]}>
                            {selected && <View style={styles.dot} />}
                        </View>
                        <Text style={styles.label}>{item.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default RadioGroup2;



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    radioSelected: {
        borderColor: 'black',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'black',
    },
    label: {
        fontSize: 14,
        color: '#000',
    },
});
