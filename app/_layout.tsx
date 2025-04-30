import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Urbanist-Regular": require("../assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-Bold": require("../assets/fonts/Urbanist-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}