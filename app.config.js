module.exports = {
  name: "weather-app",
  slug: "weather-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.platechorg.weatherapp"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.platechorg.weatherapp"
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        "image": "./assets/images/splash-icon.png",
        "imageWidth": 200,
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
      }
    ],
    [
      "expo-location",
      {
        "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location for an accurate weather forecast."
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  owner: "platech-org",
  extra: {
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    eas: {
      projectId: "25b6cfd7-7bf8-430d-8003-ef98607e5bd4",
    },
  },
  updates: {
    url: "https://u.expo.dev/25b6cfd7-7bf8-430d-8003-ef98607e5bd4"
  },
  runtimeVersion: "1.0.0"
};