import { BottomSheet, BottomSheetOption } from "@/components/common/BottomSheet";
import type { LibraryStatus } from "@/types/library/library";

interface LibraryStatusBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (status: LibraryStatus) => void;
  selectedStatus?: LibraryStatus;
}

const STATUS_OPTIONS: LibraryStatus[] = ["완독", "읽고 싶음"];

export default function LibraryStatusBottomSheet({
  visible,
  onClose,
  onSelect,
  selectedStatus,
}: LibraryStatusBottomSheetProps) {
  const handleSelect = (status: LibraryStatus) => {
    onSelect(status);
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="독서 상태 선택">
      {STATUS_OPTIONS.map((status) => (
        <BottomSheetOption
          key={status}
          label={status}
          isSelected={selectedStatus === status}
          onPress={() => handleSelect(status)}
        />
      ))}
    </BottomSheet>
  );
}
