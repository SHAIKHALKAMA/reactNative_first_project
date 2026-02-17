import Appbar from '@/components/myCompo/appbar';
import Drawer from '@/components/myCompo/drawer';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Amc = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const handleAddPool = () => {
        router.push('/pages/addAmcPool');
    };
    return (
        <View style={{ backgroundColor: '#fff', flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
            <Appbar title="POOLS" showBack={true} showLeading={false} showSearchbar={false} showMenu={true} onMenuPress={() => setOpen(true)} />
            <Drawer visible={open} onClose={() => setOpen(false)} />
            <View>
                <Text>Pool 1</Text>
                <Text>Pool 2</Text>
                <Text>Pool 3</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={handleAddPool} style={styles.floatingButton}>
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Amc;

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#004F9F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButtonText: {
        color: '#fff',
        fontSize: 40,
        fontWeight: '300',
    },
});