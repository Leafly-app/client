import { BlurView } from "expo-blur";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import NavLogo from "@/assets/images/navbar/nav_logo.svg";
import NavLogoImage from "@/assets/images/navbar/nav_logo_image.svg";
import IcChevronLeft from "@/components/icons/IcChevronLeft";
import IcSearch from "@/components/icons/IcSearch";
import { colors } from "@/styles/colors";

interface HeaderProps {
  state: "default" | "sticky";
  hasBack: boolean;
  hasSearch: boolean;
  titleType: "logo" | "text";
  title: string;
  onBackPress?: () => void;
  onSearchPress?: () => void;
  onLogoPress?: () => void;
}

export default function Header({
  state,
  hasBack,
  hasSearch,
  titleType,
  title,
  onBackPress,
  onSearchPress,
  onLogoPress,
}: HeaderProps) {
  const isSticky = state === "sticky";

  const renderTitle = () => {
    if (hasBack) {
      return (
        <>
          <TouchableOpacity activeOpacity={0.7} onPress={onBackPress}>
            <IcChevronLeft width={24} height={24} stroke={colors.gray[900]} />
          </TouchableOpacity>
          {titleType === "text" && (
            <Text
              className="text-body-16-bold text-gray-900 flex-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          )}
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

    return (
      <Text
        className="text-body-16-bold text-gray-900 flex-1"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    );
  };

  const headerContent = (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-[0.62rem] flex-1">{renderTitle()}</View>

      {hasSearch && (
        <TouchableOpacity activeOpacity={0.7} onPress={onSearchPress}>
          <IcSearch width={24} height={24} stroke={colors.gray[900]} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View
      style={{ backgroundColor: isSticky ? "rgba(255, 255, 255, 0.50)" : colors.white }}
      className="py-3 px-5"
    >
      {isSticky && Platform.OS === "ios" && (
        <BlurView intensity={10} tint="light" style={{ position: "absolute", inset: 0 }} />
      )}
      {headerContent}
    </View>
  );
}
