import React from "react";
import { Text, View } from "react-native";

interface BookAISummaryCardProps {
  aiSummary: string;
  aiTags?: string[];
}

export default function BookAISummaryCard({ aiSummary, aiTags }: BookAISummaryCardProps) {
  return (
    <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
      <Text className="text-body-16-bold text-gray-900 mb-3">AI 요약</Text>
      <Text className="text-body-14-regular text-gray-700 leading-6">{aiSummary}</Text>
      {aiTags && aiTags.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mt-3">
          {aiTags.map((tag, index) => (
            <View key={index} className="bg-gray-200 rounded-full px-3 py-1">
              <Text className="text-body-12-regular text-gray-700">{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
