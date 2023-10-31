import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeSearchIcon = () => {
  const navigation = useNavigation();

  const navigateToDetails = () => {
    navigation.navigate("Search");
    };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#F3f3f3",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        gap: 15,
      }}
      onPress={navigateToDetails}
    >
      <FontAwesome name="search" size={24} color="black" />
      <Text>Search for a restaurant</Text>
    </TouchableOpacity>
  );
};

export default HomeSearchIcon;
