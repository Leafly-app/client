module.exports = {
  expo: {
    name: "leafly",
    slug: "leafly",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "leafly",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      backgroundColor: "#FCFDE8",
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription: "책의 ISBN 바코드를 스캔하기 위해 카메라 권한이 필요합니다.",
      },
    },
    android: {
      package: "com.leaflyapp.leafly",
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      usesCleartextTraffic: true,
      permissions: ["CAMERA"],
    },
    web: {
      output: "static",
    },
    plugins: [
      "expo-router",
      [
        "expo-camera",
        {
          cameraPermission: "책의 ISBN 바코드를 스캔하기 위해 카메라 권한이 필요합니다.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
