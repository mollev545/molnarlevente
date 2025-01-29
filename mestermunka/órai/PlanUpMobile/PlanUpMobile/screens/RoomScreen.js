import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

export default function RoomScreen() {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Szoba 1' },
    { id: 2, name: 'Szoba 2' },
    { id: 3, name: 'Szoba 3' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    console.log(direction === 'right' ? 'Right swipe' : 'Left swipe');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
  };

  const currentRoom = rooms[currentIndex];

  return (
    <PanGestureHandler
      onGestureEvent={(e) => {
        const { translationX } = e.nativeEvent;
        if (translationX > 100) {
          handleSwipe('right');
        } else if (translationX < -100) {
          handleSwipe('left');
        }
      }}
    >
      <View style={styles.container}>
        <Text style={styles.roomName}>{currentRoom.name}</Text>
        <Text style={styles.instruction}>Swipe left or right to navigate rooms</Text>
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
  roomName: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#AAAAAA',
  },
});
