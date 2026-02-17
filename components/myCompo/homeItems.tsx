import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

type HomeItemsProps = {
  title: string;
  img: string;
  onPress: () => void;
};

const HomeItems = ({ title, img, onPress }: HomeItemsProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onPress}>
      <Image source={{ uri: img }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HomeItems;

const styles = StyleSheet.create({
  card: {
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 6,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 4,
  },
  title: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
