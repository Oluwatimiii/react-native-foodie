import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { productCarouseldata, searchData } from "../../components/data/data";
import ProductCarousel from "../../components/DashComponents/ProductCarousel";
import { ScrollView } from "react-native-gesture-handler";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { myTheme } from "../../utils/Theme";
import CustomStatusBar from "../../components/DashComponents/StatusBar";

const Search = () => {
  const [data, setData] = useState(searchData);
  const [inputValue, setInputValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem("searchHistory");
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Error loading search history:", error);
    }
  };

  const saveSearchHistory = async (searchText) => {
    try {
      const newHistory = [
        searchText,
        ...searchHistory.filter((item) => item !== searchText),
      ].slice(0, 4);
      setSearchHistory(newHistory);
      await AsyncStorage.setItem("searchHistory", JSON.stringify(newHistory));
    } catch (error) {
      console.error("Error saving search history:", error);
    }
  };

  const handleInputChange = async (texts) => {
    setInputValue(texts);
    if (texts.length >= 2) {
      const filteredData = productCarouseldata.filter((item) =>
        item.text.toLowerCase().trim().includes(texts.toLowerCase())
      );
      setFilteredArray(filteredData);
      saveSearchHistory(texts);
    } else {
      setFilteredArray([]);
    }
  };

  const handleHistoryItemPress = (item) => {
    setInputValue(item);
    handleInputChange(item);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: responsiveHeight(5),
        paddingHorizontal: responsiveWidth(5),
        backgroundColor: "white",
      }}
    >
      {/* STATUS BAR */}
      <CustomStatusBar />
      {/* Text Input */}
      <View
        style={{
          backgroundColor: "#F3f3f3",
          flexDirection: "row",
          alignItems: "center",
          padding: 14,
          gap: 15,
          borderColor: "gray",
          borderWidth: 0.5,
          borderRadius: 9,

          marginBottom: 10,
        }}
      >
        <FontAwesome name="search" size={24} color="black" />
        <TextInput
          style={{
            flex: 1,
            color: "black",
          }}
          placeholder="Search for a food..."
          onChangeText={handleInputChange}
          value={inputValue}
          onSubmitEditing={() => saveSearchHistory(inputValue)}
        />
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {inputValue.length >= 2 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                paddingBottom: responsiveHeight(9),
              }}
            >
              <ProductCarousel datas={filteredArray} horizon={false} />
            </View>
          ) : (
            <>
              <View
                style={{
                  width: "100%",
                  marginVertical: 10,
                }}
              >
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ columnGap: 13 }}
                >
                  {data.map((item) => {
                    return (
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        key={item.id}
                      >
                        <TouchableOpacity
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            marginBottom: 5,
                            borderColor: "gray",
                            borderWidth: 0.5,
                            borderRadius: 9,
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
                    );
                  })}
                </ScrollView>
              </View>

              <View style={{ borderTopWidth: 1, borderColor: myTheme.fade }}>
                <Text style={styles.historyTitle}>Previous Searches:</Text>

                {searchHistory.slice(0, 4).map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.historyItem}
                      onPress={() => handleHistoryItemPress(item)}
                    >
                      <AntDesign
                        name="clockcircleo"
                        size={16}
                        color={myTheme.fade}
                      />
                      <Text> </Text>
                      <Text style={{ fontWeight: "700", fontSize: 17 }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  imgBox: {
    width: 73,
    height: 53,
    borderRadius: 10,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  historyTitle: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  historyItem: {
    paddingVertical: 3,
    alignItems: "center",
    flexDirection: "row",
  },
});
