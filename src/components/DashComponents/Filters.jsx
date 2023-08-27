import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import ProductTitle from "./ProductTitle";
import { filterData } from "../data/data";

const Filters = () => {
  const [data, setData] = useState(filterData);

  return (
    <View>
      <ProductTitle text="Filter By" />

      <View
        style={{
          width: "100%",
          marginVertical: 10,
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity
                key={item.id}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: 5,
                  borderRadius: 10,
                }}
              >
                <View style={styles.imgBox}>
                  <Image
                    style={styles.img}
                    source={{ uri: item?.bgImg }}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {item.text}
              </Text>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 15 }}
          key={(item) => item.id}
        ></FlatList>
      </View>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  imgBox: {
    width: 80,
    height: 50,
    borderRadius: 10,
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
