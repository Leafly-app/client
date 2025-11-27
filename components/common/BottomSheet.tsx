import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, type DimensionValue, Modal, Text, TouchableOpacity, View } from "react-native";

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  height?: DimensionValue;
}

export function BottomSheet({ visible, onClose, title, children, height }: BottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      slideAnim.setValue(300);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 justify-end bg-black/50"
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <Animated.View
            style={{ transform: [{ translateY: slideAnim }] }}
            className={`bg-white rounded-t-3xl ${height ? "" : "pb-6"}`}
          >
            <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
              <Text className="text-lg font-semibold">{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-gray-500 text-xl">✕</Text>
              </TouchableOpacity>
            </View>

            <View style={height ? { height } : undefined}>{children}</View>
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

// ... BottomSheetOption 코드는 그대로 유지 ...
export function BottomSheetOption({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      className={`px-6 py-4 border-b border-gray-100 ${isSelected ? "bg-primary-50" : ""}`}
      onPress={onPress}
    >
      <Text
        className={`text-base ${isSelected ? "text-primary-600 font-semibold" : "text-gray-800"}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
