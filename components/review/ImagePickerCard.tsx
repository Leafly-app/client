import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import CameraIcon from "@/assets/images/review/review_camera.svg";
import { colors } from "@/styles/colors";

interface ImagePickerCardProps {
  images: string[];
  onImageAdd: () => void;
  onImageRemove: (index: number) => void;
}

const ImagePickerCard = React.memo<ImagePickerCardProps>(
  ({ images, onImageAdd, onImageRemove }) => {
    const handleImageAdd = () => {
      if (images.length >= 3) {
        Alert.alert("알림", "이미지는 최대 3장까지 첨부할 수 있습니다.");
        return;
      }
      onImageAdd();
    };

    return (
      <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
        <Text className="text-body-14-semibold text-gray-900 mb-2">
          이미지 첨부 <Text className="text-gray-500">(최대 3장)</Text>
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {images.map((image, index) => (
            <View key={index} style={{ width: 100, height: 100 }}>
              <Image
                source={{ uri: image }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onImageRemove(index)}
                className="absolute top-1 right-1 bg-black/60 rounded-full w-6 h-6 items-center justify-center"
              >
                <Text className="text-white text-body-12-bold">×</Text>
              </TouchableOpacity>
            </View>
          ))}
          {images.length < 3 && (
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-gray-100 rounded-lg items-center justify-center"
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderStyle: "dashed",
                borderColor: colors.gray[400],
              }}
              onPress={handleImageAdd}
            >
              <CameraIcon width={32} height={32} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

ImagePickerCard.displayName = "ImagePickerCard";

export default ImagePickerCard;
