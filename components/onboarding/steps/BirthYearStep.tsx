import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BirthYearBottomSheet } from "../BirthYearBottomSheet";

interface BirthYearStepProps {
  onYearSelect?: (year: number | null) => void;
}

export function BirthYearStep({ onYearSelect }: BirthYearStepProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    onYearSelect?.(year);
  };

  return (
    <View className="flex-1">
      <TouchableOpacity
        className="border border-gray-300 rounded-lg px-4 py-4"
        onPress={() => setIsBottomSheetVisible(true)}
      >
        <Text className={`text-base ${selectedYear ? "text-gray-800" : "text-gray-400"}`}>
          {selectedYear ? `${selectedYear}년생` : "출생연도를 선택해주세요"}
        </Text>
      </TouchableOpacity>

      <BirthYearBottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        onSelect={handleYearSelect}
        selectedYear={selectedYear ?? undefined}
      />
    </View>
  );
}
