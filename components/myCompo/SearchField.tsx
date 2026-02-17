import { Image, StyleSheet, TextInput, View } from 'react-native';

const SearchField = ({value, onChangeText}: any) => {
    return (
        <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: 20 }}>
            <View style={styles.searchContainer}>
                <Image
                    source={require('@/assets/search.png')}
                    style={styles.searchIcon}
                />
                <TextInput
                    maxLength={20}
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#999"
                />
            </View>
        </View>
    );
};

export default SearchField;

const styles = StyleSheet.create({
    searchContainer: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        marginBottom: 20,
    },
    searchIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
        tintColor: '#9CA3AF',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
        fontFamily: 'Inter-Regular',
    },
});
