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
            <TouchableOpacity key={item.id}>
              <View>
                <View>
                  <Image source={{ uri: item?.bgImg }} />
                </View>
                <Text>{item?.text}</Text>
              </View>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 6 }}
        ></FlatList>
      </View>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({});
