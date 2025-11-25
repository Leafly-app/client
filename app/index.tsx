import StartHome from "@/components/StartHome";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading, loadToken } = useAuthStore();

  useEffect(() => {
    loadToken();
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isLoading, isAuthenticated]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0BAE39" />
      </View>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <StartHome onLogin={handleLogin} onSignup={handleSignup} />;
}
