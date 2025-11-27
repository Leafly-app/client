import React from "react";
import { Text, TextInput, View } from "react-native";
import { colors } from "@/styles/colors";

interface ReviewFormCardProps {
  title: string;
  content: string;
  onTitleChange: (text: string) => void;
  onContentChange: (text: string) => void;
}

const ReviewFormCard = React.memo<ReviewFormCardProps>(
  ({ title, content, onTitleChange, onContentChange }) => {
    return (
      <>
        <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
          <Text className="text-body-14-semibold text-gray-900 mb-2">
            제목 <Text className="text-gray-500">(선택)</Text>
          </Text>
          <TextInput
            className="text-body-14-regular text-gray-900 bg-gray-100 rounded-lg px-4 py-3"
            placeholder="제목을 입력해주세요 (최대 10자)"
            placeholderTextColor={colors.gray[500]}
            value={title}
            onChangeText={onTitleChange}
          />
        </View>

        <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
          <Text className="text-body-14-semibold text-gray-900 mb-2">내용</Text>
          <TextInput
            className="text-body-14-regular text-gray-900 bg-gray-100 rounded-lg px-4 py-3"
            placeholder="이 책에 대한 생각을 자유롭게 적어보세요"
            placeholderTextColor={colors.gray[500]}
            value={content}
            onChangeText={onContentChange}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            style={{ minHeight: 200 }}
          />
          <View className="flex-row justify-end mt-2">
            <Text className="text-body-12-regular text-gray-500">
              {content.length}자 (최소 10자)
            </Text>
          </View>
        </View>
      </>
    );
  },
);

ReviewFormCard.displayName = "ReviewFormCard";

export default ReviewFormCard;
