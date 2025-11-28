import ActionButton from "@/components/common/ActionButton";
import IcHeartFilled from "@/components/icons/IcHeartFilled";
import IcHeartOutline from "@/components/icons/IcHeartOutline";
import { colors } from "@/styles/colors";
import { TouchableOpacity, View } from "react-native";

interface BookActionButtonsProps {
  isLiked: boolean;
  onAddToLibrary: () => void;
  onToggleLike: () => void;
}

export default function BookActionButtons({
  isLiked,
  onAddToLibrary,
  onToggleLike,
}: BookActionButtonsProps) {
  return (
    <View className="flex-row items-center px-3 py-2 gap-2">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onToggleLike}
        className={`w-[3.375rem] h-[3.25rem] rounded-lg flex items-center justify-center bg-primary-500`}
      >
        <View className="items-center justify-center">
          {isLiked ? (
            <IcHeartFilled
              width={20}
              height={20}
              fill={colors.error.DEFAULT}
              stroke={colors.error.DEFAULT}
            />
          ) : (
            <IcHeartOutline width={20} height={20} stroke={colors.white} />
          )}
        </View>
      </TouchableOpacity>

      <ActionButton text="내 서재에 추가" onPress={onAddToLibrary} />
    </View>
  );
}
