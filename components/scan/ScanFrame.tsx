import { Text, View } from "react-native";

export function ScanFrame() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-[280px] h-[160px] border-[3px] border-green-400 rounded-xl" />
      <Text className="text-white text-center mt-6 px-6 text-body-16-regular">
        ISBN 바코드를 프레임 안에 맞춰주세요
      </Text>
    </View>
  );
}
