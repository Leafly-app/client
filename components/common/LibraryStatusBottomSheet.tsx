import { BottomSheet } from "@/components/common/BottomSheet";
import type { LibraryStatus } from "@/types/library/library";
import { Text, TouchableOpacity, View } from "react-native";

interface LibraryStatusBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (status: LibraryStatus) => void;
}

const STATUS_OPTIONS: LibraryStatus[] = ["완독", "읽고 싶어요"];

export default function LibraryStatusBottomSheet({
  visible,
  onClose,
  onSelect,
}: LibraryStatusBottomSheetProps) {
  const handleSelect = (status: LibraryStatus) => {
    onSelect(status);
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="내 서재에 추가">
      <View className="gap-5 pt-5">
        {STATUS_OPTIONS.map((status) => (
          <TouchableOpacity
            key={status}
            className="bg-primary-500 rounded-lg py-4 items-center"
            onPress={() => handleSelect(status)}
          >
            <Text className="text-body-16-semibold text-white">{status}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  );
}
