import Appbar from '@/components/myCompo/appbar';
import CustomTextField from '@/components/myCompo/custom_textfield';
import Drawer from '@/components/myCompo/drawer';
import { addReferral } from '@/services/refer';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

const ReferralPrivilege = () => {
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [mobile, setMobile] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODRkZjk5N2UwY2YxZTM5ZjAyNmQ4OTViZGE2Y2RmMDBkMmIwZTZmMDZjYTg0M2U0OTNhN2Y1OWExOTkwODFjMWY5ZDA5OGY0MDg4MDBhMDYiLCJpYXQiOjE3NzAzNTY0MTMuMzUzNDUsIm5iZiI6MTc3MDM1NjQxMy4zNTM0NzQsImV4cCI6MTgwMTg5MjQxMy4zNTAwNSwic3ViIjoiMTIiLCJzY29wZXMiOltdfQ.C9D1ZKfHneUOaXJBGaykF4sWEtNoPlei3wqSZt59hbswd9tlUERUxi29bPn1dnyu70mDTe2F_lKGum4I2a2Cmi-3swTDYXkLdaTFgEoWcEJYaHEkQr9yMRsDJuEw8PVDwP-e3fSRrGG3hBvuCO1LaAcbHRvkCtogwTTJJc3zMoe9bwz9hgz8hva7ji0pKe_9ZckMhnMjaVefF-5jlqwqcyk7NdCIDo54WnYk19UVwkR1EOT1owYmku8jcNkxUG-znh4loze1OJuz4PzeBapfzrl3lpOiORQB2fPdg4Bb8N4bQl1hZuIzRBm3lwlMiuO8aoDmcw_kp3rUIE1ld66IoKyPvZDTcjLucZtqq2Do5vBaXtiuVhAomHmv2rPCwx8OkL0aLEhk7tuZn37aH-PlamDw7uEFXNd0ml92_oHK9ROexsQQ91kOOlmkAQ7bqKi7xgdnoBcFp5SEpqPjSRt8UaCaF458bX0-jrT83FowcKdaTX-2L-q0j_ONxtZV1ZoY9e41mT4syzget0x2kKhn7VlIb5KS7XFNrX0r67M9LwgCjRQG0xDzH1L4qKP9WnHqFR8zv9zXa7Vh1VDzAcvbzjMO_R5zmPZeSuPksawDFlPMPeLqbnhEVe4acNo0WT64tiB-FUC0uBRHhbYD7ipb2KIdRufOaydNF2IZOhrog8Y'; // 🔥 Replace with your stored token    

    const handleSubmit = async () => {
        if (!name || !mobile || !location || !note) {
            Alert.alert('Please fill all fields');
            return;
        }

        try {
            setLoading(true);

            const response = await addReferral(token, {
                name: name,
                mobile: mobile,
                location: location,
                note: note,
            });

            if (response.status) {
                console.log(response.message);
                setSnackbarType('success');
                router.push('/(tabs)/home');
                setSnackbarMsg(response.message);
            } else {
                console.log(response.message);
            }
        } catch (error: any) {
            console.log(error?.response?.data || error);
        } finally {
            setLoading(false);
        }
    };


    return (

        <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
            {/* Appbar always at top */}
            <Appbar
                title="Referral Privilege"
                showLeading={false}
                showSearchbar={false}
                showBack={true}
                showMenu={true} onMenuPress={() => setOpen(true)}
            />
            <Drawer visible={open} onClose={() => setOpen(false)} />
            {/* Centered Content */}
            <View style={styles.content}>
                <Text style={styles.emoji}>🤝</Text>

                <Text style={styles.text}>
                    We value your trust in us. When you introduce us to someone who shares
                    your taste for premium living, we ensure their experience is just as
                    exceptional as yours. As a token of appreciation, you will receive
                    exclusive privileges and thoughtful benefits.
                </Text>
            </View>
            <CustomTextField label={'Name'} value={name} onChangeText={setName} />
            <CustomTextField label={'Mobile no.'} value={mobile} onChangeText={setMobile} />
            <CustomTextField label={'Location'} value={location} onChangeText={setLocation} />
            <CustomTextField label={'Note'} value={note} onChangeText={setNote} multiline={true} />
            <View style={styles.buttonSubmit}>
                <Text style={styles.buttonText} onPress={() => handleSubmit()}>SUBMIT</Text>
            </View>
        </ScrollView>
    );
};





export default ReferralPrivilege;
const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F7',
        margin: 16,
        borderRadius: 8,
    },

    emoji: {
        fontSize: 72,
        marginBottom: 16,
    },

    text: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
        fontWeight: '500',
    },

    button: {
        width: '70%',
        height: 48,
        backgroundColor: '#004F9F',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
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
