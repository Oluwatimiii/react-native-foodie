import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { myTheme } from "../../utils/Theme";
import * as Location from "expo-location";
import HomeSearchIcon from "../../components/DashComponents/HomeSearchIcon";
import HomeCarousel from "../../components/DashComponents/HomeCarousel";
import ProductCarousel from "../../components/DashComponents/ProductCarousel";
import Filters from "../../components/DashComponents/Filters";
import {
  productCarouseldata,
  productCarouseldata1,
  productCarouseldata2,
  filterData,
} from "../../components/data/data";

import { Entypo } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayStore, setUserLocation } from "../../../store/UserSlice";
import { clearCart } from "../../../store/CartReducer";
import { responsiveWidth } from "react-native-responsive-dimensions";

import BottomSheet from "../../components/DashComponents/BottomSheet";

export default function Dashboard({ navigation }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(false);

  const dispatch = useDispatch();
  const displayStore = useSelector((state) => state.user.displayStore);
  const location = useSelector((state) => state.user.userLocation);

  const clearCarts = () => {
    dispatch(clearCart([]));
    dispatch(setDisplayStore(false));
  };

  // const bottomSheetRef = useRef(null)

  // const openModal = () => {
  //   bottomSheetRef.current?.present()
  // }

  useEffect(() => {
    checkLocationEnabled();
  }, [errorMsg]);

  const checkLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      setLocationEnabled(false)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg('Permission to access background location was denied');
      } else {
        setLocationEnabled(true)
        Alert.alert("Enable location", "Please enable locations in settings to update it. Your location is safe and important for the delivery process.", [
          {
            text: "Cancel",
            onPress: () => setErrorMsg('Permission to access location was denied'),
            style: "cancel",
          },
          { text: "Open settings", onPress: () => getBackgroundLocationPermission() },
        ]);
      }
    } else {
      getCurrentLocation()
    }
  };

  const getBackgroundLocationPermission = async () => {
    setErrorMsg("")
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access background location was denied');
    } else {
      getCurrentLocation()
      console.log("location granted")
    }
  };


  const getCurrentLocation = async () => {
    console.log("infetCurrent")
    const { coords } = await Location.getCurrentPositionAsync({});
    if (coords) {
      const { latitude, longitude } = coords;

      //Convert geocodes to postal address location - FIX THIS!!!! 
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(response, "response")
      for (let item of response) {
        const setLocations = `${item?.street ? item?.street : "No street found"}, ${item?.city}, ${item?.region} - ${item.country}`;
        dispatch(setUserLocation(setLocations));
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
            <Text style={styles.splashText1}>{location.slice(0, 15)}-</Text>
            <Text style={styles.splashText} numberOfLines={1}>
              {errorMsg !== "" ? errorMsg : location.slice(15)}
            </Text>
          </View>
          <TouchableOpacity onPress={() => checkLocationEnabled()}>
            <Foundation name="refresh" size={20} color={myTheme.primary} />
          </TouchableOpacity>
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

      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={displayStore}
        onRequestClose={() => dispatch(setDisplayStore(false))}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, { fontWeight: "bold", fontSize: 18, color: myTheme.primary }]}>
              Hold on..
            </Text>
            <Text style={[styles.modalText, { fontWeight: "bold" }]}>
              You are trying to swtich to another restaurant. This action will
              clear your cart.
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 9,
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose, { backgroundColor: "red" }]}
                onPress={() => dispatch(setDisplayStore(false))}
              >
                <Text style={styles.textStyle}>CANCEL</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, { backgroundColor: "green" }]}
                onPress={clearCarts}
              >
                <Text style={styles.textStyle}>PROCEED</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeCarousel />
        <Filters datas={filterData} />
        <ProductCarousel
          text="Top Deals"
          viewAll={true}
          datas={productCarouseldata}
          horizon={true}
        />
        <ProductCarousel
          text="Featured Outlets"
          viewAll={true}
          datas={productCarouseldata1}
          horizon={true}
        />
        <ProductCarousel
          text="Recommended"
          viewAll={true}
          datas={productCarouseldata2}
          horizon={true}
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
    fontSize: 14,
    fontWeight: "400",
    color: myTheme.tertiary,
  },
  splashText1: {
    fontSize: 13,
    fontWeight: "400",
    color: myTheme.tertiary,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: responsiveWidth(85),
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: myTheme.primary,
  },
  buttonClose: {
    backgroundColor: myTheme.primary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
