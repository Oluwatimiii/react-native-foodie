import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useMemo, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { myTheme } from "../../utils/Theme";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../../store/CartReducer";
import { decrementQty, incrementQty } from "../../../store/ProductReducer";
import CustomStatusBar from "../../components/DashComponents/StatusBar";

const { width, height } = Dimensions.get("window");

const Cart = ({ navigation }) => {
  // Setting Bottom sheet
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = ["40%"];

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const handleCheckout = () => {
    navigation.navigate("Checkout");
    setIsOpen(false);
  };

  // Fetching cart details
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart)
  const total = cart
    .map((item) => item.quantity * item.amount)
    .reduce((curr, prev) => curr + prev, 0);
  const newTotal = total + 1500;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* STATUS BAR */}
      <CustomStatusBar />
      {total === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingHorizontal: responsiveWidth(6),
            justifyContent: "center",
            paddingVertical: responsiveHeight(18),
          }}
        >
          <View style={styles.lottieStyle}>
            <LottieView
              source={require("../../../assets/animations/anim4.json")}
              autoPlay
              loop
            />
          </View>
          <View
            style={{
              marginBottom: responsiveHeight(8),
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                textAlign: "center",
              }}
            >
              Omo your cart is empty!
            </Text>
          </View>
          <View
            style={{
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("HomeStack", {
                  screen: "Dashboard",
                })
              }
              style={{
                backgroundColor: myTheme.primary,
                width: "100%",
                paddingVertical: responsiveHeight(2),
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 21,
                  textAlign: "center",
                }}
              >
                Start shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={{ position: "relative", flex: 1 }}>
            {isOpen && (
              <View
                style={{
                  backgroundColor: isOpen ? "rgba(0, 0, 0, 0.4)" : "",
                  flex: 1,
                  height: "60%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  zIndex: 1,
                }}
              ></View>
            )}
            <ScrollView>
              {cart.map((item, index) => (
                <Pressable key={index} style={styles.press}>
                  {/* Cart food Image */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 11,
                    }}
                  >
                    <View style={styles.imgBox}>
                      <Image
                        style={styles.image}
                        source={{ uri: item.bgImg }}
                      />
                    </View>

                    {/* Cart Order Details */}
                    <View>
                      <Text style={styles.text1} numberOfLines={1}>
                        {item?.text}
                      </Text>
                      <Text style={styles.text2}>
                        &#8358; {item?.amount * item?.quantity}
                      </Text>
                      <Text
                        style={[
                          styles.text2,
                          { color: myTheme.primary, fontSize: 12 },
                        ]}
                      >
                        {item?.checkedName}
                      </Text>
                    </View>
                  </View>

                  {/* Increment and decrement*/}
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 5,
                      paddingVertical: 10,
                      backgroundColor: "white",
                      alignItems: "center",
                      gap: 5,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: myTheme.darkFade,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); //decrease in cart
                        dispatch(decrementQty(item)); // decrease item quantity
                      }}
                      style={{
                        width: 26,
                        height: 26,
                        alignContent: "center",
                        justifyContent: "center",
                        borderRadius: 13,
                        backgroundColor: myTheme.fade,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                          color: "black",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>
                    <Pressable>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          paddingHorizontal: 8,
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item));
                        dispatch(incrementQty(item));
                      }}
                      style={{
                        width: 26,
                        height: 26,
                        alignContent: "center",
                        justifyContent: "center",
                        borderRadius: 13,
                        backgroundColor: myTheme.primary,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                          color: myTheme.secondary,
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>
                </Pressable>
              ))}
            </ScrollView>
            {/* Shop More Btn */}
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 20,
                borderTopWidth: 2,
                borderColor: "rgba(0,0,0,0.1)",
              }}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate("HomeStack", {
                    screen: "Dashboard",
                  })
                }
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 8,
                }}
              >
                <Pressable
                  style={{
                    width: 26,
                    height: 26,
                    alignContent: "center",
                    justifyContent: "center",
                    borderRadius: 13,
                    backgroundColor: myTheme.primary,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                      paddingHorizontal: 6,
                      fontWeight: "600",
                      color: myTheme.secondary,
                    }}
                  >
                    +
                  </Text>
                </Pressable>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Shop More
                </Text>
              </Pressable>
            </View>
            {/* Promo Code */}
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderTopWidth: 2,
                borderBottomWidth: 2,
                borderColor: myTheme.darkFade,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <View
                  style={{
                    backgroundColor: myTheme.primary,
                    padding: 6,
                    borderRadius: 10,
                  }}
                >
                  <Octicons name="north-star" size={15} color="white" />
                </View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 17,
                  }}
                >
                  Add promo code
                </Text>
              </View>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
            {/* Billing Details */}
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: 7,
                }}
              >
                <Text style={styles.text3}>Subtotal</Text>
                <Text style={styles.text3}>
                  &#8358; {total.toLocaleString("en")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 7,
                }}
              >
                <Text style={styles.text3}>Discount</Text>
                <Text style={styles.text3}>&#8358; 0</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 7,
                }}
              >
                <Text style={styles.text3}>Delivery Fee</Text>
                <Text style={styles.text3}>&#8358; 1,500</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 7,
                  height: 2,
                  backgroundColor: myTheme.darkFade,
                  width: "100%",
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 7,
                }}
              >
                <Text style={styles.text1}>Total</Text>
                <Text style={styles.text1}>
                  &#8358; {newTotal.toLocaleString("en")}
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 7,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleSnapPress(0)}
                  style={{
                    backgroundColor: myTheme.primary,
                    width: "100%",
                    paddingVertical: responsiveHeight(2),
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 21,
                      textAlign: "center",
                    }}
                  >
                    Place Order
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}

      {isOpen && (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}
        >
          <BottomSheetView>
            <View
              style={{
                paddingHorizontal: 18,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
              }}
            >
              <View style={{ paddingVertical: 17 }}>
                <Text style={styles.text1}>Done shopping?</Text>
              </View>

              <TouchableOpacity
                onPress={handleCheckout}
                style={{
                  backgroundColor: myTheme.primary,
                  paddingVertical: responsiveHeight(2),
                  borderRadius: 8,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 21,
                    textAlign: "center",
                  }}
                >
                  Confirm order
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  imgBox: {
    display: "hidden",
    height: responsiveHeight(7),
    width: responsiveWidth(17),
    overflow: "hidden",
    borderRadius: 14,
  },
  lottieStyle: {
    width: width * 0.9,
    height: width * 0.3,
    marginBottom: responsiveHeight(7),
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  press: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: myTheme.whiteFade,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottom: 2,
    borderBottomColor: myTheme.darkFade,
    borderBottomWidth: 2,
  },
  text1: {
    fontWeight: "700",
    fontSize: 19,
  },
  text2: {
    fontWeight: "200",
    color: myTheme.tertiary,
    fontSize: 15,
  },
  text3: {
    fontWeight: "200",
    color: myTheme.tertiary,
    fontSize: 17,
  },
});
