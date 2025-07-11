import { coffeeData, promotions } from '@/design.json';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from 'react-native-paper';

const { width: windowWidth } = Dimensions.get('window');
const ITEM_WIDTH = windowWidth * 0.8;
const ITEM_MARGIN = 10;

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Filter coffee data based on selected category
  const filteredCoffeeData = selectedCategory === 'All' 
    ? coffeeData 
    : coffeeData.filter(item => item.category === selectedCategory);

  // Filter coffee data based on search query
  const searchedCoffeeData = searchQuery 
    ? filteredCoffeeData.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredCoffeeData;

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % promotions.length;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePromotionPress = (promotion) => {
    console.log('Promotion selected:', promotion.title);
    // Navigate to promotion details or menu
    navigation.navigate('menu', { promotion });
  };

  const handleCoffeePress = (coffee) => {
    console.log('Coffee selected:', coffee.name);
    // Navigate to coffee details or add to cart
    navigation.navigate('menu', { coffee });
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    // Scroll to top when category changes
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleSearchPress = () => {
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const renderPromotionItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + ITEM_MARGIN * 2),
      index * (ITEM_WIDTH + ITEM_MARGIN * 2),
      (index + 1) * (ITEM_WIDTH + ITEM_MARGIN * 2),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={() => handlePromotionPress(item)}
      >
        <Animated.View 
          style={[
            styles.slide, 
            { 
              backgroundColor: theme.colors.surface,
              transform: [{ scale }],
              opacity,
              width: ITEM_WIDTH,
              marginHorizontal: ITEM_MARGIN,
            }
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.slideImage} />
          <View style={styles.slideContent}>
            <Text style={[styles.slideTitle, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.slideText, { color: theme.colors.text }]}>{item.description}</Text>
            <TouchableOpacity 
              style={[styles.slideButton, { backgroundColor: theme.colors.accent }]}
              onPress={() => handlePromotionPress(item)}
            >
              <Text style={styles.buttonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderCoffeeItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={[styles.coffeeItem, { backgroundColor: theme.colors.surface }]}
        onPress={() => handleCoffeePress(item)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.image }} style={styles.coffeeImage} />
        <Text style={[styles.coffeeName, { color: theme.colors.text }]}>{item.name}</Text>
        <Text style={[styles.coffeePrice, { color: theme.colors.accent }]}>${item.price}</Text>
      </TouchableOpacity>
    );
  };

  const renderVerticalCoffeeItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={[styles.verticalCoffeeItem, { backgroundColor: theme.colors.surface }]}
        onPress={() => handleCoffeePress(item)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.image }} style={styles.verticalCoffeeImage} />
        <View style={styles.verticalCoffeeDetails}>
          <Text style={[styles.verticalCoffeeName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.verticalCoffeeDesc, { color: theme.colors.text }]}>{item.description || 'Delicious coffee'}</Text>
          <Text style={[styles.verticalCoffeePrice, { color: theme.colors.accent }]}>${item.price}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: theme.colors.accent }]}
          onPress={() => console.log('Add to cart', item)}
        >
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (ITEM_WIDTH + ITEM_MARGIN * 2));
        setActiveIndex(index);
      }
    }
  );

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.colors.text }]}>Good Morning</Text>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>CodePlays</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('notifications')}>
          <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface }]}>
        <Ionicons name="search" size={20} color={theme.colors.text} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search your coffee..."
          placeholderTextColor={theme.colors.text + '80'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchPress}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Custom Promotions Carousel */}
      <View style={styles.carouselContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={promotions}
          renderItem={renderPromotionItem}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH + ITEM_MARGIN * 2}
          decelerationRate="fast"
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.carouselContent}
          initialScrollIndex={0}
          getItemLayout={(data, index) => ({
            length: ITEM_WIDTH + ITEM_MARGIN * 2,
            offset: (ITEM_WIDTH + ITEM_MARGIN * 2) * index,
            index,
          })}
        />
        
        {/* Custom Pagination */}
        <View style={styles.pagination}>
          {promotions.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setActiveIndex(index);
                flatListRef.current?.scrollToIndex({ index, animated: true });
              }}
              activeOpacity={0.6}
            >
              <View
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor: index === activeIndex 
                      ? theme.colors.accent 
                      : theme.colors.text + '80',
                    width: index === activeIndex ? 20 : 8,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Horizontal Categories */}
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Categories</Text>
      <FlatList
        data={['All', 'Cappuccino', 'Espresso', 'Latte', 'Americano', 'Mocha']}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryButton,
              {
                backgroundColor: item === selectedCategory 
                  ? theme.colors.accent 
                  : theme.colors.surface,
              },
            ]}
            onPress={() => handleCategoryPress(item)}
            activeOpacity={0.7}
          >
            <Text style={{ 
              color: item === selectedCategory ? 'white' : theme.colors.text,
              fontWeight: item === selectedCategory ? 'bold' : 'normal'
            }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      />

      {/* Horizontal Coffee List */}
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Popular Coffee</Text>
      <FlatList
        data={searchedCoffeeData}
        renderItem={renderCoffeeItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.coffeeList}
      />

      {/* Vertical Coffee List */}
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Special Offers</Text>
      <FlatList
        data={searchedCoffeeData.filter(item => item.specialOffer)}
        renderItem={renderVerticalCoffeeItem}
        keyExtractor={(item) => item.id + '-vertical'}
        scrollEnabled={false}
        contentContainerStyle={styles.verticalCoffeeList}
      />
    </ScrollView>
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
  greeting: {
    fontSize: 14,
    opacity: 0.8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselContent: {
    paddingHorizontal: (windowWidth - ITEM_WIDTH) / 2 - ITEM_MARGIN,
  },
  slide: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  slideImage: {
    width: '100%',
    height: 150,
  },
  slideContent: {
    padding: 15,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  slideText: {
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.8,
  },
  slideButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    transitionDuration: '300ms',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  categories: {
    paddingBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },
  coffeeList: {
    paddingBottom: 20,
  },
  coffeeItem: {
    width: 150,
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    elevation: 3,
  },
  coffeeImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  coffeePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  verticalCoffeeList: {
    paddingBottom: 30,
  },
  verticalCoffeeItem: {
    flexDirection: 'row',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    alignItems: 'center',
  },
  verticalCoffeeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  verticalCoffeeDetails: {
    flex: 1,
  },
  verticalCoffeeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  verticalCoffeeDesc: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 5,
  },
  verticalCoffeePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});