import IcTwinkle from "@/components/icons/IcTwinkle";
import { colors } from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

interface BookAISummarySectionProps {
  summary: string;
  tags?: string[];
}

export default function BookAISummarySection({ summary, tags }: BookAISummarySectionProps) {
  return (
    <LinearGradient
      colors={["rgba(207, 232, 202, 0.90)", "rgba(255, 255, 255, 0.90)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="rounded-lg px-3 pt-4 pb-3 overflow-hidden"
    >
      <View className="flex-row items-center gap-2 mb-3">
        <View className="w-7 h-7 rounded-full bg-primary-500 items-center justify-center">
          <IcTwinkle width={16} height={16} fill={colors.white} />
        </View>
        <Text className="text-body-14-semibold text-gray-900">AI 요약</Text>
      </View>

      <Text className="text-body-12-regular text-gray-700 mb-3">{summary}</Text>

      {tags && tags.length > 0 && (
        <View className="flex-row flex-wrap gap-2.5">
          {tags.map((tag) => (
            <View
              key={tag}
              className="h-5 px-3 bg-primary-500 rounded-full items-center justify-center"
            >
              <Text className="text-body-10-regular text-white">{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </LinearGradient>
  );
}
