import Appbar from '@/components/myCompo/appbar';
import Drawer from '@/components/myCompo/drawer';
import HomeItems from '@/components/myCompo/homeItems';
import SearchField from '@/components/myCompo/SearchField';
import { getProducts } from '@/services/bannerService';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';




const SearchEquipment = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    const products = data?.status ? data.data : [];

    const filteredProducts = useMemo(() => {
        if (!searchText) return products;

        return products.filter((item: any) =>
            item.product_name
                ?.toLowerCase()
                .includes(searchText.toLowerCase())
        );
    }, [searchText, products]);



    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 10, paddingTop: 20 }}>
            <Appbar title="Search" showBack showMenu={true} onMenuPress={() => setOpen(true)} />
            <Drawer visible={open} onClose={() => setOpen(false)} />
            {isLoading ? (
                <ActivityIndicator size="large" style={{ marginTop: 40 }} />
            ) : (<FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ListHeaderComponent={<SearchField
                    value={searchText}
                    onChangeText={(text: string) => setSearchText(text)}
                />}
                renderItem={({ item }) => (
                    <HomeItems
                        title={item.product_name}
                        img={item.product_image}
                        onPress={() =>
                            router.push({
                                pathname: '/pages/equipmentDetails',
                                params: {
                                    product_id: item.id,
                                },
                            })
                        }
                    />
                )}
            />
            )}
        </View>

    );
};

export default SearchEquipment;
