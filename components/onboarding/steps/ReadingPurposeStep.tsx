import { READING_PURPOSE_OPTIONS } from "@/constants/onboarding";
import type { ReadingPurpose } from "@/types/onboarding";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ReadingPurposeStepProps {
  onPurposeSelect?: (purpose: ReadingPurpose | null) => void;
  initialPurpose?: ReadingPurpose | null;
}

export function ReadingPurposeStep({ onPurposeSelect, initialPurpose }: ReadingPurposeStepProps) {
  const [selectedPurpose, setSelectedPurpose] = useState<ReadingPurpose | null>(
    initialPurpose ?? null,
  );

  const handleSelect = (purpose: ReadingPurpose) => {
    setSelectedPurpose(purpose);
    onPurposeSelect?.(purpose);
  };

  return (
    <View className="flex-1">
      {READING_PURPOSE_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          className={`border rounded-lg px-4 py-4 mb-3 ${
            selectedPurpose === option.value
              ? "border-primary-600 bg-primary-50"
              : "border-gray-300"
          }`}
          onPress={() => handleSelect(option.value)}
        >
          <Text
            className={`text-body-16-semibold text-center mb-1 ${
              selectedPurpose === option.value ? "text-primary-600" : "text-gray-800"
            }`}
          >
            {option.label}
          </Text>
          <Text
            className={`text-body-14-regular text-center ${
              selectedPurpose === option.value ? "text-primary-600" : "text-gray-600"
            }`}
          >
            {option.description}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
