import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Üdvözlünk a PlanUp-ban!</Text>
      <Text style={styles.subtitle}>
        A legjobb platform, hogy felfedezd a programokat, eseményeket és kalandokat.
      </Text>
      <Button
        title="Fedezd fel most!"
        onPress={() => navigation.navigate('Swipe')}
        color="#4CAF50"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 24,
    color: '#FF69B4',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },
});
