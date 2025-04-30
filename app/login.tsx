import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { login, register } from "../services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert("Sesión iniciada");
      // Aquí puedes hacer redirect, por ejemplo: router.replace("/")
    } catch (error: any) {
      Alert.alert("Error al iniciar sesión", error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password);
      Alert.alert("Usuario registrado");
    } catch (error: any) {
      Alert.alert("Error al registrarse", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Iniciar sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <View style={{ height: 10 }} />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}