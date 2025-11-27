import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProfileCardProps {
  nickName: string;
  profileImage: string | null;
}

export default function ProfileCard({ nickName, profileImage }: ProfileCardProps) {
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
    </View>
  );
}
