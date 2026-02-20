import Appbar from '@/components/myCompo/appbar';
import HomeItems from '@/components/myCompo/homeItems';
import { getBanners, getServices } from '@/services/bannerService';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
const { width } = Dimensions.get('window');



const Home = () => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const { data: bannerData, isLoading: bannerLoading } = useQuery({
        queryKey: ['banners'],
        queryFn: getBanners,
    });

    // ✅ Services Query
    const { data: serviceData, isLoading: serviceLoading } = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
    });

    const banners = bannerData?.data || [];
    const services = serviceData?.data || [];

    useEffect(() => {
        if (!banners.length) return;
        const interval = setInterval(() => {
            const nextIndex =
                currentIndex + 1 >= banners.length ? 0 : currentIndex + 1;

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });

            setCurrentIndex(nextIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, banners]);


    const renderBanner = ({ item, index }: any) => {
        return (
            <View style={{ width }}>
                <Image
                    source={{ uri: item.banner_image }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                />

                {/* Indicator on image */}
                <View style={styles.indicatorOverlay}>
                    {banners.map((_: any, i: number) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                i === currentIndex && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
            </View>
        );
    };

    const onEquipmentsPress = () => {
        router.push('/(tabs)/equipment');
    };
    const onAmcPress = () => {
        router.push('/amc');
    };
    const onNewPoolDevelopmentPress = () => {
        router.push('/pages/newPoolDevelopment');
    };
    const onReferralPrivilegePress = () => {
        router.push('/pages/referralPrivilege');
    };
    return (
        <View style={styles.main}>
            <Appbar title={''} showLeading={true} showSearchbar={true} />

            {/* 🔥 Banner Section */}

            <View style={styles.header}>
                {bannerLoading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <>
                        <FlatList
                            ref={flatListRef}
                            data={banners}
                            renderItem={renderBanner}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={(event) => {
                                const index = Math.round(
                                    event.nativeEvent.contentOffset.x / width
                                );
                                setCurrentIndex(index);
                            }}
                        />
                    </>
                )}
            </View>
            {serviceLoading ? (
                <ActivityIndicator size="large" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={services}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ padding: 20 }}
                    renderItem={({ item }) => (
                        <HomeItems
                            title={item.service_name}
                            img={item.service_image}
                            onPress={() => {
                                if (item.service_name === 'Equipments') {
                                    onEquipmentsPress();
                                }
                                if (item.service_name === 'AMC') {
                                    onAmcPress();
                                }
                                if (item.service_name === 'New Pool Development') {
                                    onNewPoolDevelopmentPress();
                                }
                                if (item.service_name === 'Referral Privilege') {
                                    onReferralPrivilegePress();
                                }
                                console.log(item.service_name)

                            }}
                        />
                    )}
                />
            )}


        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    bannerImage: {
        width: width - 40,
        height: 200,
        borderRadius: 4,
    },
    indicatorOverlay: {
        position: 'absolute',
        bottom: 12,
        right: 25,
        flexDirection: 'row',
    },
    dot: {
        height: 6,
        width: 6,
        borderRadius: 30,
        backgroundColor: 'white',
        marginHorizontal: 3,
    },
    activeDot: {
        backgroundColor: 'black',
        width: 12,
    },
    main: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop: 20,
        borderRadius: 12,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 12,
    },
    logo: {
        height: 180,
        width: '100%',
        borderRadius: 12,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

