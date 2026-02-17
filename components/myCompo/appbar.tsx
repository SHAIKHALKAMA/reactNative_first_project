import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type AppbarProps = {
    title: string;
    showTrailing?: boolean;
    showSearchbar?: boolean;
    showLeading?: boolean;
    showMenu?: boolean;
    showBack?: boolean;
    onMenuPress?: () => void;
};




const Appbar = ({
    title,
    showLeading = false,
    showTrailing = false,
    showMenu = false,
    showSearchbar = false,
    showBack = false,
    onMenuPress,
}: AppbarProps) => {
    const router = useRouter();
    const onSearch = () => {
        router.push('/(tabs)/equipment');
    }
    return (
        <View style={[
            styles.container,
            { paddingHorizontal: showBack ? 0 : 20 },
        ]}>
            {showBack && (
                <TouchableOpacity onPress={() => router.back()}>    
                    <Image
                        source={require('@/assets/Back.png')}
                        style={styles.back}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
            {showLeading && (
                <Image
                    source={require('@/assets/appbarTitle.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            )}

            <Text style={styles.title}>{title}</Text>
            <View style={{ flex: 1 }} />
            {showSearchbar && (
                <TouchableOpacity onPress={onSearch}>
                    <Image source={require('@/assets/search_icon.png')}
                        style={styles.searchIcon}
                    ></Image>
                </TouchableOpacity>
            )}
            {showMenu && (
                <TouchableOpacity onPress={onMenuPress}>
                    <Image source={require('@/assets/menu.png')} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Appbar;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        height: 50,
        width: '100%',
        backgroundColor: '#fff',

    },
    back: {
        height: 50,
        marginRight: 20,
    },
    logo: {
        width: 125,
        height: 50,
        marginRight: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    searchIcon: {
        marginRight: 10
    },
});
