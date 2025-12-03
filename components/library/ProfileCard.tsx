import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

interface ProfileCardProps {
  nickName: string;
  profileImage: string | null;
}

export default function ProfileCard({ nickName, profileImage }: ProfileCardProps) {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert(
      "로그아웃",
      "로그아웃 하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "로그아웃",
          onPress: async () => {
            await logout();
            router.replace("/");
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View className="bg-white rounded-xl p-5 mx-4 mt-4 mb-3">
      <View className="flex-row items-center">
        <View className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden mr-4">
          {profileImage ? (
            <Image source={{ uri: profileImage }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-heading-20-bold text-gray-500">{nickName[0]}</Text>
            </View>
          )}
        </View>

        <Text className="flex-1 text-heading-18-bold text-gray-900">{nickName}</Text>

        <TouchableOpacity activeOpacity={0.7} className="bg-gray-200 px-4 py-2 rounded-lg">
          <Text className="text-body-14-semibold text-gray-700">정보수정</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleLogout}
        className="bg-secondary-600 px-4 py-2 rounded-lg mt-3"
      >
        <Text className="text-body-14-semibold text-white text-center">로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}
