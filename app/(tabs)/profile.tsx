import Appbar from '@/components/myCompo/appbar';
import CustomTextField from '@/components/myCompo/custom_textfield';
import Drawer from '@/components/myCompo/drawer';
import { getProfile } from '@/services/profileService';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const Profile = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODRkZjk5N2UwY2YxZTM5ZjAyNmQ4OTViZGE2Y2RmMDBkMmIwZTZmMDZjYTg0M2U0OTNhN2Y1OWExOTkwODFjMWY5ZDA5OGY0MDg4MDBhMDYiLCJpYXQiOjE3NzAzNTY0MTMuMzUzNDUsIm5iZiI6MTc3MDM1NjQxMy4zNTM0NzQsImV4cCI6MTgwMTg5MjQxMy4zNTAwNSwic3ViIjoiMTIiLCJzY29wZXMiOltdfQ.C9D1ZKfHneUOaXJBGaykF4sWEtNoPlei3wqSZt59hbswd9tlUERUxi29bPn1dnyu70mDTe2F_lKGum4I2a2Cmi-3swTDYXkLdaTFgEoWcEJYaHEkQr9yMRsDJuEw8PVDwP-e3fSRrGG3hBvuCO1LaAcbHRvkCtogwTTJJc3zMoe9bwz9hgz8hva7ji0pKe_9ZckMhnMjaVefF-5jlqwqcyk7NdCIDo54WnYk19UVwkR1EOT1owYmku8jcNkxUG-znh4loze1OJuz4PzeBapfzrl3lpOiORQB2fPdg4Bb8N4bQl1hZuIzRBm3lwlMiuO8aoDmcw_kp3rUIE1ld66IoKyPvZDTcjLucZtqq2Do5vBaXtiuVhAomHmv2rPCwx8OkL0aLEhk7tuZn37aH-PlamDw7uEFXNd0ml92_oHK9ROexsQQ91kOOlmkAQ7bqKi7xgdnoBcFp5SEpqPjSRt8UaCaF458bX0-jrT83FowcKdaTX-2L-q0j_ONxtZV1ZoY9e41mT4syzget0x2kKhn7VlIb5KS7XFNrX0r67M9LwgCjRQG0xDzH1L4qKP9WnHqFR8zv9zXa7Vh1VDzAcvbzjMO_R5zmPZeSuPksawDFlPMPeLqbnhEVe4acNo0WT64tiB-FUC0uBRHhbYD7ipb2KIdRufOaydNF2IZOhrog8Y'; // 🔥 Replace with your stored token

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await getProfile(token);

            if (res.status) {
                const data = res.data;
                setFirstName(data.first_name || '');
                setLastName(data.last_name || '');
                setMobile(data.phone || '');
                setAddress(data.address || '');
                setCity(data.city || '');
                setState(data.state || '');
                setPincode(data.pincode || '');

                if (data.profile_image) {
                    setImageUri(data.profile_image);
                }
            }
        } catch (error: any) {
            console.log(error?.response?.data || error);
            Alert.alert('Error fetching profile');
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!perm.granted) {
            alert('Permission denied');
            return;
        }

        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!res.canceled) {
            setImageUri(res.assets[0].uri);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Appbar title="Profile" showBack showMenu onMenuPress={() => setOpen(true)} />
            <Drawer visible={open} onClose={() => setOpen(false)} />

            <View style={styles.centerWrapper}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={
                            imageUri
                                ? { uri: imageUri }
                                : require('@/assets/profileIcon.png')
                        }
                        style={styles.profileCircle}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.formWrapper}>
                <CustomTextField label="First Name" value={firstName} onChangeText={setFirstName} />
                <CustomTextField label="Last Name" value={lastName} onChangeText={setLastName} />
                <CustomTextField label="Mobile No" value={mobile} onChangeText={setMobile} />
                <CustomTextField label="Address" value={address} onChangeText={setAddress} />
                <CustomTextField label="City" value={city} onChangeText={setCity} />
                <CustomTextField label="State" value={state} onChangeText={setState} />
                <CustomTextField label="Pincode" value={pincode} onChangeText={setPincode} />
            </View>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={styles.buttonSubmit}>
                    <Text style={styles.buttonText}>UPDATE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Profile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    centerWrapper: {
        alignItems: 'center',
    },

    formWrapper: {
        marginTop: 20,
    },

    profileCircle: {
        width: 120,
        height: 120,
        borderColor: '#004F9F',
        borderWidth: 1,
        borderRadius: 60,
        backgroundColor: '#E5E5E5',
    },
    buttonSubmit: {
        width: '100%',
        height: 48,
        backgroundColor: '#004F9F',
        borderRadius: 50,
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
