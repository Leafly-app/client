import FilterIcon from "@/assets/images/feed/list_filter.svg";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FilterSectionProps {
  onFilterPress: () => void;
}

const FilterSection = React.memo<FilterSectionProps>(({ onFilterPress }) => {
  return (
    <View className="px-5 py-4">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onFilterPress}
        className="bg-gray-200 rounded-lg px-4 py-3 flex-row items-center gap-2"
        style={{ alignSelf: "flex-start" }}
      >
        <FilterIcon width={20} height={20} />
        <Text className="text-body-14-semibold text-gray-900">필터</Text>
      </TouchableOpacity>
    </View>
  );
});

FilterSection.displayName = "FilterSection";

export default FilterSection;
