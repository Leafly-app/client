import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export interface Book {
  id: string | number;
  title: string;
  author: string;
  cover: string;
  onPress?: () => void;
}

interface BookCarouselProps {
  books: Book[];
}

const BOOK_CARD_WIDTH = 80;
const BOOK_CARD_ASPECT_RATIO = 16 / 23;
const IMAGE_HEIGHT_RATIO = 1.18474;
const IMAGE_TOP_OFFSET = -0.206;
const INITIAL_PADDING = 12;

const BookCarousel = React.memo<BookCarouselProps>(function BookCarousel({ books }) {
  const paddingLeft = useSharedValue(INITIAL_PADDING);

  const scrollViewStyle = useMemo(() => ({ gap: 16, paddingRight: 12 }), []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const scrollX = event.contentOffset.x;
      paddingLeft.value = withTiming(scrollX > 5 ? 0 : INITIAL_PADDING, { duration: 150 });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    paddingLeft: paddingLeft.value,
  }));

  return (
    <LinearGradient
      colors={["#CFE8CA", "rgba(255, 255, 255, 0)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="w-full rounded-lg py-4 overflow-hidden"
    >
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={scrollViewStyle}
        style={animatedStyle}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {books.map((book) => (
          <TouchableOpacity
            key={book.id}
            activeOpacity={0.7}
            onPress={book.onPress}
            style={{ width: BOOK_CARD_WIDTH }}
          >
            <View
              className="bg-gray-300 rounded overflow-hidden mb-1"
              style={{ aspectRatio: BOOK_CARD_ASPECT_RATIO }}
            >
              {book.cover ? (
                <Image
                  source={{ uri: book.cover }}
                  style={{
                    width: "100%",
                    height: `${IMAGE_HEIGHT_RATIO * 100}%`,
                    top: IMAGE_TOP_OFFSET,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <View className="flex-1 items-center justify-center">
                  <View className="w-12 h-14 bg-gray-500 rounded" />
                </View>
              )}
            </View>
            <Text className="text-body-12-bold text-gray-900" numberOfLines={1}>
              {book.title}
            </Text>
            <Text className="text-body-10-regular text-gray-700" numberOfLines={1}>
              {book.author}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </LinearGradient>
  );
});

export default BookCarousel;
