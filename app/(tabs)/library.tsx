import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "@/components/home/sections/HomeHeader";
import BookListSection from "@/components/library/BookListSection";
import ProfileCard from "@/components/library/ProfileCard";
import { useMemberProfile } from "@/hooks/useMemberProfile";
import { useLibraryUpdateStore } from "@/store/libraryUpdateStore";
import { colors } from "@/styles/colors";

export default function LibraryScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
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

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleBookPress = (isbn: string) => {
    router.push(`/book/${isbn}` as any);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-200" edges={["top"]}>
        <HomeHeader onLogoPress={scrollToTop} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text className="text-body-14-regular text-gray-500 mt-4">로딩 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !profile) {
    return (
      <SafeAreaView className="flex-1 bg-gray-200" edges={["top"]}>
        <HomeHeader onLogoPress={scrollToTop} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-14-regular text-gray-500">
            {error || "프로필 정보를 불러올 수 없습니다."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-200" edges={["top"]}>
      <HomeHeader onLogoPress={scrollToTop} />

      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} className="flex-1">
        <ProfileCard nickName={profile.nickName} profileImage={profile.profileImage} />

        <View className="px-4 mt-2 mb-2">
          <Text className="text-heading-16-bold text-gray-900">
            완독 ({profile.library.finishedCount})
          </Text>
        </View>
        <BookListSection books={profile.library.finishedBooks} onBookPress={handleBookPress} />

        <View className="px-4 mt-4 mb-2">
          <Text className="text-heading-16-bold text-gray-900">
            읽고 싶어요 ({profile.library.wantCount})
          </Text>
        </View>
        <BookListSection books={profile.library.wantBooks} onBookPress={handleBookPress} />

        <View className="px-4 mt-4 mb-2">
          <Text className="text-heading-16-bold text-gray-900">
            좋아요 ({profile.likes.likeCount})
          </Text>
        </View>
        <BookListSection books={profile.likes.likeBooks} onBookPress={handleBookPress} />

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
