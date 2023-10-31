import React from "react";
import AppNavigation from "./appNavigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ActivityIndicator } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

let persistor = persistStore(store);

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <AppNavigation />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
