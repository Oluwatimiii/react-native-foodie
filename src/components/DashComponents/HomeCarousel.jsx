import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { myTheme } from "../../utils/Theme";
import { SnapCarouseldata } from "../data/data";


const HomeCarousel = () => {
  const [data, setData] = useState(SnapCarouseldata);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data?.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={{
              height: responsiveHeight(16),
              width: responsiveWidth(80),
              backgroundColor: myTheme.primary,
              marginRight: 10,
              borderRadius: 10,
              justifyContent: "center",
              ...Platform.select({
                ios: {
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                },
                android: {
                  elevation: 2,
                },
              }),
            }}
          >
            <ImageBackground source={{ uri: item.bgImg }} style={styles.image}>
              <View style={{ flex: 1 }}>
                <LinearGradient
                  colors={[
                    "rgba(2,0,36,1)",
                    "rgba(2,2,32,1)",
                    "rgba(10,34,61,0.12088585434173671)",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0, 0.2, 1]}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <View
                    style={{
                      padding: 16,
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        maxWidth: responsiveWidth(35),
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      {item.text}
                    </Text>
                    <Text
                      style={{
                        backgroundColor: myTheme.primary,
                        color: "white",
                        padding: 9,
                        borderRadius: 20,
                        fontWeight: "400",
                      }}
                    >
                      {item.btnText}
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default HomeCarousel;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 10,
  },
});
