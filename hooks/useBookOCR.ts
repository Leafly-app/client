import { deleteAsync } from "expo-file-system";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { uploadOCRImage } from "@/apis/ocr";

export const useBookOCR = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const scanBook = async (imageUri: string) => {
    try {
      setIsLoading(true);

      const response = await uploadOCRImage(imageUri);

      if (response.isSuccess && response.data) {
        const isbn = response.data.bookDetail.isbn13;

        router.push(`/book/${isbn}`);

        return response.data;
      } else {
        throw new Error(response.message || "ISBN 인식에 실패했습니다.");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "서버 통신 중 오류가 발생했습니다.";
      Alert.alert("인식 실패", "바코드를 정확히 비춰주세요.\n" + errorMessage);
    } finally {
      setIsLoading(false);
      try {
        await deleteAsync(imageUri);
      } catch (e) {
        console.error("Failed to delete temporary file", e);
      }
    }
  };

  return {
    scanBook,
    isLoading,
  };
};
