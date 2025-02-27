import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function RegistrationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sikeres regisztráció!");
        navigation.navigate("Login"); // Vissza a bejelentkezésre
      } else {
        Alert.alert("Hiba", data.message || "Valami hiba történt.");
      }
    } catch (error) {
      Alert.alert("Hiba", "Nem sikerült csatlakozni a szerverhez.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regisztráció</Text>
      <TextInput
        style={styles.input}
        placeholder="Név"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Jelszó"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Regisztráció" onPress={handleRegister} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate("Login")}
      >
        Van már fiókod? Jelentkezz be!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1a1a2e",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#2d2d44",
    color: "#fff",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 10,
    color: "#4CAF50",
    textDecorationLine: "underline",
  },
});
