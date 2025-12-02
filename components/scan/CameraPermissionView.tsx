import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CameraPermissionViewProps {
  isLoading?: boolean;
  onRequestPermission: () => void;
}

export function CameraPermissionView({
  isLoading,
  onRequestPermission,
}: CameraPermissionViewProps) {
  const insets = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View
        className="flex-1 bg-black items-center justify-center"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <ActivityIndicator size="large" color="#0D4D21" />
        <Text className="text-white mt-4 text-body-14-regular">권한 확인 중...</Text>
      </View>
    );
  }

  return (
    <View
      className="flex-1 bg-black items-center justify-center px-6"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Text className="text-white text-center mb-6 text-heading-20-semibold">
        카메라 권한이 필요합니다
      </Text>
      <TouchableOpacity
        onPress={onRequestPermission}
        className="bg-primary-600 px-8 py-4 rounded-xl"
      >
        <Text className="text-white text-body-16-semibold">권한 허용하기</Text>
      </TouchableOpacity>
    </View>
  );
}
