import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ModalScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-lg mb-4">Modal Screen</Text>
      <Link href="/" dismissTo>
        <Text className="text-blue-500">Go to home screen</Text>
      </Link>
    </View>
  );
}
