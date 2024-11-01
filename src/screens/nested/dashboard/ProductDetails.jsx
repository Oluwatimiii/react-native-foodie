import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { myTheme } from "../../../utils/Theme";
import { HeartIcon } from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { Feather } from "@expo/vector-icons";
import { productCarouseldata2 } from "../../../components/data/data";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ProductCarousel from "../../../components/DashComponents/ProductCarousel";
import OrderProducts from "../../../components/OrderComponents/OrderProducts";
import { useDispatch, useSelector } from "react-redux";
import { removeFavoriteStores, setDataCart, setFavoriteStores } from "../../../../store/UserSlice";

const ios = Platform.OS === "ios";

const ProductDetails = ({ route, navigation }) => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.amount)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();

  const [openSimilar, setOpenSimilar] = useState(false);
  const { productId, dataFile, scrollToTop } = route.params;


  const data = dataFile.filter((data) => data?.id === productId);
  const [productData, setProductData] = useState(data[0]);

  // Fetching favorites details
  const favoriteStores = useSelector((state) => state.user.favoriteStores);

  const savedFavStore = favoriteStores.find(
    (store) =>
      store[0]?.text === data[0]?.text
  );

  //console.log("fresh fave", favoriteStores)
  //console.log("fresh fave", favoriteStores.filter((store) => store[0]?.text !== data[0]?.text))

  // Scroll to top on carousel click
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollToTop) {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [route.params]);


  //add to cart
  const setCart = () => {
    dispatch(setDataCart(productData));
    navigation.navigate("CartStack", {
      screen: "Cart",
    });
  };

  // add store to favorites array
  const addFavoriteStores = async () => {
    const updatedData = {
      ...productData,
      favorited: !productData?.favorited,
    };
    await setProductData(updatedData)

    if (updatedData?.favorited === true && !savedFavStore) {
      dispatch(setFavoriteStores([updatedData]))
      console.log("added fav")
    } else {
      dispatch(removeFavoriteStores(data[0]?.text))
      console.log("unliked fav")
    }
  }

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={{
          flex: 1,
          backgroundColor: "white",
          position: "relative",
        }}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(9),
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

            <View style={styles.searchView}>
              {/* <TouchableOpacity
                style={styles.iconBg}
                // onPress={() => navigation.goBack()}
              >
                <FontAwesome name="search" size={22} color="black" />
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.iconBg}
                onPress={addFavoriteStores}
              >
                <HeartIcon
                  size="22"
                  color={savedFavStore ? myTheme.primary : myTheme.fade}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        <View>
          <Image source={{ uri: productData?.bgImg }} style={styles.image} />
          <View
            style={{
              paddingHorizontal: 18,
              paddingVertical: 12,
            }}
          >
            {/* STORE DETAILS */}
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              {productData?.text}
            </Text>
            <View
              style={{
                gap: 4,
                marginTop: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <AntDesign name="star" size={20} color={myTheme.primary} />
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                  }}
                >
                  {productData?.rating} - (13 ratings)
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Feather name="clock" size={17} color={myTheme.fade} />
                <Text
                  style={{
                    color: myTheme.fade,
                    fontWeight: "600",
                  }}
                >
                  Open from : {productData?.time}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 7,
                  gap: 8,
                  paddingVertical: 7,
                  paddingHorizontal: 15,
                  borderRadius: 4,
                  borderColor: myTheme.fade,
                  borderWidth: 0.5,
                }}
              >
                <Entypo name="location" size={20} color={myTheme.primary} />
                <Text
                  style={{
                    color: myTheme.fade,
                    fontWeight: "600",
                  }}
                >
                  {productData?.location}
                </Text>
              </View>
            </View>

            {/* Similar Outlets */}
            <View
              style={{
                marginTop: 20,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => setOpenSimilar(!openSimilar)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  backgroundColor: openSimilar ? "black" : myTheme.fade,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                    color: openSimilar ? "white" : "black",
                  }}
                >
                  See similar
                </Text>
                <AntDesign
                  name={openSimilar ? "arrowup" : "arrowdown"}
                  size={15}
                  color={openSimilar ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>

            {openSimilar && (
              <ProductCarousel
                text="Similar near you"
                viewAll={false}
                datas={productCarouseldata2}
                horizon={true}
              />
            )}

            <OrderProducts orderData={data} />

            <ProductCarousel
              text="More to explore"
              viewAll={true}
              horizon={true}
              datas={productCarouseldata2}
            />
          </View>
        </View>
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          onPress={setCart}
          style={{
            backgroundColor: myTheme.tertiary,
            padding: 12,
            position: "absolute",
            borderRadius: 7,
            bottom: responsiveWidth(9),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: responsiveWidth(90),
            left: responsiveWidth(5),
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
              {cart.length} picked | &#8358;{total.toLocaleString("en")}
            </Text>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "400" }}>
              Extra charges might apply
            </Text>
          </View>

          <Pressable>
            <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
              Proceed to Basket
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
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
