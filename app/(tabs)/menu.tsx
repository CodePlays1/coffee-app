import { useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import design from '../../design.json';

export default function MenuScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { addToCart, itemCount } = useCart();
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const { coffeeMenu } = design;

  const categories = React.useMemo(() => {
    return ['All', ...new Set(coffeeMenu.map(item => item.category))];
  }, [coffeeMenu]);

  const filteredItems = React.useMemo(() => {
    return selectedCategory === 'All'
      ? coffeeMenu
      : coffeeMenu.filter(item => item.category === selectedCategory);
  }, [selectedCategory, coffeeMenu]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Our Menu</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View style={styles.cartIconContainer}>
            <Ionicons name="cart" size={24} color={theme.colors.text} />
            {itemCount > 0 && (
              <View style={[styles.badge, { backgroundColor: theme.colors.accent }]}>
                <Text style={styles.badgeText}>{itemCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Category Filters */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isActive = item === selectedCategory;
          return (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: isActive ? theme.colors.accent : theme.colors.surface,
                  borderWidth: isActive ? 0 : 1,
                  borderColor: theme.colors.outline,
                },
              ]}
            >
              <Text
                style={{
                  color: isActive ? 'white' : theme.colors.text,
                  fontWeight: '600',
                  fontSize: 14,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Menu Items */}
      <FlatList
        data={filteredItems}
        numColumns={2}
        columnWrapperStyle={styles.menuRow}
        contentContainerStyle={styles.menuContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.colors.surface }]}
            onPress={() => navigation.navigate('ItemDetail', { item })}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.menuImage}
              resizeMode="cover"
            />
            <Text style={[styles.menuName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.menuPrice, { color: theme.colors.accent }]}>
              ${item.price.toFixed(2)}
            </Text>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.colors.accent }]}
              onPress={() => addToCart(item)}
            >
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
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
  cartIconContainer: {
    position: 'relative',
    padding: 10,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categories: {
    paddingBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 10,
  },
  menuContainer: {
    paddingBottom: 20,
  },
  menuRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  menuItem: {
    width: '48%',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },
  menuImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});
