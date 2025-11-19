import StartHome from "@/components/StartHome";
import { useRouter } from "expo-router";

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
