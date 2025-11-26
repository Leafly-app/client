import DownArrowIcon from "@/assets/images/feed/list_down.svg";
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type SortOption = "latest" | "oldest" | "highRating" | "lowRating";

interface SortDropdownProps {
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  showDropdown: boolean;
  onToggleDropdown: () => void;
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "최신순" },
  { value: "oldest", label: "오래된순" },
  { value: "highRating", label: "별점 높은순" },
  { value: "lowRating", label: "별점 낮은순" },
];

const SortDropdown = React.memo<SortDropdownProps>(
  ({ selectedSort, onSortChange, showDropdown, onToggleDropdown }) => {
    const sortButtonRef = useRef<View>(null);
    const selectedSortLabel =
      SORT_OPTIONS.find((opt) => opt.value === selectedSort)?.label || "최신순";

    return (
      <View>
        <TouchableOpacity
          ref={sortButtonRef}
          activeOpacity={0.7}
          onPress={onToggleDropdown}
          className="flex-row items-center gap-1"
        >
          <Text className="text-body-14-regular text-gray-700">{selectedSortLabel}</Text>
          <DownArrowIcon width={16} height={16} />
        </TouchableOpacity>

        {showDropdown && (
          <View
            className="absolute top-8 right-0 bg-white rounded-lg shadow-lg z-50"
            style={{
              minWidth: 140,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            {SORT_OPTIONS.map((option, index) => (
              <TouchableOpacity
                key={option.value}
                activeOpacity={0.7}
                onPress={() => {
                  onSortChange(option.value);
                  onToggleDropdown();
                }}
                className={`py-3 px-4 ${index !== SORT_OPTIONS.length - 1 ? "border-b border-gray-200" : ""}`}
              >
                <Text
                  className={`text-body-14-${selectedSort === option.value ? "bold" : "regular"} ${
                    selectedSort === option.value ? "text-primary-600" : "text-gray-900"
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  },
);

SortDropdown.displayName = "SortDropdown";

export default SortDropdown;
