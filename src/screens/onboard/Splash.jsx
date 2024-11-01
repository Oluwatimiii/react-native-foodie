import { Image, StyleSheet, Text, View } from "react-native";
import { myTheme } from "../../utils/Theme";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

export default function Splash() {
  const nav = useNavigation();
  const [onboard, setOnboard] = useState(null);

  const user = useSelector((state) => state.user.user);

  // AsyncStorage.getItem("onboarded", (err, value) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     setOnboard(JSON.parse(value));
  //     console.log("onboard", JSON.parse(value));
  //   }
  // });


  useEffect(() => {
    const storedOnboard = AsyncStorage.getItem("onboarded");
    console.log("cachhueval", storedOnboard)

    if (storedOnboard !== null) {
      if (user !== true) {
        setTimeout(() => {
          nav.replace("Login");
        }, 2000);
      } else {
        setTimeout(() => {
          nav.replace("Dashboard");
        }, 2000);
      }
    } else {
      setTimeout(() => {
        nav.navigate("Onboarding");
      }, 2000);
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.logoBox}>
        <Image
          style={styles.logoImage}
          source={require("../../../assets/fast-food.png")}
        />

        <View>
          <Text style={styles.splashText}>foodie</Text>
          <Text style={styles.splashText2}>online store...</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: myTheme.primary,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  logoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  logoImage: {
    height: 65,
    width: 65,
  },
  splashText: {
    fontSize: 70,
    color: myTheme.secondary,
  },
  splashText2: {
    fontSize: 20,
    top: -19,
    color: myTheme.secondary,
    letterSpacing: 5,
  },
});
