import { useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export const useStickyHeader = (threshold: number = 50) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setIsSticky(scrollY > threshold);
  };

  return { isSticky, handleScroll };
};
