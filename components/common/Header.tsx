import NavLogo from "@/assets/images/navbar/nav_logo.svg";
import NavLogoImage from "@/assets/images/navbar/nav_logo_image.svg";
import IcChevronLeft from "@/components/icons/IcChevronLeft";
import IcSearch from "@/components/icons/IcSearch";
import { colors } from "@/styles/colors";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Animated, Platform, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  state: "default" | "sticky";
  hasBack: boolean;
  hasSearch: boolean;
  titleType: "logo" | "text";
  title: string;
  searchIcon?: React.ReactNode;
  isFilterActive?: boolean;
  onBackPress?: () => void;
  onSearchPress?: () => void;
  onLogoPress?: () => void;
}

const TitleText = ({ children }: { children: string }) => (
  <Text className="text-body-16-bold text-gray-900 flex-1" numberOfLines={1} ellipsizeMode="tail">
    {children}
  </Text>
);

const BLUR_INTENSITY = Platform.OS === "ios" ? 50 : 80;

export default function Header({
  state,
  hasBack,
  hasSearch,
  titleType,
  title,
  searchIcon,
  isFilterActive = false,
  onBackPress,
  onSearchPress,
  onLogoPress,
}: HeaderProps) {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: state === "sticky" ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [state, animValue]);

  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.white, "rgba(255, 255, 255, 0)"], // 0.7이 아니라 0(투명)으로 변경
  });

  const blurOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const renderTitle = () => {
    if (hasBack) {
      return (
        <>
          <TouchableOpacity activeOpacity={0.7} onPress={onBackPress}>
            <IcChevronLeft width={24} height={24} stroke={colors.gray[900]} />
          </TouchableOpacity>
          {titleType === "text" && <TitleText>{title}</TitleText>}
        </>
      );
    }

    if (titleType === "logo") {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onLogoPress}
          className="flex-row items-center gap-1"
        >
          <NavLogoImage width={32} height={32} />
          <NavLogo width={60} height={20} />
        </TouchableOpacity>
      );
    }

    return <Text className="text-body-16-bold text-gray-900">{title}</Text>;
  };

  const headerContent = (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2.5 flex-1">{renderTitle()}</View>

      {hasSearch && (
        <TouchableOpacity activeOpacity={0.7} onPress={onSearchPress}>
          {searchIcon ? (
            <View style={{ opacity: 1 }}>
              {React.cloneElement(searchIcon as React.ReactElement<{ fill?: string }>, {
                fill: isFilterActive ? colors.primary[500] : colors.gray[900],
              })}
            </View>
          ) : (
            <IcSearch width={24} height={24} stroke={colors.gray[900]} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <Animated.View style={{ backgroundColor }} className="py-3 px-5 ">
      <Animated.View
        style={{
          opacity: blurOpacity,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        <BlurView
          intensity={BLUR_INTENSITY}
          tint="light" // tint가 'light'면 이미 반투명 흰색이 포함되어 있음
          style={{ flex: 1 }}
          experimentalBlurMethod="dimezisBlurView" // 2️⃣ 안드로이드 필수 옵션 추가
        />
      </Animated.View>

      <View style={{ position: "relative", zIndex: 1 }}>{headerContent}</View>
    </Animated.View>
  );
}
