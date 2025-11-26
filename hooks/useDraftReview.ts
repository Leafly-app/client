import type { DraftReview } from "@/types/review";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

const DRAFT_KEY = "DRAFT_REVIEW";

interface SelectedBook {
  title: string;
  author: string;
  cover: string;
  isbn: string;
  category: string;
}

export const useDraftReview = (hasBookParam: boolean) => {
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);

  const loadDraft = useCallback(
    (onLoad: (draft: DraftReview) => void) => {
      const load = async () => {
        try {
          setIsLoadingDraft(true);
          const draftJson = await AsyncStorage.getItem(DRAFT_KEY);
          if (draftJson && !hasBookParam) {
            const draft: DraftReview = JSON.parse(draftJson);

            Alert.alert("임시저장된 독후감", "임시저장된 독후감이 있습니다. 불러오시겠습니까?", [
              { text: "취소", style: "cancel" },
              {
                text: "불러오기",
                onPress: () => onLoad(draft),
              },
            ]);
          }
        } catch {
        } finally {
          setIsLoadingDraft(false);
        }
      };

      load();
    },
    [hasBookParam],
  );

  const saveDraft = useCallback(
    async (
      selectedBook: SelectedBook,
      rating: number,
      title: string,
      content: string,
      images: string[],
    ) => {
      try {
        const draftData: DraftReview = {
          selectedBook,
          rating,
          title,
          content,
          images,
          savedAt: new Date().toISOString(),
        };

        await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
        Alert.alert("성공", "임시저장되었습니다.");
      } catch {
        Alert.alert("오류", "임시저장에 실패했습니다.");
      }
    },
    [],
  );

  const clearDraft = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(DRAFT_KEY);
    } catch {}
  }, []);

  return { loadDraft, saveDraft, clearDraft, isLoadingDraft };
};
