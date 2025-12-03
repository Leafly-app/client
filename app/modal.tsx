import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ModalScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-body-16-semibold mb-4">Modal Screen</Text>
      <Link href="/" dismissTo>
        <Text className="text-body-16-regular text-primary-600">Go to home screen</Text>
      </Link>
    </View>
  );
}
