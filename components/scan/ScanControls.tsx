import { IcCamera } from "@/components/icons";
import { colors } from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface ScanControlsProps {
  onManualInput: () => void;
  onCapture: () => void;
  isLoading: boolean;
}

export function ScanControls({ onManualInput, onCapture, isLoading }: ScanControlsProps) {
  return (
    <View className="pb-20 px-5">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={onManualInput} className="py-3 px-4" activeOpacity={0.7}>
          <Text className="text-white text-body-16-regular">수동 입력</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onCapture}
          disabled={isLoading}
          className="items-center justify-center"
          activeOpacity={0.7}
        >
          <View
            className="items-center justify-center overflow-hidden"
            style={[
              {
                width: 48,
                height: 48,
                borderRadius: 24,
                borderWidth: 0.5,
                borderColor: "#FFF",
              },
              isLoading && { opacity: 0.5 },
            ]}
          >
            <LinearGradient
              colors={["rgba(170, 238, 188, 0.20)", "rgba(252, 241, 116, 0.20)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.primary[700]} />
            ) : (
              <IcCamera width={24} height={24} color={colors.primary[700]} />
            )}
          </View>
        </TouchableOpacity>

        <View className="w-20" />
      </View>
    </View>
  );
}
