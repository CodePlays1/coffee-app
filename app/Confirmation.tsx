import { useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';

export default function ConfirmationScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { cartItems, total, clearCart } = useCart();

  const orderNumber = `#${Math.floor(100000 + Math.random() * 900000)}`;
  const readyTime = new Date();
  readyTime.setMinutes(readyTime.getMinutes() + Math.floor(15 + Math.random() * 10));

  React.useEffect(() => {
    return () => {
      clearCart();
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Animatable.View
        animation="bounceIn"
        duration={1000}
        style={[styles.circle, { borderColor: theme.colors.accent }]}
      >
        <Ionicons name="checkmark" size={60} color={theme.colors.accent} />
      </Animatable.View>

      <Animatable.Text
        animation="fadeInUp"
        delay={300}
        style={[styles.title, { color: theme.colors.text }]}
      >
        Order Confirmed!
      </Animatable.Text>

      <Animatable.Text
        animation="fadeInUp"
        delay={500}
        style={[styles.subtitle, { color: theme.colors.text }]}
      >
        Thank you for your purchase
      </Animatable.Text>

      <Animatable.View
        animation="fadeInUp"
        delay={700}
        style={[
          styles.summaryContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
          Order Summary
        </Text>

        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={[styles.itemName, { color: theme.colors.text }]}>
              {item.quantity}x {item.name}
            </Text>
            <Text style={[styles.itemPrice, { color: theme.colors.text }]}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={[styles.totalText, { color: theme.colors.text }]}>
            Total
          </Text>
          <Text style={[styles.totalAmount, { color: theme.colors.accent }]}>
            ${(total + 2).toFixed(2)}
          </Text>
        </View>
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        delay={900}
        style={styles.detailsContainer}
      >
        <View style={styles.detailRow}>
          <Ionicons name="receipt" size={20} color={theme.colors.text} />
          <Text style={[styles.detailText, { color: theme.colors.text }]}>
            Order: {orderNumber}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="time" size={20} color={theme.colors.text} />
          <Text style={[styles.detailText, { color: theme.colors.text }]}>
            Ready by:{" "}
            {readyTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="location" size={20} color={theme.colors.text} />
          <Text style={[styles.detailText, { color: theme.colors.text }]}>
            123 Coffee St, Your City
          </Text>
        </View>
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        delay={1100}
        style={{ width: "100%" }}
      >
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.accent }]}
onPress={() => navigation.navigate('(tabs)', { screen: 'menu' })}
        >
          <Text style={styles.buttonText}>Back to Menu</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    opacity: 0.8,
    textAlign: 'center',
  },
  summaryContainer: {
    width: '100%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
