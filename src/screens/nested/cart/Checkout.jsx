import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { myTheme } from "../../../utils/Theme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearCart } from "../../../../store/CartReducer";

// const ios = (Platform.OS = "ios");

const Checkout = () => {
  // Getting user's location
  const location = useSelector((state) => state.user.userLocation);
  // Fetching cart details
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.amount)
    .reduce((curr, prev) => curr + prev, 0);
  const newTotal = total + 1500;

  // Clearing cart after proceeding to successful
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("");
  const [address, setAddress] = useState(location);
  const [instructions, setInstructions] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckboxChange = (value) => {
    setSelectedValue(value);
  };

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveButtonClick = () => {
    setIsEditing(false); 
  };

  const navigation = useNavigation();

  const handlePayment = () => {
    if (selectedValue === "Card") {
      navigation.navigate("Payment");
    } else {
      navigation.replace("Successful");
      dispatch(clearCart([]));
      console.log(cart);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* SHOP ADDRESS */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderColor: myTheme.fade,
          borderBottomWidth: 0.5,
          borderTopWidth: 0.5,
          paddingHorizontal: responsiveWidth(13),
          paddingVertical: 15,
        }}
      >
        <View style={styles.imgBox}>
          <Image
            style={styles.image}
            source={require("../../../../assets/fast-food.png")}
          />
        </View>

        {/* Cart Order Details */}
        <View
          style={{
            paddingLeft: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>Trilogy Cafe</Text>
          <Text
            style={{ fontWeight: "400", fontSize: 14, color: myTheme.fade }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
            laboriosam?
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: responsiveWidth(7),
          paddingVertical: 20,
        }}
      >
        {/*DELIVERY ADD. */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Entypo name="location-pin" size={21} color={myTheme.primary} />
            <Text style={styles.text1}>Delivery Address</Text>
          </View>
          <Pressable
            onPress={isEditing ? handleSaveButtonClick : handleEditButtonClick}
          >
            <Text
              style={{
                color: myTheme.primary,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {isEditing ? "Save Address" : "Edit address"}
            </Text>
          </Pressable>
        </View>

        {/* Address box */}
        <View style={styles.input}>
          {isEditing ? (
            <TextInput
              style={{
                flex: 0.94,
                fontSize: 14,
              }}
              placeholder="Please enter your address"
              value={address}
              onChangeText={(value) => setAddress(value)}
            />
          ) : (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {address}
              </Text>
            </View>
          )}

          <AntDesign
            name="checkcircle"
            size={18}
            color={isEditing ? myTheme.fade : myTheme.primary}
          />
        </View>

        {/*Instructions */}
        <View style={{ paddingTop: 15 }}>
          <View
            style={{
              marginBottom: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Entypo name="bookmarks" size={20} color={myTheme.primary} />
              <Text style={styles.text1}>Additional Instructions</Text>
            </View>
          </View>

          {/* Instruction box */}
          <View style={styles.input}>
            <TextInput
              style={{
                flex: 0.94,
                fontSize: 14,
              }}
              placeholder="Type something"
              value={instructions}
              onChangeText={(value) => setInstructions(value)}
            />
          </View>
        </View>
        {/*Order Summary */}
        <View style={{ paddingTop: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <FontAwesome name="list-alt" size={19} color={myTheme.primary} />
              <Text style={styles.text1}>Order Summary</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Order summary */}
      <View>
        {cart.map((item, index) => (
          <View key={index} style={styles.press}>
            {/* Cart food Image */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <View style={styles.imgBox}>
                <Image style={styles.image} source={{ uri: item.bgImg }} />
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

            {/*Quantity*/}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                paddingHorizontal: 8,
              }}
            >
              {item.quantity}x
            </Text>
          </View>
        ))}
      </View>

      {/* Subtotal */}
      <View
        style={{
          paddingHorizontal: responsiveWidth(7),
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
          <Text style={styles.text3}>&#8358; {total.toLocaleString("en")}</Text>
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
            paddingTop: 13,
          }}
        >
          <Text style={styles.text1}>Total</Text>
          <Text style={styles.text1}>
            &#8358; {newTotal.toLocaleString("en")}
          </Text>
        </View>
      </View>

      {/* Payment options */}
      <View
        style={{
          borderColor: myTheme.fade,
          borderBottomWidth: 0.5,
          borderTopWidth: 0.5,
          paddingHorizontal: responsiveWidth(7),
          paddingVertical: 15,
        }}
      >
        <View
          style={{
            marginBottom: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="wallet" size={20} color={myTheme.primary} />
            <Text style={styles.text1}>Payment Method</Text>
          </View>
        </View>

        {/* Check box */}
        <View
          style={{
            marginBottom: 7,
          }}
        >
          <View>
            <TouchableOpacity
              style={[
                styles.checkboxItem,
                selectedValue === "Cash" && styles.selected,
              ]}
              onPress={() => handleCheckboxChange("Cash")}
            >
              <Text
                style={{ color: selectedValue === "Cash" ? "white" : "black" }}
              >
                Cash on delivery
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={[
                styles.checkboxItem,
                selectedValue === "Card" && styles.selected,
              ]}
              onPress={() => handleCheckboxChange("Card")}
            >
              <Text
                style={{ color: selectedValue === "Card" ? "white" : "black" }}
              >
                Pay with card
              </Text>
            </TouchableOpacity>
          </View>
          <Text>
            Selected method:
            {selectedValue ? selectedValue : "Please select a method"}
          </Text>
        </View>

        {/* Proceed Btn */}
        <View
          style={{
            paddingVertical: 7,
          }}
        >
          <TouchableOpacity
            disabled={selectedValue === "" ? true : false}
            onPress={handlePayment}
            style={{
              backgroundColor:
                selectedValue === "" ? myTheme.fade : myTheme.primary,
              width: "100%",
              paddingVertical: responsiveHeight(2),
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: selectedValue === "" ? myTheme.tertiary : "white",
                fontWeight: "bold",
                fontSize: 21,
                textAlign: "center",
              }}
            >
              Proceed to pay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  imgBox: {
    display: "hidden",
    height: responsiveHeight(7),
    width: responsiveWidth(17),
    overflow: "hidden",
    borderRadius: 24,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  input: {
    minHeight: responsiveHeight(6),
    borderColor: "gray",
    borderWidth: 0.4,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text1: {
    fontWeight: "bold",
    fontSize: 17,
  },
  press: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: myTheme.whiteFade,
    paddingHorizontal: responsiveWidth(7),
    paddingVertical: 15,
    borderBottomColor: myTheme.darkFade,
    borderBottomWidth: 2,
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
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
  },
  selected: {
    backgroundColor: "#228B22",
  },
});
