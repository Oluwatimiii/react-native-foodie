import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import LottieView from "lottie-react-native";
import { myTheme } from "../../../utils/Theme";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Discount = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: responsiveWidth(6),
          justifyContent: "center",
          paddingVertical: responsiveHeight(18),
          backgroundColor: myTheme.primary,
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignItems: "center",
            paddingHorizontal: responsiveWidth(6),
            justifyContent: "flex-end",
            paddingVertical: responsiveHeight(3),
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <MaterialIcons name="cancel" size={38} color={myTheme.secondary} />
        </TouchableOpacity>

        <View style={styles.lottieStyle}>
          <LottieView
            source={require("../../../../assets/animations/anim4.json")}
            autoPlay
            loop
          />
        </View>
        <View
          style={{
            marginBottom: responsiveHeight(8),
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 30,
              textAlign: "center",
              color: myTheme.whiteFade,
            }}
          >
            Oops, you currenly have no discount voucher
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
              marginTop: 9,
              color: myTheme.whiteFade,
            }}
          >
            Check back later.
          </Text>
        </View>
        <View
          style={{
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: myTheme.secondary,
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
                color: myTheme.primary,
              }}
            >
              Continue shopping
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Discount;

const styles = StyleSheet.create({
  lottieStyle: {
    width: width * 0.9,
    height: width * 0.3,
    marginBottom: responsiveHeight(7),
  },
});
