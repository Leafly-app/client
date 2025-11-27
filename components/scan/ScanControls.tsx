import IcCamera from "@/assets/images/ic_camera.svg";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface ScanControlsProps {
  onManualInput: () => void;
  onCapture: () => void;
  isLoading: boolean;
}

export function ScanControls({ onManualInput, onCapture, isLoading }: ScanControlsProps) {
  return (
    <View className="pb-10 px-5">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={onManualInput} className="py-3 px-4" activeOpacity={0.7}>
          <Text className="text-white text-body-16-semibold">수동 입력</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onCapture}
          disabled={isLoading}
          className="items-center justify-center"
          activeOpacity={0.7}
        >
          <View
            className="w-16 h-16 rounded-full bg-brand items-center justify-center"
            style={isLoading ? { opacity: 0.5 } : undefined}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <IcCamera width={32} height={32} />
            )}
          </View>
        </TouchableOpacity>

        <View className="w-20" />
      </View>
    </View>
  );
}
