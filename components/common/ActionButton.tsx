import { colors } from "@/styles/colors";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ActionButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;
}

export default function ActionButton({
  text,
  onPress,
  disabled,
  loading,
  backgroundColor = colors.primary[500],
}: ActionButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={text}
      accessibilityState={{ disabled: isDisabled }}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisabled}
      style={{ backgroundColor: isDisabled ? colors.gray[400] : backgroundColor }}
      className="flex-1 h-14 rounded-lg items-center justify-center"
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-body-16-semibold text-white">{text}</Text>
      )}
    </TouchableOpacity>
  );
}
