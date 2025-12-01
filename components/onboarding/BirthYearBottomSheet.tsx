import { ScrollView } from "react-native";
import { BottomSheet, BottomSheetOption } from "@/components/common/BottomSheet";

interface BirthYearBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (year: number) => void;
  selectedYear?: number;
}

export function BirthYearBottomSheet({
  visible,
  onClose,
  onSelect,
  selectedYear,
}: BirthYearBottomSheetProps) {
  const years = Array.from({ length: 111 }, (_, i) => 2020 - i);

  const handleSelect = (year: number) => {
    onSelect(year);
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="출생연도 선택">
      <ScrollView className="max-h-96">
        {years.map((year) => (
          <BottomSheetOption
            key={year}
            label={`${year}년`}
            isSelected={selectedYear === year}
            onPress={() => handleSelect(year)}
          />
        ))}
      </ScrollView>
    </BottomSheet>
  );
}
