import type { FlashMode } from "expo-camera";
import { TouchableOpacity, View } from "react-native";
import GoBackIcon from "@/assets/images/goback.svg";
import ScanZapIcon from "@/assets/images/scan/scan_zap.svg";

interface ScanHeaderProps {
  onBackPress: () => void;
  flash: FlashMode;
  onFlashToggle: () => void;
}

export function ScanHeader({ onBackPress, flash, onFlashToggle }: ScanHeaderProps) {
  return (
    <View className="flex-row justify-between items-center px-5 py-3">
      <TouchableOpacity onPress={onBackPress} className="p-2" activeOpacity={0.7}>
        <GoBackIcon width={24} height={24} fill="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onFlashToggle} className="p-2" activeOpacity={0.7}>
        <View className={flash === "on" ? "opacity-100" : "opacity-50"}>
          <ScanZapIcon width={24} height={24} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
