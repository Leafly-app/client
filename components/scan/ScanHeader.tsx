import GoBackIcon from "@/assets/images/goback.svg";
import ScanZapIcon from "@/assets/images/scan/scan_zap.svg";
import { TouchableOpacity, View } from "react-native";

interface ScanHeaderProps {
  onBackPress: () => void;
  enableTorch: boolean;
  onFlashToggle: () => void;
}

export function ScanHeader({ onBackPress, enableTorch, onFlashToggle }: ScanHeaderProps) {
  return (
    <View className="flex-row justify-between items-center px-5 py-3">
      <TouchableOpacity onPress={onBackPress} className="p-2" activeOpacity={0.7}>
        <GoBackIcon width={24} height={24} fill="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onFlashToggle} className="p-2" activeOpacity={0.7}>
        <ScanZapIcon width={24} height={24} fill={enableTorch ? "#0BAE39" : "#FFFFFF"} />
      </TouchableOpacity>
    </View>
  );
}
