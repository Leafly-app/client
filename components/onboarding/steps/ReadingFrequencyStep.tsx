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
    <View className="flex-1 gap-4">
      {READING_FREQUENCY_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          className={`border rounded-2xl px-3 py-3 items-center ${
            selectedFrequency === option.value
              ? "border-primary-600 bg-primary-50"
              : "border-gray-900"
          }`}
          onPress={() => handleSelect(option.value)}
        >
          <Text
            className={`text-body-16-semibold ${
              selectedFrequency === option.value ? "text-primary-600" : "text-gray-900"
            }`}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
