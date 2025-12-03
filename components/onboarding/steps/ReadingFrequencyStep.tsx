import { READING_FREQUENCY_OPTIONS } from "@/constants/onboarding";
import type { ReadingFrequency } from "@/types/onboarding";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ReadingFrequencyStepProps {
  onFrequencySelect?: (frequency: ReadingFrequency | null) => void;
  initialFrequency?: ReadingFrequency | null;
}

export function ReadingFrequencyStep({
  onFrequencySelect,
  initialFrequency,
}: ReadingFrequencyStepProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<ReadingFrequency | null>(
    initialFrequency ?? null,
  );

  const handleSelect = (frequency: ReadingFrequency) => {
    setSelectedFrequency(frequency);
    onFrequencySelect?.(frequency);
  };

  return (
    <View className="flex-1">
      {READING_FREQUENCY_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          className={`border rounded-lg px-4 py-4 mb-3 ${
            selectedFrequency === option.value
              ? "border-primary-600 bg-primary-50"
              : "border-gray-300"
          }`}
          onPress={() => handleSelect(option.value)}
        >
          <Text
            className={
              selectedFrequency === option.value
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
