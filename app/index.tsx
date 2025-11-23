import { useRouter } from "expo-router";
import StartHome from "@/components/StartHome";

export default function HomeScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return <StartHome onLogin={handleLogin} onSignup={handleSignup} />;
}
