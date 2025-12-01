import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AnimatedSplash from "../components/common/AnimatedSplash";
import "../global.css";
import { useCustomFonts } from "../hooks/useCustomFonts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fontsLoaded = useCustomFonts();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSplashEnd = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (showSplash) {
    return <AnimatedSplash onAnimationEnd={handleSplashEnd} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="book/[isbn]" options={{ headerShown: false }} />
        <Stack.Screen name="review/create" options={{ headerShown: false }} />
        <Stack.Screen name="review/[id]" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
