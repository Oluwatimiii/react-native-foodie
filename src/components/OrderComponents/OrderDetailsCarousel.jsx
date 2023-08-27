import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { myTheme } from "../../utils/Theme";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import ProductTitle from "../DashComponents/ProductTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../store/ProductReducer";

const OrderDetailsCarousel = ({ text, viewAll, datas }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const foodProduct = useSelector((state) => state.product.product);
  const fetchProducts = () => {
    datas.map((items) => dispatch(getProducts(items)));
  };

  useEffect(() => {
    if (foodProduct.length > 0) {
      console.log("greater");
      return;
    }

    fetchProducts();
  }, []);

  const handlePress = (id) => {
    navigation.push("OrderDetails", {
      productId: id,
      dataFile: datas,
    });
  };

  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <ProductTitle text={text} viewAll={viewAll} />

      {/* FOOD BOX */}
      <View
        style={{
          paddingVertical: 14,
          width: "100%",
        }}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          {foodProduct.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(item.id)}
                style={{
                  backgroundColor: myTheme.whiteFade,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                  padding: 10,
                  borderRadius: 4,
                  marginBottom: 10,
                }}
              >
                <View style={styles.imgBox}>
                  <Image style={styles.image} source={{ uri: item.bgImg }} />
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  {/* FOOD DETAILS */}
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {item.text}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 13,
                        }}
                      >
                        &#8358; {item.amount}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "300",
                          opacity: 0.6,
                          fontSize: 13,
                          color: "red",
                          textDecorationLine: "line-through",
                        }}
                      >
                        &#8358; {item.prevAmount}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <MaterialIcons
                        name="stars"
                        size={18}
                        color={myTheme.primary}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text>60% off </Text>
                        <Entypo
                          name="dot-single"
                          size={20}
                          color={myTheme.fade}
                        />
                        <Text
                          style={{
                            color: myTheme.primary,
                          }}
                        >
                          2 Left{" "}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* BUTTON */}
                  <View>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        backgroundColor: myTheme.primary,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          fontWeight: "600",
                        }}
                      >
                        ADD +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default OrderDetailsCarousel;

const styles = StyleSheet.create({
  imgBox: {
    display: "hidden",
    height: responsiveHeight(8),
    width: responsiveWidth(18),
    overflow: "hidden",
    borderRadius: 14,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
