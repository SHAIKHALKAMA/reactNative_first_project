import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  productId: number;
  quantity: number;
  onIncrease: (id: number) => Promise<void>;
  onDecrease: (id: number) => Promise<void>;
};

const CartQuantityControl = ({
  productId,
  quantity,
  onIncrease,
  onDecrease,
}: Props) => {
  const [localQty, setLocalQty] = useState(quantity);
  const [loading, setLoading] = useState<'plus' | 'minus' | null>(null);

  /** ➕ INCREASE */
  const handlePlus = async () => {
    setLoading('plus');
    setLocalQty(q => q + 1); // instant UI update

    try {
      await onIncrease(productId);
    } catch {
      setLocalQty(q => q - 1); // rollback on error
    } finally {
      setLoading(null);
    }
  };

  /** ➖ DECREASE */
  const handleMinus = async () => {
    setLoading('minus');
    setLocalQty(q => q - 1);

    try {
      await onDecrease(productId);
    } catch {
      setLocalQty(q => q + 1);
    } finally {
      setLoading(null);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMinus} disabled={loading !== null}>
        <Text style={styles.btn}>−</Text>
      </TouchableOpacity>

      <View style={styles.qtyBox}>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text style={styles.qty}>{localQty}</Text>
        )}
      </View>

      <TouchableOpacity onPress={handlePlus} disabled={loading !== null}>
        <Text style={styles.btn}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartQuantityControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#004F9F',
    backgroundColor: '#d3e9ffff',
    borderRadius: 6,
    height: 32,
    paddingHorizontal: 6,
  },
  btn: {
    fontSize: 18,
    fontWeight: '700',
    color: '#004F9F',
    paddingHorizontal: 8,
  },
  qtyBox: {
    width: 26,
    alignItems: 'center',
  },
  qty: {
    fontSize: 14,
    fontWeight: '600',
  },
});
