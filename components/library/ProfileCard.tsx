import IcUser from "@/components/icons/IcUser";
import { useAuthStore } from "@/store/useAuthStore";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

interface ProfileCardProps {
  nickName: string;
  profileImage: string | null;
}

export default function ProfileCard({ nickName }: ProfileCardProps) {
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
            router.dismissAll();
            router.replace("/");
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View className="p-4 flex-row items-center justify-between bg-white rounded-lg">
      <View className="flex-row items-center" style={{ gap: 8 }}>
        <View
          className="w-[3.5rem] h-[3.5rem] rounded-full items-center justify-center"
          style={{ backgroundColor: colors.primary[700] }}
        >
          <IcUser width={20} height={20} color={colors.white} />
        </View>
        <Text className="text-body-16-bold text-gray-900">{nickName} 님</Text>
      </View>

      <View className="flex-row items-center" style={{ gap: 1 }}>
        <TouchableOpacity activeOpacity={0.7} className="bg-gray-200 px-3 py-2 rounded-lg">
          <Text className="text-body-10-regular text-gray-900">정보수정</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
          <Text className="text-body-10-regular px-3 py-2 " style={{ color: colors.error.DEFAULT }}>
            로그아웃
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
