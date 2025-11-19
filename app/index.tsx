import SplashHome from "@/components/splashHome";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return <SplashHome onLogin={handleLogin} onSignup={handleSignup} />;
}
