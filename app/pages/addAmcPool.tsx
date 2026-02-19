import Appbar from '@/components/myCompo/appbar';
import CustomTextField from '@/components/myCompo/custom_textfield';
import Drawer from '@/components/myCompo/drawer';
import { addPool } from '@/services/poolService';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const AddAmcPool = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [poolName, setPoolName] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [depth, setDepth] = useState('');
    const [madeIn, setMadeIn] = useState('');
    const [addressId, setAddressId] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);


    const pickImage = async () => {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!perm.granted) {
            alert('Permission denied');
            return;
        }

        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.5,
        });

        console.log(res);

        if (!res.canceled) {
            setImageUri(res.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!poolName || !length || !width || !depth || !madeIn || !description) {
            Alert.alert('Please fill all fields');
            return;
        }

        try {
            setLoading(true);

            const response = await addPool({
                image: imageUri,
                name: poolName,
                length: `${length}`,
                width: `${width}`,
                depth: `${depth}`,
                mode_in: madeIn,
                address_id: 3,
                description,
            });

            if (response.status) {
                Alert.alert('Success', response.message);
            } else {
                Alert.alert('Error', response.message);
            }
        } catch (error: any) {
            console.log(error?.response?.data || error);
            Alert.alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Appbar title="Pool" showBack showMenu={true} onMenuPress={() => setOpen(true)} />
            <Drawer visible={open} onClose={() => setOpen(false)} />
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.content}>
                <Image
                    source={
                        imageUri
                            ? { uri: imageUri }
                            : require('@/assets/uploadPool.png')
                    }
                    style={imageUri ? styles.imageSelected : styles.image}
                />
            </TouchableOpacity>
            <CustomTextField label="Pool Name" value={poolName} onChangeText={setPoolName} />
            <CustomTextField label="Length" value={length} onChangeText={setLength} />
            <CustomTextField label="Width" value={width} onChangeText={setWidth} />
            <CustomTextField label="Depth" value={depth} onChangeText={setDepth} />
            <CustomTextField label="Made in" value={madeIn} onChangeText={setMadeIn} />
            <CustomTextField label="Address ID" value={addressId} onChangeText={setAddressId} />
            <CustomTextField
                label="Info"
                value={description}
                multiline
                onChangeText={setDescription}
            />

            <View style={styles.buttonSubmit}>
                <Text style={styles.buttonText} onPress={handleSubmit}>{loading ? 'Submitting...' : 'SUBMIT'}</Text>
            </View>
        </View>
    );
};

export default AddAmcPool;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    content: {
        width: '100%',
        height: 220,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
    },

    image: {
        width: '55%',
        height: 120,
    },
    imageSelected: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
        borderRadius: 4,
    },
    buttonSubmit: {
        width: '100%',
        height: 48,
        marginTop: 20,
        backgroundColor: '#004F9F',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
    },
});

