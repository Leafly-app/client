import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, type DimensionValue, Modal, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  height?: DimensionValue;
}

export function BottomSheet({ visible, onClose, title, children, height }: BottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const insets = useSafeAreaInsets();

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
  }, [visible, slideAnim]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 justify-end bg-black/50"
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <Animated.View
            style={{
              transform: [{ translateY: slideAnim }],
              paddingBottom: (height ? 0 : 24) + insets.bottom,
            }}
            className="bg-white rounded-t-3xl"
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
