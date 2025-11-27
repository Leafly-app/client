import { Platform, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
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
}

export default function Header({
  state,
  hasBack,
  hasSearch,
  titleType,
  title,
  onBackPress,
  onSearchPress,
}: HeaderProps) {
  const isSticky = state === "sticky";

  if (isSticky) {
    return (
      <View style={{ backgroundColor: "rgba(255, 255, 255, 0.50)" }} className="py-3 px-5">
        {Platform.OS === "ios" && (
          <BlurView intensity={10} tint="light" style={{ position: "absolute", inset: 0 }} />
        )}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-[0.62rem] flex-1">
            {hasBack ? (
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
            ) : titleType === "logo" ? (
              <View className="flex-row items-center gap-1">
                <NavLogoImage width={32} height={32} />
                <NavLogo width={60} height={20} />
              </View>
            ) : (
              <Text
                className="text-body-16-bold text-gray-900 flex-1"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
            )}
          </View>

          {hasSearch && (
            <TouchableOpacity activeOpacity={0.7} onPress={onSearchPress}>
              <IcSearch width={24} height={24} stroke={colors.gray[900]} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: colors.white }} className="py-3 px-5">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-[0.62rem] flex-1">
          {hasBack ? (
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
          ) : titleType === "logo" ? (
            <View className="flex-row items-center gap-1">
              <NavLogoImage width={32} height={32} />
              <NavLogo width={60} height={20} />
            </View>
          ) : (
            <Text
              className="text-body-16-bold text-gray-900 flex-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          )}
        </View>

        {hasSearch && (
          <TouchableOpacity activeOpacity={0.7} onPress={onSearchPress}>
            <IcSearch width={24} height={24} stroke={colors.gray[900]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
