import Header from "@/components/common/Header";
import StarRating from "@/components/common/StarRating";
import IcChevronLeft from "@/components/icons/IcChevronLeft";
import { useReviewDetail } from "@/hooks/useReviewDetail";
import { colors } from "@/styles/colors";
import { formatDate } from "@/utils/formatDate";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const BACKGROUND_IMAGE = require("@/assets/images/bg_blur.png");

export default function ReviewDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const reviewId = Number(id);
  const { reviewDetail, isLoading, isDeleting, error, deleteReview } = useReviewDetail(reviewId);

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
      <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
        <View className="h-12 px-5 py-3 bg-white flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <IcChevronLeft width={24} height={24} color={colors.gray[900]} />
          </TouchableOpacity>
          <Text className="flex-1 text-body-16-bold text-gray-900" />
        </View>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text className="text-body-14-regular text-gray-500 mt-4">로딩 중...</Text>
        </View>
      </View>
    );
  }

  if (error || !reviewDetail) {
    return (
      <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
        <View className="h-12 px-5 py-3 bg-white flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <IcChevronLeft width={24} height={24} color={colors.gray[900]} />
          </TouchableOpacity>
          <Text className="flex-1 text-body-16-bold text-gray-900" />
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-14-regular text-gray-500">
            {error || "독후감을 불러올 수 없습니다."}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* 배경 이미지 */}
      <Image source={BACKGROUND_IMAGE} style={styles.backgroundImage} resizeMode="cover" />

      {/* 헤더 */}
      <Header
        state="default"
        hasBack
        hasSearch={false}
        titleType="text"
        title={reviewDetail.title}
        onBackPress={() => router.back()}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 책 정보 영역 */}
        <View className="pt-3 px-4">
          <View className="py-5 items-center gap-2.5">
            {/* 책 표지 */}
            <View className="w-44 h-64 bg-gray-100 rounded-xl border border-zinc-100 justify-center items-center overflow-hidden">
              {reviewDetail.thumbnail ? (
                <Image
                  source={{ uri: reviewDetail.thumbnail }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-12 h-16 bg-gray-300 rounded" />
              )}
            </View>

            {/* 책 정보 */}
            <View className="items-center gap-2.5">
              <View className="items-center gap-1">
                <Text className="text-body-16-bold text-gray-900">{reviewDetail.title}</Text>
                <Text className="text-body-12-regular text-gray-700">{reviewDetail.author}</Text>
              </View>

              {/* 태그 */}
              {reviewDetail.tags && reviewDetail.tags.length > 0 && (
                <View className="flex-row flex-wrap justify-center gap-2">
                  {reviewDetail.tags.map((tag) => (
                    <View key={tag} className="px-2 bg-gray-200 rounded-full">
                      <Text className="text-body-10-regular text-gray-900 leading-4">{tag}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* 별점 */}
              <View className="flex-row items-center gap-2">
                <StarRating rating={reviewDetail.rating} onRatingChange={() => {}} size={24} />
              </View>
            </View>
          </View>
        </View>

        {/* 독후감 내용 영역 */}
        <View className="px-4 gap-3">
          {/* 제목과 날짜 */}
          <View className="rounded-lg flex-row justify-between items-end">
            <Text className="text-body-12-bold text-gray-900 flex-1" numberOfLines={1}>
              {reviewDetail.reviewTitle || "제목 없음"}
            </Text>
            <Text className="text-body-8-regular text-gray-700">
              {formatDate(reviewDetail.createAt)}
            </Text>
          </View>

          {/* 내용 */}
          <View className="px-3 py-4 bg-white/90 rounded-lg border border-gray-300">
            <Text className="text-body-12-regular text-gray-900 leading-4">
              {reviewDetail.content}
            </Text>
          </View>

          {/* 이미지 첨부 영역 */}
          <View className="py-5 bg-white/90 rounded-lg border border-gray-300 items-center">
            <View className="flex-row gap-3">
              {reviewDetail.images && reviewDetail.images.length > 0 ? (
                reviewDetail.images.map((imageUrl) => (
                  <View
                    key={imageUrl}
                    className="w-24 h-24 bg-zinc-300 rounded-lg border border-gray-300 overflow-hidden"
                  >
                    <Image
                      source={{ uri: imageUrl }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                ))
              ) : (
                <>
                  <View className="w-24 h-24 bg-zinc-300 rounded-lg border border-gray-300 justify-center items-center">
                    <View className="w-6 h-4 bg-gray-400 rounded" />
                  </View>
                  <View className="w-24 h-24 bg-zinc-300 rounded-lg border border-gray-300 justify-center items-center">
                    <View className="w-6 h-4 bg-gray-400 rounded" />
                  </View>
                  <View className="w-24 h-24 bg-zinc-300 rounded-lg border border-gray-300 justify-center items-center">
                    <View className="w-6 h-4 bg-gray-400 rounded" />
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 하단 버튼 영역 */}
      {Platform.OS === "ios" ? (
        <BlurView
          intensity={20}
          tint="light"
          className="absolute bottom-0 left-0 right-0"
          style={{ paddingBottom: insets.bottom }}
        >
          <View className="flex-row px-3 bg-white/50">
            <View className="flex-1 p-2">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleDelete}
                disabled={isDeleting}
                className="bg-gray-500 rounded-lg py-4 items-center"
              >
                {isDeleting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-body-16-semibold text-white">삭제</Text>
                )}
              </TouchableOpacity>
            </View>
            <View className="flex-1 p-2">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {}}
                className="bg-primary-500 rounded-lg py-4 items-center"
              >
                <Text className="text-body-16-semibold text-white">수정</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      ) : (
        <View
          className="absolute bottom-0 left-0 right-0 bg-white/90"
          style={{ paddingBottom: insets.bottom }}
        >
          <View className="flex-row px-3">
            <View className="flex-1 p-2">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleDelete}
                disabled={isDeleting}
                className="bg-gray-500 rounded-lg py-4 items-center"
              >
                {isDeleting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-body-16-semibold text-white">삭제</Text>
                )}
              </TouchableOpacity>
            </View>
            <View className="flex-1 p-2">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {}}
                className="bg-primary-500 rounded-lg py-4 items-center"
              >
                <Text className="text-body-16-semibold text-white">수정</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 48,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
