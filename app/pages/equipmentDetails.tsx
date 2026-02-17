import Appbar from '@/components/myCompo/appbar';
import DetailText from '@/components/myCompo/detailText';
import Drawer from '@/components/myCompo/drawer';
import { getProductDetails } from '@/services/api';
import { addToCart } from '@/services/cartService';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Snackbar } from 'react-native-paper';


const EquipmentDetails = () => {
    const { product_id } = useLocalSearchParams();
    const router = useRouter();

    const [isAdded, setIsAdded] = useState(false);

    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const [loading, setLoading] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODRkZjk5N2UwY2YxZTM5ZjAyNmQ4OTViZGE2Y2RmMDBkMmIwZTZmMDZjYTg0M2U0OTNhN2Y1OWExOTkwODFjMWY5ZDA5OGY0MDg4MDBhMDYiLCJpYXQiOjE3NzAzNTY0MTMuMzUzNDUsIm5iZiI6MTc3MDM1NjQxMy4zNTM0NzQsImV4cCI6MTgwMTg5MjQxMy4zNTAwNSwic3ViIjoiMTIiLCJzY29wZXMiOltdfQ.C9D1ZKfHneUOaXJBGaykF4sWEtNoPlei3wqSZt59hbswd9tlUERUxi29bPn1dnyu70mDTe2F_lKGum4I2a2Cmi-3swTDYXkLdaTFgEoWcEJYaHEkQr9yMRsDJuEw8PVDwP-e3fSRrGG3hBvuCO1LaAcbHRvkCtogwTTJJc3zMoe9bwz9hgz8hva7ji0pKe_9ZckMhnMjaVefF-5jlqwqcyk7NdCIDo54WnYk19UVwkR1EOT1owYmku8jcNkxUG-znh4loze1OJuz4PzeBapfzrl3lpOiORQB2fPdg4Bb8N4bQl1hZuIzRBm3lwlMiuO8aoDmcw_kp3rUIE1ld66IoKyPvZDTcjLucZtqq2Do5vBaXtiuVhAomHmv2rPCwx8OkL0aLEhk7tuZn37aH-PlamDw7uEFXNd0ml92_oHK9ROexsQQ91kOOlmkAQ7bqKi7xgdnoBcFp5SEpqPjSRt8UaCaF458bX0-jrT83FowcKdaTX-2L-q0j_ONxtZV1ZoY9e41mT4syzget0x2kKhn7VlIb5KS7XFNrX0r67M9LwgCjRQG0xDzH1L4qKP9WnHqFR8zv9zXa7Vh1VDzAcvbzjMO_R5zmPZeSuPksawDFlPMPeLqbnhEVe4acNo0WT64tiB-FUC0uBRHhbYD7ipb2KIdRufOaydNF2IZOhrog8Y'; // 🔥 Replace with your stored token

    const handleAddToCart = async () => {
        try {
            setLoading(true);
            const response = await addToCart(token, Number(product_id));

            if (response.status) {
                setIsAdded(true);
                setSnackbarMsg(response.message);
                setSnackbarType('success');
            } else {
                setSnackbarMsg(response.message);
                setSnackbarType('error');
            }
        } catch (error: any) {
            console.log(error?.response?.data || error);
            setSnackbarMsg('Something went wrong');
            setSnackbarType('error');
        } finally {
            setSnackbarVisible(true);
            setLoading(false);
        }
    };



    const { data, isLoading, error } = useQuery({
        queryKey: ['productDetail', product_id],
        queryFn: () => getProductDetails(Number(product_id), token),
        enabled: !!product_id,
    });

    const productDetail = data?.data;
    const alreadyAdded = productDetail?.already_added === true;

    const onCartPress = () => {
        if (alreadyAdded) {
            router.push('/pages/cartScreen'); // View Cart
        } else {
            handleAddToCart();
        }
    };

    // ✅ Loading State
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // ✅ Error State
    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Something went wrong</Text>
            </View>
        );
    }


    return (
        <View style={{ backgroundColor: '#fff', flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
            <Appbar title={'Equipment Details'} showLeading={false} showSearchbar={false} showBack={true} showMenu={true} onMenuPress={() => setOpen(true)} />
            <Drawer visible={open} onClose={() => setOpen(false)} />
            <View>
                <FlatList
                    ref={flatListRef}
                    data={productDetail?.product_images}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(
                            event.nativeEvent.contentOffset.x /
                            event.nativeEvent.layoutMeasurement.width
                        );
                        setCurrentIndex(index);
                    }}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item.product_image }}
                            style={styles.detailImg}
                            resizeMode="cover"
                        />
                    )}
                />
            </View>
            {/* 🔥 Indicator */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                {productDetail?.product_images?.map((_: any, index: number) => (
                    <View
                        key={index}
                        style={[
                            {
                                height: 6,
                                width: 6,
                                borderRadius: 3,
                                backgroundColor: '#ccc',
                                marginHorizontal: 4,
                            },
                            index === currentIndex && { backgroundColor: '#004F9F' },
                        ]}
                    />
                ))}
            </View>
            <Text style={styles.titletext}>
                {productDetail?.product_name}
            </Text>
            <Text style={styles.desctext}>
                {productDetail?.product_description}
            </Text>
            <View >
                <DetailText title="Power input" value={productDetail?.power_input} />
                <DetailText title="Motor rating" value={productDetail?.motor_rating} />
                <DetailText title="Max flow rate" value={productDetail?.max_flow_rate} />
                <DetailText title="Max head" value={productDetail?.max_head} />
                <DetailText title="Inlet/Outlet size" value={productDetail?.inlet_outlet_size} />
                <DetailText title="Materials" value={productDetail?.material} />
            </View>
            {/* 🔥 Fixed Bottom Bar */}
            <View style={styles.addtoCart}>
                <Text style={styles.price}>₹{productDetail?.product_price}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={onCartPress}>
                    <View style={styles.addtoCartButton}>
                        <Text style={styles.addtoCartText}>
                            {alreadyAdded ? 'View Cart' : 'Add Cart'}
                        </Text>


                    </View>
                </TouchableOpacity>
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={3000}
                    style={{
                        backgroundColor: snackbarType === 'success' ? '#4CAF50' : '#F44336',
                    }}
                >
                    {snackbarMsg}
                </Snackbar>
            </View>
        </View>
    );
};

export default EquipmentDetails;


const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    detailImg: {
        width: width - 40,   // because you have paddingHorizontal: 20
        height: 220,
        borderRadius: 4,
    },
    titletext: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: '500',
        lineHeight: 28,
        color: 'black',
        textAlign: 'auto',
    },
    desctext: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '300',
        lineHeight: 28,
        color: 'grey',
        textAlign: 'auto',
    },
    addtoCartButton: {
        width: '100%',
        height: 48,
        backgroundColor: '#004F9F',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addtoCart: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
        backgroundColor: 'white',
        borderRadius: 50,
        paddingHorizontal: 20,
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    addtoCartText: {
        color: 'white',
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 1,
    },
    disabledButton: {
        backgroundColor: '#9E9E9E',
    },
})
