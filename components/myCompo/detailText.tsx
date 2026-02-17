import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    title: string;
    value: string;
}

const DetailText = ({ title, value }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    )
}

export default DetailText

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    title: {
        width: '50%',
        fontSize: 16,
        fontWeight: '400',
    },
    value: {
        width: '50%',
        fontSize: 16,
        fontWeight: '300',
        color: '#000',
    },
})