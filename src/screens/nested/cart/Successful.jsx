import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { myTheme } from "../../../utils/Theme";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Successful = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: responsiveWidth(6),
          justifyContent: "center",
          paddingVertical: responsiveHeight(18),
        }}
      >
        <View style={styles.lottieStyle}>
          <LottieView
            source={require("../../../../assets/animations/anim5.json")}
            autoPlay
            loop
          />
        </View>
        <View
          style={{
            marginBottom: responsiveHeight(2),
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              textAlign: "center",
            }}
          >
            Order Successful
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              marginTop: responsiveHeight(1),
              marginBottom: responsiveHeight(1.7),
              fontSize: 20,
              textAlign: "center",
              color: myTheme.fade,
            }}
          >
            Thank you for your order.
          </Text>
        </View>
        <View
          style={{
            width: "80%",
            gap: 10
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HomeStack", {
                screen: "Dashboard",
              })
            }
            style={{
              backgroundColor: myTheme.primary,
              width: "100%",
              paddingVertical: responsiveHeight(2),
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 21,
                textAlign: "center",
              }}
            >
              Download receipt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HomeStack", {
                screen: "Dashboard",
              })
            }
            style={{
              backgroundColor: myTheme.primary,
              width: "100%",
              paddingVertical: responsiveHeight(2),
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 21,
                textAlign: "center",
              }}
            >
              Track my order
            </Text>
          </TouchableOpacity>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("HomeStack", {
              screen: "Dashboard",
            })
          }
          style={{
            marginTop: responsiveHeight(7),
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              color: myTheme.fade,
            }}
          >
            Back to home page
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Successful;

const styles = StyleSheet.create({
  lottieStyle: {
    width: width * 0.9,
    height: width * 0.5,
    marginBottom: responsiveHeight(7),
  },
});
