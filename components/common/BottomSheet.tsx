import { IcClose } from "@/components/icons";
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

const SLIDE_ANIMATION_OFFSET = 300;

export function BottomSheet({ visible, onClose, title, children, height }: BottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(SLIDE_ANIMATION_OFFSET)).current;
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
      slideAnim.setValue(SLIDE_ANIMATION_OFFSET);
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
            style={{
              transform: [{ translateY: slideAnim }],
              paddingBottom: (height ? 0 : 24) + insets.bottom,
            }}
            className="bg-white rounded-t-3xl p-4"
          >
            <View className="flex-row justify-between items-center pb-4 border-b border-gray-300">
              <Text className="text-body-16-bold text-gray-900">{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <IcClose />
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
