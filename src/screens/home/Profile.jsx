import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/UserSlice";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { responsiveHeight } from "react-native-responsive-dimensions";
import { myTheme } from "../../utils/Theme";

const Profile = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.userData);
  const firstTwo = userEmail.slice(0, 3);

  console.log(userEmail);

  const logOut = async () => {
    await signOut(auth)
      .then((data) => {
        dispatch(setUser(false));
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      {/* Profile Box */}
      <View style={styles.flexIn}>
        <View style={styles.imgBkg}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            {firstTwo}.
          </Text>
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textTransform: "capitalize",
            marginTop: 10,
          }}
        >
          {userEmail}
        </Text>
      </View>

      {/* Touchable Links */}
      <View style={styles.views}>
        {/* My orders */}
        <TouchableOpacity style={styles.touch}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Entypo name="shopping-basket" size={20} color={myTheme.fade} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              My Orders
            </Text>
          </View>

          <AntDesign name="arrowright" size={20} color={myTheme.fade} />
        </TouchableOpacity>
        {/* Favourite Stores */}
        <TouchableOpacity style={styles.touch}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <AntDesign name="hearto" size={20} color={myTheme.fade} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Favourite orders
            </Text>
          </View>

          <AntDesign name="arrowright" size={20} color={myTheme.fade} />
        </TouchableOpacity>
        {/* My Address */}
        <TouchableOpacity style={styles.touch}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Entypo name="location-pin" size={20} color={myTheme.fade} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              My Address
            </Text>
          </View>

          <AntDesign name="arrowright" size={20} color={myTheme.fade} />
        </TouchableOpacity>
        {/* Wallet */}
        <TouchableOpacity style={styles.touch}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <AntDesign name="wallet" size={20} color={myTheme.fade} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Wallet
            </Text>
          </View>

          <AntDesign name="arrowright" size={20} color={myTheme.fade} />
        </TouchableOpacity>
        {/* Rewards */}
        <TouchableOpacity style={styles.touch}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <AntDesign name="gift" size={20} color={myTheme.fade} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Rewards
            </Text>
          </View>

          <AntDesign name="arrowright" size={20} color={myTheme.fade} />
        </TouchableOpacity>
        {/* Settings */}
        <TouchableOpacity style={styles.touch}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <AntDesign name="setting" size={20} color={myTheme.fade} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Settings
            </Text>
          </View>

          <AntDesign name="arrowright" size={20} color={myTheme.fade} />
        </TouchableOpacity>
        {/* About Us */}
        <TouchableOpacity style={styles.touch}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <AntDesign
              name="exclamationcircleo"
              size={20}
              color={myTheme.fade}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              About Us
            </Text>
          </View>

          <AntDesign name="arrowright" size={20} color={myTheme.fade} />
        </TouchableOpacity>
        {/* Faqs */}
        <TouchableOpacity style={styles.touch}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <AntDesign name="questioncircleo" size={20} color={myTheme.fade} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              FAQs
            </Text>
          </View>

          <AntDesign name="arrowright" size={20} color={myTheme.fade} />
        </TouchableOpacity>
        {/* Logout */}
        <TouchableOpacity onPress={logOut} style={styles.touch}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <SimpleLineIcons name="logout" size={20} color={myTheme.fade} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Logout
            </Text>
          </View>

          <AntDesign name="arrowright" size={20} color={myTheme.fade} />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
       
        style={{
          padding: 20,
          alignItems: "center",
          backgroundColor: "green",
          justifyContent: "center",
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imgBkg: {
    padding: 25,
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: myTheme.primary,
  },
  flexIn: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(24),
    backgroundColor: "#C5D8C7",
  },
  views: {
    paddingHorizontal: 23,
    paddingTop: 24,
  },
  touch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: myTheme.fade,
    borderBottomWidth: 0.5,
    paddingVertical: 15,
  },
});
