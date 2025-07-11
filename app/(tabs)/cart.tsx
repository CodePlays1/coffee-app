import { useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function CartScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { 
    cartItems, 
    updateQuantity, 
    removeItem, 
    total,
    clearCart,
    itemCount
  } = useCart();

  const handleCheckout = () => {
    // Process checkout logic here
    console.log('Proceeding to checkout');
    // Optionally clear cart after checkout
    // clearCart();
    navigation.navigate('Confirmation');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Your Cart</Text>
        {itemCount > 0 && (
          <TouchableOpacity onPress={clearCart}>
            <Text style={{ color: theme.colors.error }}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={60} color={theme.colors.text} />
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>Your cart is empty</Text>
          <TouchableOpacity 
            style={[styles.shopButton, { backgroundColor: theme.colors.accent }]}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.buttonText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView>
            {cartItems.map(item => (
              <View key={item.id} style={[styles.cartItem, { backgroundColor: theme.colors.surface }]}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={[styles.itemName, { color: theme.colors.text }]}>{item.name}</Text>
                  <Text style={[styles.itemPrice, { color: theme.colors.accent }]}>${item.price.toFixed(2)}</Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, -1)}
                    >
                      <Ionicons name="remove" size={20} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.quantity, { color: theme.colors.text }]}>{item.quantity}</Text>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Ionicons name="add" size={20} color={theme.colors.text} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Ionicons name="trash" size={20} color={theme.colors.error} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={[styles.summary, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryText, { color: theme.colors.text }]}>Subtotal</Text>
              <Text style={[styles.summaryText, { color: theme.colors.text }]}>${total.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryText, { color: theme.colors.text }]}>Delivery</Text>
              <Text style={[styles.summaryText, { color: theme.colors.text }]}>$2.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryTotal, { color: theme.colors.text }]}>Total</Text>
              <Text style={[styles.summaryTotal, { color: theme.colors.accent }]}>${(total + 2).toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.checkoutButton, { backgroundColor: theme.colors.accent }]}
              onPress={handleCheckout}
            >
              <Text style={styles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginVertical: 20,
  },
  shopButton: {
    padding: 15,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 5,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    padding: 10,
  },
  summary: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  checkoutButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
});