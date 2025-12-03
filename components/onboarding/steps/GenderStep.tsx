import { GENDER_OPTIONS } from "@/constants/onboarding";
import type { Gender } from "@/types/onboarding";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface GenderStepProps {
  onGenderSelect?: (gender: Gender | null) => void;
  initialGender?: Gender | null;
}

export function GenderStep({ onGenderSelect, initialGender }: GenderStepProps) {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(initialGender ?? null);

  const handleSelect = (gender: Gender) => {
    setSelectedGender(gender);
    onGenderSelect?.(gender);
  };

  return (
    <View className="flex-1">
      {GENDER_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          className={`border rounded-lg px-4 py-4 mb-3 ${
            selectedGender === option.value ? "border-primary-600 bg-primary-50" : "border-gray-300"
          }`}
          onPress={() => handleSelect(option.value)}
        >
          <Text
            className={
              selectedGender === option.value
                ? "text-body-16-semibold text-primary-600"
                : "text-body-16-regular text-gray-800"
            }
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
