import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

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
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 111 }, (_, i) => currentYear - i);

  const handleSelect = (year: number) => {
    onSelect(year);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 justify-end bg-black/50"
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View className="bg-white rounded-t-3xl">
            <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
              <Text className="text-lg font-semibold">출생연도 선택</Text>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-gray-500 text-xl">✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-96">
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  className={`px-6 py-4 border-b border-gray-100 ${
                    selectedYear === year ? "bg-primary-50" : ""
                  }`}
                  onPress={() => handleSelect(year)}
                >
                  <Text
                    className={`text-base ${
                      selectedYear === year ? "text-primary-600 font-semibold" : "text-gray-800"
                    }`}
                  >
                    {year}년
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
