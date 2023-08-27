import React from "react";
import AppNavigation from "./appNavigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppNavigation />
        </GestureHandlerRootView>
      </Provider>
    </NavigationContainer>
  );
}
