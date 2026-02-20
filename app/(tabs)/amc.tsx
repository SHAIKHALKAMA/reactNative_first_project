import Appbar from '@/components/myCompo/appbar';
import Drawer from '@/components/myCompo/drawer';
import { getAMCPools } from '@/services/poolService';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Amc = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [amcPools, setAmcPools] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const handleAddPool = () => {
        router.push('/pages/addAmcPool');
    };


    useEffect(() => {
        fetchAMCPools();
    }, []);

    const fetchAMCPools = async () => {
        try {
            setLoading(true);
            const res = await getAMCPools();
            console.log('AMC Response:', res);

            if (res?.status) {
                setAmcPools(res.data);
            }

        } catch (error: any) {
            console.log(error?.response?.data || error);
            Alert.alert('Error', 'Failed to load amc pools');
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.cardContainer}>
                <Image
                    source={{ uri: item.images }}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        {item.name ?? 'Pool'}
                    </Text>

                    <Text style={styles.subtitle}>
                        Description: {item.description}
                    </Text>

                    <Text style={styles.subtitle}>
                        Dimensions: {item.length} x {item.width} x {item.depth}
                    </Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => router.push({
                        pathname: '/pages/buySubscription',
                        params: {
                            amc_pool_id: item.id,
                        },
                    })} style={styles.button}>
                        <Text style={styles.buttonText}>
                            BUY Subscription
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };



    return (

        <View style={styles.mainContainer}>
            <Appbar title="POOLS" showBack={true} showLeading={false} showSearchbar={false} showMenu={true} onMenuPress={() => setOpen(true)} />
            <Drawer visible={open} onClose={() => setOpen(false)} />
            {loading && (
                <View style={{ marginTop: 20 }}>
                    <Text>Loading...</Text>
                </View>
            )}
            <FlatList
                data={amcPools}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    !loading ? (
                        <View style={{ alignItems: 'center', marginTop: 40 }}>
                            <Text>No AMC Pools Found</Text>
                        </View>
                    ) : null
                }
            />
            <TouchableOpacity activeOpacity={0.8} onPress={handleAddPool} style={styles.floatingButton}>
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Amc;

const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: '#f9f9f9ff',
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10
    },


    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginTop: 12,
        alignItems: 'flex-start',
    },


    image: {
        width: 90,
        height: 90,
        borderRadius: 8,
    },


    content: {
        flex: 1,
        marginLeft: 12,
    },


    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },


    subtitle: {
        fontSize: 13,
        color: '#555',
        marginTop: 4,
    },


    button: {
        backgroundColor: '#039FDA',
        paddingVertical: 10,
        borderRadius: 80,
        marginTop: 10,
        width: 200
    },


    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
    },


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


    card: {
        backgroundColor: '#fff',
        padding: 16,
        width: '100%',
        borderRadius: 12,
        marginBottom: 12,
    },


    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },


});