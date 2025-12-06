import { Image, ScrollView, Text, View } from "react-native";

const editorPickItems = [
  { id: "1", image: require("@/assets/images/item_curation1.png") },
  { id: "2", image: require("@/assets/images/item_curation2.png") },
  { id: "3", image: require("@/assets/images/item_curation3.png") },
  { id: "4", image: require("@/assets/images/item_curation4.png") },
];

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
              width: 270,
              height: 340,
            }}
          >
            <Image
              source={item.image}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
