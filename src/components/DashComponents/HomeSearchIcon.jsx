import { View, Text, TextInput } from "react-native";
import React from "react";
import { myTheme } from "../../utils/Theme";
import { FontAwesome } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";

const HomeSearchIcon = () => {
  return (
    <View
      style={{
        backgroundColor: "#F3f3f3",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        gap: 15,
      }}
    >
      <FontAwesome name="search" size={24} color="black" />
      <TextInput
        style={{
          flex: 1,
          color: "black",
        }}
        placeholder="Search for a food..."
      />
    </View>
  );
};

export default HomeSearchIcon;
