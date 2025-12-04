import { Image, ScrollView, Text, View } from "react-native";

const editorPickItems = Array.from({ length: 5 }, (_, i) => ({
  id: String(i + 1),
}));

export default function EditorPickSection() {
  return (
    <View className="py-0 px-2 pb-4">
      <Text className="text-heading-20-semibold text-gray-900 mb-2">에디터가 주목한 책</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
      >
        {editorPickItems.map((item) => (
          <View
            key={item.id}
            className="bg-white rounded-xl overflow-hidden"
            style={{
              width: 244,
              height: 340,
            }}
          >
            <Image
              source={require("@/assets/images/item_curation.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
