import Appbar from '@/components/myCompo/appbar';
import Drawer from '@/components/myCompo/drawer';
import CartQuantityControl from '@/components/myCompo/increaseDecreaseQuantity';
import { addToCart, getCart, removeFromCart } from '@/services/cartService';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator, Alert, FlatList,
    Image,
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

const CartScreen = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState<any[]>([]);
    // const [snackbarMsg, setSnackbarMsg] = useState('');
    // const [snackbarType, setSnackbarType] = useState<'success' | 'error' | null>(null);
    const [summary, setSummary] = useState<any>(null);
    // const [snackbarVisible, setSnackbarVisible] = useState(false);

    const onPressContinue = () => {
        router.push('/pages/referralPrivilege2');
    }


    useEffect(() => {
        if (!cartItems) return;
        const totalItems = cartItems.reduce((a, b) => a + b.quantity, 0);
        const totalPrice = cartItems.reduce(
            (a, b) => a + b.quantity * b.product.product_price,
            0
        );

        setSummary({
            total_items: totalItems,
            sub_total: totalPrice,
            total_price: totalPrice,
            total_discount: 0,
        });
    }, [cartItems]);

    useEffect(() => {
        fetchCart();
    }, []);


    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await getCart();

            if (res.status) {
                setCartItems(res.data.items); // ✅ ONLY THIS
            }
        } catch (error: any) {
            console.log(error?.response?.data || error);
            Alert.alert('Error', 'Failed to load cart');
        } finally {
            setLoading(false);
        }
    };


    const handleIncrease = async (productId: number) => {
        // 1️⃣ Update UI immediately
        setCartItems(prev =>
            prev.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );

        try {
            console.log('➕ Increasing quantity:', productId);
            await addToCart(productId);
        } catch (err) {
            console.log('Increase failed, reverting');

            // ❌ rollback if API fails
            setCartItems(prev =>
                prev.map(item =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        }
    };



    const handleDecrease = async (productId: number) => {
        const currentItem = cartItems.find(
            item => item.product.id === productId
        );

        if (!currentItem) return;

        // 1️⃣ If quantity = 1 → REMOVE ITEM
        if (currentItem.quantity === 1) {
            setCartItems(prev =>
                prev.filter(item => item.product.id !== productId)
            );
        } else {
            // 2️⃣ Otherwise just decrease qty
            setCartItems(prev =>
                prev.map(item =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        }
        try {
            console.log('➖ Decreasing quantity:', productId);
            await removeFromCart(productId);
        } catch (err) {
            console.log('Decrease failed, reverting');
            setCartItems(prev => [...prev, currentItem]);
        }
    };

    const renderItem = ({ item }: any) => {
        const product = item.product;

        return (
            <View style={styles.card}>
                <Image
                    source={{ uri: product.product_images[0]?.product_image }}
                    style={styles.image}
                />

                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{product.product_name + ' ' + product.id}</Text>
                    {/* <Text style={styles.desc}>{product.product_description}</Text> */}

                    <View style={styles.row}>
                        <Text style={styles.price}>₹{product.product_price}</Text>
                        <CartQuantityControl
                            productId={product.id}
                            quantity={item.quantity}
                            onIncrease={handleIncrease}
                            onDecrease={handleDecrease}
                        />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <Appbar
                title="Cart"
                showBack
                showMenu
                onMenuPress={() => setOpen(true)}
            />

            <Drawer visible={open} onClose={() => setOpen(false)} />

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                </View>
            ) : cartItems.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                </View>
            ) : (
                <>
                    {/* 🔥 CART ITEMS */}
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 200 }}
                        showsVerticalScrollIndicator={false}
                    />
                    {/* 🔥 CART SUMMARY */}
                    <View style={styles.summary}>
                        <View style={styles.summaryRow}>
                            <Text>Total Items</Text>
                            <Text>{summary?.total_items ?? 0}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text>Total Price</Text>
                            <Text>₹{summary.total_price ?? 0}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text>Total Discount</Text>
                            <Text>- ₹{summary.total_discount ?? 0}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.bold}>Sub Total</Text>
                            <Text style={styles.bold}>₹{summary?.sub_total ?? 0}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.push('/pages/referralPrivilege2')}
                        >
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyText: {
        fontSize: 16,
        color: '#666',
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 6,
        marginRight: 10,
    },

    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },

    desc: {
        fontSize: 13,
        color: '#666',
        marginVertical: 4,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },

    price: {
        fontSize: 15,
        fontWeight: '600',
        color: '#004F9F',
    },

    qty: {
        fontSize: 14,
        color: '#333',
    },

    summary: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#eee',
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    bold: {
        fontWeight: '700',
    },

    button: {
        marginTop: 12,
        backgroundColor: '#004F9F',
        height: 48,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    increaseDecrease: {
        height: 30,
        borderWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        borderColor: '#004F9F'
    }

});
