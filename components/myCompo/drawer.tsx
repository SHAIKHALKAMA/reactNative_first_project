import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
};

const Drawer = ({ visible, onClose }: Props) => {
    const router = useRouter();

    if (!visible) return null;

    return (
        <View style={styles.wrapper}>
            {/* 🔴 OUTSIDE CLICK CLOSE */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>

            {/* 👉 RIGHT DRAWER */}
            <View style={styles.drawer}>
                <Text style={styles.title}>Menu</Text>

                <TouchableOpacity onPress={() => { onClose(); router.push('/(tabs)/home'); }}>
                    <Text style={styles.item}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { onClose(); router.push('/(tabs)/profile'); }}>
                    <Text style={styles.item}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { onClose(); router.push('/pages/cartScreen'); }}>
                    <Text style={styles.item}>Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Drawer;

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        flexDirection: 'row',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    drawer: {
        width: 260,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 30,
    },
    item: {
        fontSize: 16,
        marginVertical: 15,
    },
});
