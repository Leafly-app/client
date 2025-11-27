const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// 1. 기본 Expo 설정을 가져옵니다.
const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

// 2. SVG Transformer 설정을 적용합니다.
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"), // svg를 asset에서 제외
  sourceExts: [...resolver.sourceExts, "svg"], // svg를 소스 코드처럼 인식하게 추가
};

// 3. 마지막으로 NativeWind 설정으로 감싸서 내보냅니다.
module.exports = withNativeWind(config, { input: "./global.css" });