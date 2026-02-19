import Appbar from '@/components/myCompo/appbar';
import Drawer from '@/components/myCompo/drawer';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ReferralPrivilege = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const onPressContinue = () => {
        router.push('/pages/referralPrivilege2');
    }

    return (
        <View style={styles.screen}>
            <Appbar
                title="Referral Privilege"
                showBack
                showLeading={false}
                showSearchbar={false}
                showMenu={true} onMenuPress={() => setOpen(true)} />
            <Drawer visible={open} onClose={() => setOpen(false)} />
            <View style={styles.content}>
                <Text style={styles.emoji}>🤝</Text>
                <Text style={styles.text}>
                    We value your trust in us. When you introduce us to someone who shares
                    your taste for premium living, we ensure their experience is just as
                    exceptional as yours. As a token of appreciation, you will receive
                    exclusive privileges and thoughtful benefits.
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onPressContinue} style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};




export default ReferralPrivilege;
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    content: {
        flex: 1,
        backgroundColor: '#F5F5F7',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },

    emoji: {
        fontSize: 64,
        marginBottom: 20,
    },

    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#000',
        textAlign: 'center',
        fontWeight: '500',
        maxWidth: 300,
    },

    button: {
        marginTop: 32,
        backgroundColor: '#004F9F',
        height: 50,
        width: '70%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});

