import { Alert } from "react-native";

interface SelectedBook {
  title: string;
  author: string;
  cover: string;
  isbn: string;
  category: string;
}

export const useReviewValidation = () => {
  const validate = (
    selectedBook: SelectedBook | null,
    rating: number,
    content: string,
    title: string,
  ): boolean => {
    if (!selectedBook) {
      Alert.alert("알림", "책을 선택해주세요.");
      return false;
    }

    if (rating === 0) {
      Alert.alert("알림", "별점을 선택해주세요.");
      return false;
    }

    if (content.length < 10) {
      Alert.alert("알림", "독후감 내용을 최소 10자 이상 작성해주세요.");
      return false;
    }

    if (title && title.length > 20) {
      Alert.alert("알림", "독후감 제목은 최대 20자까지 작성할 수 있습니다.");
      return false;
    }

    return true;
  };

  return { validate };
};
