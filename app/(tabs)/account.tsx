import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function AccountScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://example.com/profile.jpg' }} 
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: theme.colors.text }]}>CodePlays</Text>
          <Text style={[styles.profileEmail, { color: theme.colors.text }]}>digitra.18@gmail.com</Text>
        </View>
      </View>

      <View style={[styles.menuContainer, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person" size={24} color={theme.colors.text} />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>Personal Information</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="card" size={24} color={theme.colors.text} />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="location" size={24} color={theme.colors.text} />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>Delivery Address</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="time" size={24} color={theme.colors.text} />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>Order History</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings" size={24} color={theme.colors.text} />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
        onPress={() => console.log('Logout')}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    opacity: 0.7,
  },
  menuContainer: {
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});