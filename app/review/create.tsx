import Button from "@/components/common/Button";
import ScreenLayout from "@/components/layouts/ScreenLayout";
import BookInfoCard from "@/components/review/BookInfoCard";
import ImagePickerCard from "@/components/review/ImagePickerCard";
import ReviewFormCard from "@/components/review/ReviewFormCard";
import { useCreateReview } from "@/hooks/useCreateReview";
import { useDraftReview } from "@/hooks/useDraftReview";
import { useReviewValidation } from "@/hooks/useReviewValidation";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, View } from "react-native";

export default function CreateReviewScreen() {
  const router = useRouter();
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
    <ScreenLayout
      bgColor="bg-gray-200"
      enableStickyHeader
      hasBottomInset
      headerConfig={{
        hasBack: true,
        titleType: "text",
        title: "독후감 작성",
        onBackPress: () => router.push("/(tabs)"),
      }}
    >
      <BookInfoCard
        book={selectedBook}
        rating={rating}
        onRatingChange={setRating}
        onSelectBook={() => router.push("/search?mode=review")}
      />

      <ReviewFormCard
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
      />

      <ImagePickerCard
        images={images}
        onImageAdd={handleImagePick}
        onImageRemove={handleImageRemove}
      />

      <View className="px-4 py-4">
        <View className="flex-row gap-3">
          <Button label="임시저장" onPress={handleTempSave} variant="secondary" />
          <Button label="저장" onPress={handleSave} variant="primary" loading={isLoading} />
        </View>
      </View>
    </ScreenLayout>
  );
}
