import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { myTheme } from "../../../utils/Theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { AntDesign } from '@expo/vector-icons';
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Checklist from "../../../components/OrderComponents/CheckList";
import { addToCart } from "../../../../store/CartReducer";
import { incrementQty } from "../../../../store/ProductReducer";
import { useDispatch } from "react-redux";

const ios = Platform.OS === "ios";

const OrderDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [selectName, setSelectName] = useState("");
  const [selectedId, setSelectedId] = useState();

  const { productId, dataFile } = route.params;
  const data = dataFile.filter((data) => data?.id === productId);

  const displaySelected = async (listId) => {
    setSelectedId(listId);
    const getName = await data[0]?.checklist.filter(
      (list) => list?.id === listId
    );
    const selectedName = getName[0]?.text;
    setSelectName(selectedName);
  };

  const addItemToCart = async () => {
    dispatch(addToCart({ ...data[0], checkedName: selectName })); //Add to cart array
    dispatch(incrementQty({ ...data[0], checkedName: selectName })); //Increase product quantity
    navigation.goBack();
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: myTheme.darkFade,
          paddingBottom: 30,
        }}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(10),
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <SafeAreaView>
            <View style={styles.safeView}>
              <TouchableOpacity
                style={styles.iconBg}
                onPress={() => navigation.goBack()}
              >
                <ChevronLeftIcon size="22" strokeWidth={2.3} color="black" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <Image source={{ uri: data[0]?.bgImg }} style={styles.image} />
          <View style={{}}>
            {/* FOOD DETAILS */}
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 12,
                backgroundColor: myTheme.secondary,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 24,
                }}
              >
                {data[0]?.text}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginTop: 4,
                }}
              >
                &#8358;{data[0]?.amount.toLocaleString("en")}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  color: myTheme.fade,
                  fontSize: 16,
                  marginTop: 3.5,
                }}
              >
                {data[0]?.description}
              </Text>
            </View>

            {/* CUSTOM SELECTIONS */}
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 12,
                marginTop: responsiveHeight(1),
                backgroundColor: myTheme.secondary,
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Choose your {data[0]?.checkName}
                </Text>
                <View
                  style={{
                    backgroundColor: myTheme.primary,
                    paddingVertical: 3,
                    paddingHorizontal: 8,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    Required
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 14,
                  marginTop: 9,
                  marginBottom: 4,
                }}
              >
                {!selectName
                  ? "Click to select prefered choice"
                  : "Selected choice:"}
                <Text> </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: myTheme.primary,
                  }}
                >
                  {selectName}
                </Text>
              </Text>

              {/* CHECKLIST */}
              <View>
                <Checklist
                  initialItems={data[0]?.checklist}
                  displaySelected={displaySelected}
                />
              </View>
            </View>

            {/* Allergy Note */}
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 12,
                marginTop: responsiveHeight(1),
                backgroundColor: myTheme.secondary,
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: myTheme.fade,
                  fontSize: 14,
                }}
              >
                Prior to placing your order, we politely request that you
                directly communicate with the restaurant in regard to any
                allergies, intolerances, or dietary preferences you may have.
                Please initiate contact with a staff member who can offer
                insights into the ingredients used and offer assistance in
                accommodating your specific requirements. please message
                <Text> </Text>
                <Text
                  style={{ textDecorationLine: "underline" }}
                  onPress={() => {
                    Linking.openURL("https://t.co/dmyiar973i");
                  }}
                >
                  The App Creator - Oke Timilehin
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* TO-CART BTN */}
      {selectName ? (
        <TouchableOpacity style={styles.footer} onPress={addItemToCart}>
          <Text
            style={{
              fontWeight: "800",
              fontSize: 18,
              color: "white",
              textAlign: "center",
              paddingVertical: 15,
            }}
          >
            Add 1 to basket - &#8358;
            {data[0]?.amount.toLocaleString("en")}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.footer}>
          <Text
            style={{
              fontWeight: "800",
              fontSize: 18,
              color: "white",
              textAlign: "center",
              paddingVertical: 15,
            }}
          >
            <AntDesign name="warning" size={20} color="white" /> <Text></Text>
            Please select a {data[0]?.checkName} above
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: myTheme.tertiary,
    padding: 12,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: responsiveWidth(100),
    left: responsiveWidth(0),
    bottom: 0,
  },
  iconBg: {
    padding: 9,
    borderRadius: 40,
    backgroundColor: myTheme.secondary,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    overflow: "hidden",
    height: responsiveHeight(26),
    width: "100%",
    zIndex: -1,
  },
  safeView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    marginTop: ios ? "" : 19,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: responsiveWidth(3),
  },
  searchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
