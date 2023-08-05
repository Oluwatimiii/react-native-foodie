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
import { myTheme } from "../utils/Theme";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../utils/asyncStorage";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const nav = useNavigation();

  const handleDone = () => {
    nav.navigate("Splash");
    setItem("onboarded", "1")
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
                  source={require("./../../assets/animations/anim2.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#a78bff",
            image: (
              <View style={styles.lottieStyle}>
                <LottieView
                  source={require("./../../assets/animations/anim1.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: myTheme.primary,
            image: (
              <View style={styles.lottieStyle}>
                <LottieView
                  source={require("./../../assets/animations/anim3.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
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
    height: width,
  },
  doneBtn: {
    padding: 20,
    color: "white",
  },
});
