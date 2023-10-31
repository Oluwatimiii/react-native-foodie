import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OrderDetailsCarousel from "./OrderDetailsCarousel";
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
        datas={orderData[0].store}
        text="Suggested"
        viewAll={false}
      />
    </View>
  );
};

export default OrderProducts;

const styles = StyleSheet.create({});
