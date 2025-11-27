import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BottomSheet } from "@/components/common/BottomSheet";

interface ISBNInputBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSearch: (isbn: string) => void;
}

export function ISBNInputBottomSheet({ visible, onClose, onSearch }: ISBNInputBottomSheetProps) {
  const [isbn, setIsbn] = useState("");

  const handleSearch = () => {
    const trimmedIsbn = isbn.trim();

    if (!trimmedIsbn) {
      Alert.alert("안내", "ISBN을 입력해주세요.");
      return;
    }

    if (trimmedIsbn.length !== 10 && trimmedIsbn.length !== 13) {
      Alert.alert("안내", "ISBN은 10자리 또는 13자리 숫자입니다.");
      return;
    }

    setIsbn("");
    onClose();
    onSearch(trimmedIsbn);
  };

  const handleClose = () => {
    setIsbn("");
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={handleClose} title="ISBN 수동 입력">
      <View className="px-6 py-4">
        <Text className="text-body-14-regular text-gray-600 mb-4">
          책의 ISBN 바코드를 직접 입력해주세요
        </Text>

        <TextInput
          className="bg-gray-100 rounded-xl px-4 py-3 text-body-14-regular text-gray-900 mb-4"
          placeholder="ISBN 입력 (10자리 또는 13자리)"
          placeholderTextColor="#9CA3AF"
          value={isbn}
          onChangeText={setIsbn}
          keyboardType="numeric"
          maxLength={13}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />

        <TouchableOpacity
          onPress={handleSearch}
          className="bg-primary-600 rounded-xl py-4 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-white text-body-16-semibold">검색</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}
