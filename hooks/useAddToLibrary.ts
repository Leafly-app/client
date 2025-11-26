import { useState } from "react";
import { Alert } from "react-native";
import { addToLibrary } from "@/apis/library";
import type { AddToLibraryRequest } from "@/types/library/library";

export const useAddToLibrary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (isbn: string, data: AddToLibraryRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await addToLibrary(isbn, data);

      if (response.isSuccess) {
        Alert.alert("성공", "내 서재에 추가되었습니다.");
        return { success: true, data: response };
      }
      throw new Error(response.message || "서재에 추가하는데 실패했습니다.");
    } catch (err: any) {
      let errorMessage = "서재에 추가하는 중 오류가 발생했습니다.";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      Alert.alert("오류", errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { addToLibrary: submit, isLoading, error };
};
