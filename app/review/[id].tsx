import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import StarRating from "@/components/common/StarRating";
import { useReviewDetail } from "@/hooks/useReviewDetail";
import { colors } from "@/styles/colors";
import { formatDate } from "@/utils/formatDate";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Alert, Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ReviewDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const reviewId = Number(id);
  const { reviewDetail, isLoading, isDeleting, error, deleteReview } = useReviewDetail(reviewId);
  const insets = useSafeAreaInsets();

  const handleDelete = () => {
    Alert.alert("독후감 삭제", "정말 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          const result = await deleteReview();
          if (result.success) {
            Alert.alert("성공", "독후감이 삭제되었습니다.", [
              { text: "확인", onPress: () => router.push("/(tabs)/feed") },
            ]);
          } else {
            Alert.alert("오류", result.error || "독후감 삭제에 실패했습니다.");
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View
        className="flex-1 bg-gray-200"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <Header
          state="default"
          hasBack={true}
          hasSearch={false}
          titleType="text"
          title="독후감"
          onBackPress={() => router.back()}
        />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text className="text-body-14-regular text-gray-500 mt-4">로딩 중...</Text>
        </View>
      </View>
    );
  }

  if (error || !reviewDetail) {
    return (
      <View
        className="flex-1 bg-gray-200"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <Header
          state="default"
          hasBack={true}
          hasSearch={false}
          titleType="text"
          title="독후감"
          onBackPress={() => router.back()}
        />
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-14-regular text-gray-500">
            {error || "독후감을 불러올 수 없습니다."}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      className="flex-1 bg-gray-200"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Header
        state="default"
        hasBack={true}
        hasSearch={false}
        titleType="text"
        title="독후감"
        onBackPress={() => router.back()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1">
          <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
            <View className="flex-row">
              <View
                className="bg-gray-300 rounded-lg overflow-hidden mr-4"
                style={{ width: 85, height: 115 }}
              >
                {reviewDetail.thumbnail ? (
                  <Image
                    source={{ uri: reviewDetail.thumbnail }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="flex-1 items-center justify-center">
                    <View className="w-10 h-12 bg-gray-500 rounded" />
                  </View>
                )}
              </View>

              <View className="flex-1 justify-center">
                <Text className="text-body-16-bold text-gray-900 mb-2" numberOfLines={2}>
                  {reviewDetail.title}
                </Text>
                <Text className="text-body-14-regular text-gray-600 mb-2">
                  {reviewDetail.author}
                </Text>

                {reviewDetail.tags && reviewDetail.tags.length > 0 && (
                  <View className="flex-row flex-wrap gap-1 mb-2">
                    {reviewDetail.tags.map((tag) => (
                      <View key={tag} className="bg-gray-200 rounded px-2 py-1">
                        <Text className="text-body-12-regular text-gray-700">{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <StarRating rating={reviewDetail.rating} onRatingChange={() => {}} size={20} />
              </View>
            </View>
          </View>

          <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
            <View className="flex-row items-center justify-between">
              <Text className="text-body-16-bold text-gray-900 flex-1 mr-3" numberOfLines={1}>
                {reviewDetail.reviewTitle || "제목 없음"}
              </Text>
              <Text className="text-body-14-regular text-gray-500">
                {formatDate(reviewDetail.createAt)}
              </Text>
            </View>
          </View>

          <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
            <Text className="text-body-14-regular text-gray-900 leading-6">
              {reviewDetail.content}
            </Text>
          </View>

          {reviewDetail.images && reviewDetail.images.length > 0 && (
            <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
              <Text className="text-body-14-semibold text-gray-900 mb-3">첨부 이미지</Text>
              <View className="flex-row flex-wrap gap-2">
                {reviewDetail.images.map((imageUrl) => (
                  <View key={imageUrl} style={{ width: 100, height: 100 }}>
                    <Image
                      source={{ uri: imageUrl }}
                      className="w-full h-full rounded-lg"
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View className="px-4 py-4">
          <View className="flex-row gap-3">
            <Button label="수정" onPress={() => {}} variant="secondary" />
            <Button label="삭제" onPress={handleDelete} variant="primary" loading={isDeleting} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
