import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { myTheme } from "../../utils/Theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const nav = useNavigation();

  const handleDone = async () => {
    await AsyncStorage.setItem("onboarded", JSON.stringify(1))
    nav.navigate("Login");
  };

  const doneBtn = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneBtn} {...props}>
        <Text style={{ color: myTheme.secondary }}>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        containerStyles={{ paddingHorizontal: 15 }}
        imageContainerStyles={{ paddingBottom: 20 }}
        DoneButtonComponent={doneBtn}
        pages={[
          {
            backgroundColor: myTheme.primary,
            image: (
              <View style={styles.lottieStyle}>
                <LottieView
                  source={require("../../../assets/animations/anim2.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Welcome to Foodie",
            subtitle: "No 1 online store to satisfy your cravings.",
          },
          {
            backgroundColor: "#a78bff",
            image: (
              <View style={styles.lottieStyle}>
                <LottieView
                  source={require("../../../assets/animations/anim1.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Enjoy a smooth order experience",
            subtitle: "Create an account and order!",
          },
          {
            backgroundColor: myTheme.primary,
            image: (
              <View style={styles.lottieStyle}>
                <LottieView
                  source={require("../../../assets/animations/anim3.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Ready to eat?",
            subtitle: "Food is ready!",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottieStyle: {
    width: width * 0.9,
    height: width * 0.5,
  },
  doneBtn: {
    padding: 20,
    color: "white",
  },
});
