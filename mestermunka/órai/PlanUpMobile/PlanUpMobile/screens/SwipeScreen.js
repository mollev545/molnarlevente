import React, { useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default function SwipeScreen() {
  const [programs, setPrograms] = useState([
    { id: 1, name: 'Budapest Walking Tour', description: 'Explore the city' },
    { id: 2, name: 'Danube Cruise', description: 'Enjoy the river' },
    { id: 3, name: 'Szentendre Art Walk', description: 'Discover art galleries' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    console.log(direction === 'right' ? 'Liked' : 'Disliked');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % programs.length);
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: new Animated.Value(0) } }],
    { useNativeDriver: true }
  );

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.END) {
          if (event.nativeEvent.translationX > 100) {
            handleSwipe('right');
          } else if (event.nativeEvent.translationX < -100) {
            handleSwipe('left');
          }
        }
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{programs[currentIndex].name}</Text>
        <Text style={styles.description}>{programs[currentIndex].description}</Text>
        <Text style={styles.instruction}>Swipe left or right to like/dislike</Text>
      </View>
    </PanGestureHandler>
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
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#AAAAAA',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#555555',
  },
});
