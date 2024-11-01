import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { myTheme } from "../../utils/Theme";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import React, { useState } from "react";
import ProductTitle from "./ProductTitle";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayStore } from "../../../store/UserSlice";

const ProductCarousel = ({ text, viewAll, datas, horizon }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isFav, setIsFav] = useState(true)

  const cart = useSelector((state) => state.cart.cart)

  const handlePress = (id) => {
    const clickedStore = datas.filter((data) => data?.id === id);
    const storeName = clickedStore[0].text;


    const storeNotPresent = cart?.some((item) => item?.storeName !== storeName);
    // console.log(storeNotPresent, "Not in cart");

    //check if store is present in favorite's folder
    if (storeNotPresent === false) {
      navigation.navigate("HomeStack", {
        screen: "Details",
        params: {
          productId: id,
          dataFile: datas,
          scrollToTop: true
        },
      });
    } else {
      dispatch(setDisplayStore(true));
    }
  };



  return (
    <View>
      <ProductTitle text={text} viewAll={viewAll} />

      <View
        style={{
          width: "100%",
          marginVertical: text ? 10 : 1,
        }}
      >
        <FlatList
          data={datas}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePress(item.id)}
              key={item?.id}
              style={{
                position: "relative",
                overflow: "hidden",
                height: responsiveHeight(horizon ? 22 : 27),
                width: responsiveWidth(horizon ? 60 : 90),
                marginBottom: 5,
                borderColor: "gray",
                borderWidth: 0.3,
                borderRadius: 9,
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
              <ImageBackground
                source={{ uri: item.bgImg }}
                style={styles.image}
              >
                <View style={styles.overlay}>
                  {/* ICONS VIEW --TOP */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: 10,
                    }}
                  >
                    <View style={styles.rating}>
                      <Entypo name="star" size={16} color={myTheme.primary} />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {item.rating}
                      </Text>
                    </View>
                    <View style={styles.heart}>
                      <AntDesign
                        name="heart"
                        size={14}
                        color={isFav ? myTheme.primary : myTheme.whiteFade}
                      />
                    </View>
                  </View>

                  {/* Details View --BOTTOM */}
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      overflow: "hidden",
                      width: responsiveWidth(100),
                      backgroundColor: "white",
                      overflow: "hidden",
                      padding: 7,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {item?.text}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: 12,
                      }}
                    >
                      {item?.location}
                    </Text>
                    <View
                      style={{
                        paddingTop: 5,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Feather
                          name="clock"
                          size={14}
                          color={myTheme.primary}
                        />
                        <Text
                          style={{
                            fontWeight: "500",
                            fontSize: 12,
                          }}
                        >
                          {item?.time}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                          }}
                        >
                          | From{" "}
                          <Text
                            style={{
                              color: myTheme.primary,
                              fontWeight: "600",
                            }}
                          >
                            {" "}
                            &#8358; {item?.amount}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          horizontal={horizon}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 11, rowGap: 4 }}
        />
      </View>
    </View>
  );
};

export default ProductCarousel;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    gap: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
    width: "auto",
    borderRadius: 10,
  },
  heart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 3.2,
    backgroundColor: "white",
    width: "auto",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
