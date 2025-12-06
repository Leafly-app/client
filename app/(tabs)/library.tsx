import ScreenLayout from "@/components/layouts/ScreenLayout";
import BookListSection from "@/components/library/BookListSection";
import ProfileCard from "@/components/library/ProfileCard";
import { useMemberProfile } from "@/hooks/useMemberProfile";
import { useLibraryUpdateStore } from "@/store/libraryUpdateStore";
import { colors } from "@/styles/colors";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function LibraryScreen() {
  const router = useRouter();
  const { profile, isLoading, error, refetch } = useMemberProfile();
  const { needsUpdate, setNeedsUpdate } = useLibraryUpdateStore();

  useFocusEffect(
    useCallback(() => {
      if (needsUpdate) {
        refetch();
        setNeedsUpdate(false);
      }
    }, [needsUpdate, refetch, setNeedsUpdate]),
  );

  const handleBookPress = (isbn: string) => {
    router.push(`/book/${isbn}` as any);
  };

  if (isLoading) {
    return (
      <ScreenLayout bgColor="bg-gray-50" scrollable={false}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text className="text-body-14-regular text-gray-500 mt-4">로딩 중...</Text>
        </View>
      </ScreenLayout>
    );
  }

  if (error || !profile) {
    return (
      <ScreenLayout bgColor="bg-gray-50" scrollable={false}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-14-regular text-gray-500">
            {error || "프로필 정보를 불러올 수 없습니다."}
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout bgColor="bg-gray-50" enableStickyHeader>
      <View className=" pt-3 gap-4 mx-4">
        <ProfileCard nickName={profile.nickName} profileImage={profile.profileImage} />

        <View>
          <Text className="text-body-12-semibold text-gray-900 mb-2 mx-2">
            읽고 싶어요 ({profile.library.wantCount})
          </Text>
          <BookListSection
            books={profile.library.wantBooks}
            onBookPress={handleBookPress}
            sectionId="want"
          />
        </View>

        <View>
          <Text className="text-body-12-semibold text-gray-900 mb-2 mx-2">
            좋아요한 책 ({profile.likes.likeCount})
          </Text>
          <BookListSection
            books={profile.likes.likeBooks}
            onBookPress={handleBookPress}
            sectionId="like"
          />
        </View>

        <View>
          <Text className="text-body-12-semibold text-gray-900 mb-2 mx-2">
            완독한 책 ({profile.library.finishedCount})
          </Text>
          <BookListSection
            books={profile.library.finishedBooks}
            onBookPress={handleBookPress}
            sectionId="finished"
          />
        </View>

        <View className="h-6" />
      </View>
    </ScreenLayout>
  );
}
