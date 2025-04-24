# Weather App 🌤️

This is a React Native app showcasing:
- Basic use of hooks
- Connection with [OpenWeatherAPI](https://openweathermap.org/api)
- State management with [Redux](https://redux.js.org/)
- Navigation with [React Navigation](https://reactnavigation.org/)
- And some convenience methods e.g. location service used thanks to [Expo](https://expo.dev/)

For a more detailed technical breakdown of the app's architecture, including state management, data flow, and implementation patterns, see [Architecture Breakdown](./ArchitectureBreakdown.md).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create an `.env` file with the following property
   
   ```bash
   OPENWEATHER_API_KEY=<<YOUR_API_KEY>>
   ```

3. Start the app

   ```bash
   npx expo start
   ```
In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

4. Build a standalone app

   ```bash
   npm run android
   npm run ios
   ```

## Future improvements 'aka' Hopefully someday

- End to end tests using Jest
- Offline mode & indiciation of no internet
- Maps widget
- Using Google Places API for auto suggestions
- Using [React-query](https://tanstack.com/query/latest/docs/framework/react/overview) (TanStack query) to showcase a more advanced data-fetching library

## Graphics & Design

App has been designed with use of:

- Color pallete from [Coolors.co](https://coolors.co)
- Graphics & app icons generated via [Recraft.ai](https://recraft.ai)
- App icons from [FeatherIcons](https://feathericons.com/)