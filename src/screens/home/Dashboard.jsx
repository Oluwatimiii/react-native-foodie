import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { myTheme } from "../../utils/Theme";

import HomeSearchIcon from "../../components/DashComponents/HomeSearchIcon";
import HomeCarousel from "../../components/DashComponents/HomeCarousel";
import ProductCarousel from "../../components/DashComponents/ProductCarousel";
import Filters from "../../components/DashComponents/Filters";
import {
  productCarouseldata,
  productCarouseldata1,
  productCarouseldata2,
} from "../../components/data/data";
import * as Location from "expo-location";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setUserLocation } from "../../../store/UserSlice";

export default function Dashboard({ navigation }) {
  const [currentAdd, setCurrentAdd] = useState("Location loading...");
  const [currentStreet, setCurrentStreet] = useState("Street loading...");
  const [locationEnabled, setLocationEnabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    checkLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert("Location granted", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setLocationEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Location access granted",
        "Enable location services in settings.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let preciseAddress = `${item.city}, ${item.region} - ${item.country}`;
        let preciseStreet = `${
          item?.street ? item?.street : "No street found"
        }`;

        const setLocations = `${
          item?.street ? item?.street : "No street found"
        }, ${item.city}, ${item.region} - ${item.country}`;

        console.log("dashboard", setLocations);
        dispatch(setUserLocation(setLocations));
        setCurrentAdd(preciseAddress);
        setCurrentStreet(preciseStreet);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: myTheme.secondary,
        paddingHorizontal: 18,
        paddingTop: 13,
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
        {/* LOCATION AND DISCOUNT */}
        <View style={styles.logoBox}>
          <Entypo name="location" size={20} color={myTheme.primary} />
          <View>
            <Text style={styles.splashText1}>{currentStreet}</Text>
            <Text style={styles.splashText} numberOfLines={1}>
              {currentAdd}
            </Text>
          </View>
          <AntDesign name="arrowdown" size={15} color={myTheme.primary} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Discount")}>
          <MaterialCommunityIcons
            name="progress-star"
            size={22}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View>
        <HomeSearchIcon />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeCarousel />
        <Filters />
        <ProductCarousel
          text="Top Deals"
          viewAll={true}
          datas={productCarouseldata}
        />
        <ProductCarousel
          text="Featured Outlets"
          viewAll={true}
          datas={productCarouseldata1}
        />
        <ProductCarousel
          text="Recommended"
          viewAll={true}
          datas={productCarouseldata2}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 10,
  },
  logoImage: {
    height: 30,
    width: 30,
  },
  splashText: {
    fontSize: 13,
    fontWeight: "400",
    color: myTheme.tertiary,
  },
  splashText1: {
    fontSize: 14,
    fontWeight: "400",
    color: myTheme.tertiary,
  },
});
