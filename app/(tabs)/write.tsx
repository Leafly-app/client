import CameraIcon from "@/assets/images/review/review_camera.svg";
import Header from "@/components/common/Header";
import StarRating from "@/components/common/StarRating";
import { IcPlus } from "@/components/icons";
import { useCreateReview } from "@/hooks/useCreateReview";
import { useDraftReview } from "@/hooks/useDraftReview";
import { useReviewValidation } from "@/hooks/useReviewValidation";
import { colors } from "@/styles/colors";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const BACKGROUND_IMAGE = require("@/assets/images/bg_blur.png");

export default function WriteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    bookTitle?: string;
    bookAuthor?: string;
    bookCover?: string;
    bookIsbn?: string;
    bookCategory?: string;
  }>();

  const { submit, isLoading } = useCreateReview();
  const { validate } = useReviewValidation();
  const { loadDraft, saveDraft, clearDraft } = useDraftReview(!!params.bookTitle);

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<{
    title: string;
    author: string;
    cover: string;
    isbn: string;
    category: string;
  } | null>(null);

  useEffect(() => {
    loadDraft((draft) => {
      setSelectedBook(draft.selectedBook);
      setRating(draft.rating);
      setTitle(draft.title);
      setContent(draft.content);
      setImages(draft.images);
    });
  }, [loadDraft]);

  useEffect(() => {
    if (params.bookTitle && params.bookAuthor && params.bookIsbn) {
      setSelectedBook({
        title: params.bookTitle,
        author: params.bookAuthor,
        cover: params.bookCover || "",
        isbn: params.bookIsbn,
        category: params.bookCategory || "",
      });
    }
  }, [params.bookTitle, params.bookAuthor, params.bookIsbn, params.bookCover, params.bookCategory]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.push("/(tabs)");
        return true;
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [router]),
  );

  const handleSave = async () => {
    if (!validate(selectedBook, rating, content, title)) {
      return;
    }

    if (!selectedBook) {
      return;
    }

    const requestData = {
      title: selectedBook.title,
      author: selectedBook.author,
      thumbnail: selectedBook.cover,
      rating,
      category: selectedBook.category,
      reviewTitle: title || undefined,
      content,
      images: images.length > 0 ? images : undefined,
    };

    try {
      const result = await submit(requestData);

      if (result.success) {
        await clearDraft();
        Alert.alert("성공", "독후감이 저장되었습니다.", [
          { text: "확인", onPress: () => router.push("/(tabs)") },
        ]);
      } else {
        Alert.alert("오류", result.error || "독후감 저장에 실패했습니다.");
      }
    } catch {
      Alert.alert("오류", "독후감 저장 중 문제가 발생했습니다.");
    }
  };

  const handleTempSave = async () => {
    if (!selectedBook) {
      Alert.alert("알림", "책을 선택해주세요.");
      return;
    }

    await saveDraft(selectedBook, rating, title, content, images);
  };

  const handleImagePick = async () => {
    if (images.length >= 3) {
      Alert.alert("알림", "이미지는 최대 3장까지 첨부할 수 있습니다.");
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("권한 필요", "갤러리 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

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
        title="독후감 작성"
        onBackPress={() => router.push("/(tabs)")}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 책 선택 영역 */}
        <View className="pt-3 px-4">
          <View className="py-5 items-center">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/search?mode=review")}
              className="w-44 h-64 bg-gray-100 rounded-xl border border-gray-200 justify-center items-center overflow-hidden"
            >
              {selectedBook?.cover ? (
                <Image
                  source={{ uri: selectedBook.cover }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-12 h-12 bg-gray-300 rounded-full justify-center items-center">
                  <IcPlus width={16} height={16} color={colors.gray[500]} />
                </View>
              )}
            </TouchableOpacity>

            {selectedBook ? (
              <View className="mt-2 items-center">
                <Text className="text-body-16-bold text-gray-900" numberOfLines={1}>
                  {selectedBook.title}
                </Text>
                <Text className="text-body-12-regular text-gray-700 mt-1">
                  {selectedBook.author}
                </Text>
                <View className="mt-2">
                  <StarRating rating={rating} onRatingChange={setRating} />
                </View>
              </View>
            ) : (
              <View className="mt-2 items-center">
                <Text className="text-body-16-bold text-gray-700">
                  독후감을 작성할 도서를 선택해주세요
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 폼 영역 */}
        <View className="px-4 py-5">
          {/* 독후감 제목 */}
          <View className="mb-4">
            <Text className="text-gray-900 text-body-16-semibold mb-2">독후감 제목</Text>
            <View className="bg-white/90 rounded-lg border border-gray-300 px-3 py-2.5">
              <TextInput
                placeholder="제목을 입력해주세요"
                placeholderTextColor={colors.gray[500]}
                value={title}
                onChangeText={(text) => setTitle(text.slice(0, 20))}
                className="text-body-14-regular text-gray-900 p-0"
              />
            </View>
            <Text className="text-body-8-regular text-gray-700 text-right mt-1">
              {title.length}/20 자
            </Text>
          </View>

          {/* 독후감 내용 */}
          <View className="mb-4">
            <Text className="text-body-16-semibold text-gray-900 mb-2">
              독후감 내용 <Text className="text-error">*</Text>
            </Text>
            <View className="bg-white/90 rounded-lg border border-gray-300 px-3 py-2.5 h-36">
              <TextInput
                placeholder="이 책에 대한 생각을 자유롭게 적어보세요 (최소 10자)"
                placeholderTextColor={colors.gray[500]}
                value={content}
                onChangeText={(text) => setContent(text.slice(0, 500))}
                multiline
                textAlignVertical="top"
                className="flex-1 text-body-14-regular text-gray-900 p-0"
              />
            </View>
            <Text className="text-body-8-regular text-gray-700 text-right mt-1">
              {content.length}/500 자
            </Text>
          </View>

          {/* 이미지 첨부 */}
          <View>
            <Text className="text-body-12-semibold text-gray-900 mb-3">이미지 첨부 (최대 3장)</Text>
            <View className="flex-row gap-3">
              {images.map((image, index) => (
                <View key={image} className="w-24 h-24 rounded-lg overflow-hidden">
                  <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleImageRemove(index)}
                    className="absolute top-1 right-1 bg-black/60 rounded-full w-6 h-6 justify-center items-center"
                  >
                    <Text className="text-body-12-bold text-white">×</Text>
                  </TouchableOpacity>
                </View>
              ))}
              {images.length < 3 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleImagePick}
                  className="w-24 h-24 rounded-lg border border-gray-500 justify-center items-center gap-2"
                >
                  <CameraIcon width={24} height={24} color={colors.gray[500]} />
                  <Text className="text-body-12-semibold text-gray-500">추가</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* 하단 버튼 영역 */}
        <View className="px-4 pb-4">
          <View className="flex-row gap-3">
            <View className="flex-1">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleTempSave}
                className="bg-gray-500 rounded-lg py-4 items-center"
              >
                <Text className="text-body-16-semibold text-white">임시저장</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSave}
                disabled={isLoading}
                className="bg-primary-500 rounded-lg py-4 items-center"
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-body-16-semibold text-white">저장</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
