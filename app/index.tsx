import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import StartHome from "@/components/StartHome";
import { useAuthStore } from "@/store/useAuthStore";

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading, loadToken } = useAuthStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: loadToken은 안정적인 함수이므로 의존성에서 제외
  useEffect(() => {
    loadToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: router.replace는 안정적인 함수이므로 의존성에서 제외
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/(tabs)");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
