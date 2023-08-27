import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OrderDetailsCarousel from "./OrderDetailsCarousel";
import {
  orderCarouseldata,
  orderCarouseldata1,
  orderCarouseldata2,
} from "../data/data";
import { responsiveHeight } from "react-native-responsive-dimensions";

const OrderProducts = ({ orderData }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: responsiveHeight(2),
      }}
    >
      <OrderDetailsCarousel
        datas={orderCarouseldata}
        text="Suggested"
        viewAll={false}
      />
    </View>
  );
};

export default OrderProducts;

const styles = StyleSheet.create({});
