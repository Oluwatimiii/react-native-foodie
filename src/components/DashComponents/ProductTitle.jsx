import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { myTheme } from "../../utils/Theme";

const ProductTitle = ({ text, viewAll }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 18,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {text}
      </Text>
      <Text
        style={{
          fontWeight: "400",
          fontSize: 16,
          color: myTheme.primary,
        }}
      >
        { viewAll ? "View All" : '' }
      </Text>
    </View>
  );
};

export default ProductTitle;
