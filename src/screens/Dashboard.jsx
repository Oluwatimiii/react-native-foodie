import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { myTheme } from "../utils/Theme";
import HomeSearchIcon from "../components/DashComponents/HomeSearchIcon";
import { Feather } from "@expo/vector-icons";
import HomeCarousel from "../components/DashComponents/HomeCarousel";
import ProductTitle from "../components/DashComponents/ProductTitle";
import ProductCarousel from "../components/DashComponents/ProductCarousel";
import { productCarouseldata, productCarouseldata1, productCarouseldata2 } from "../components/data/data";
import Filters from "../components/DashComponents/Filters";

export default function Dashboard({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: myTheme.secondary,
        paddingHorizontal: 20,
        paddingVertical: 13,
        gap: 17,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.logoBox}>
          <Image
            style={styles.logoImage}
            source={require("./../../assets/fast-food.png")}
          />
          <View>
            <Text style={styles.splashText}>foodie</Text>
          </View>
        </View>

        <Feather name="shopping-cart" size={24} color="black" />
      </View>

      <View>
        <HomeSearchIcon />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeCarousel />
        <Filters />
        <ProductCarousel text="Top Deals" viewAll={true} datas={productCarouseldata} />
        <ProductCarousel text="Featured Outlets" viewAll={true} datas={productCarouseldata1} />
        <ProductCarousel text="Recommended" viewAll={true} datas={productCarouseldata2} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  logoImage: {
    height: 30,
    width: 30,
  },
  splashText: {
    fontSize: 28,
    fontWeight: "bold",
    color: myTheme.tertiary,
  },
});
