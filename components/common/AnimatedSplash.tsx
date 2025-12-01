import { useEffect } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Logo from "../../assets/images/ic_logo.svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SPLASH_DURATION = 3000;
const BACKGROUND_IMAGE = require("../../assets/images/leaf_background.png");

interface AnimatedSplashProps {
  onAnimationEnd: () => void;
}

export default function AnimatedSplash({ onAnimationEnd }: AnimatedSplashProps) {
  const backgroundOpacity = useSharedValue(0);

  useEffect(() => {
    backgroundOpacity.value = withTiming(0.8, { duration: SPLASH_DURATION });

    const timer = setTimeout(() => {
      onAnimationEnd();
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [backgroundOpacity, onAnimationEnd]);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.backgroundContainer, animatedBackgroundStyle]}>
        <Image source={BACKGROUND_IMAGE} style={styles.backgroundImage} resizeMode="cover" />
      </Animated.View>

      <View style={styles.logoContainer}>
        <Logo width={120} height={120} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFDE8",
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  logoContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
