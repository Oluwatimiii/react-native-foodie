import {
  StyleSheet,
  Modal,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Pressable,
  ActivityIndicator
} from "react-native";
import React, { useRef, useState } from "react";
import { deleteUser, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthState, setUser } from "../../../store/UserSlice";

import BottomSheet from "../../components/DashComponents/BottomSheet";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { myTheme } from "../../utils/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearProduct } from "../../../store/ProductReducer";
import { clearCart } from "../../../store/CartReducer";
import CustomStatusBar from "../../components/DashComponents/StatusBar";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.userData);
  const firstTwo = userEmail.slice(0, 3);

  const [displayModal, setDisplayModal] = useState(false)
  const [displayModals, setDisplayModals] = useState(false)
  const [loading, setLoading] = useState(false)

  const logOut = async () => {
    await AsyncStorage.clear();
    dispatch(resetAuthState());
    dispatch(clearProduct());
    dispatch(clearCart([]));
    await signOut(auth)
      .then((data) => {
        dispatch(setUser(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const deleteAccount = () => {
    const user = auth.currentUser
    console.log(user, "current user")
    setLoading(true)

    deleteUser(user).then(() => {
      AsyncStorage.clear();
      dispatch(resetAuthState());
      dispatch(clearProduct());
      dispatch(clearCart([]));
      dispatch(setUser(false));
      setLoading(false)
      console.log("User Account Deleted Successful");
    }).catch((error) => {
      setLoading(false)
      console.log("an error occured")
    })
  }

  const bottomSheetRef = useRef(null)

  const openModal = () => {
    bottomSheetRef.current?.present()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* STATUS BAR */}
      <CustomStatusBar />
      <BottomSheet ref={bottomSheetRef} />
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

      {/* LOGOUT MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={displayModal}
        onRequestClose={() => setDisplayModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, { fontWeight: "bold" }]}>
              Are you sure you want to sign out?
            </Text>
            <Text style={[styles.modalSubText]}>
              NOTE: This action clears your cart!
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 14,
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setDisplayModal(false)}
              >
                <Text style={styles.textStyle}>CANCEL</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={logOut}
              >
                <Text style={styles.textStyle}>SIGN OUT</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete address modal */}
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={displayModals}
        onRequestClose={() => setDisplayModals(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, { fontWeight: "bold", paddingHorizontal: responsiveWidth(13), }]}>
              Are you sure you want to permanently delete your account?
            </Text>
            <Text style={[styles.modalSubText]}>
              NOTE: This action can only be done once!
            </Text>

            {
              loading ? (<View style={{ alignSelf: "center" }}>
                <ActivityIndicator color={myTheme.primary} />
              </View>) : (<View style={styles.viewss}>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setDisplayModals(false)}
                >
                  <Text style={styles.textStyle}>CANCEL</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={deleteAccount}
                >
                  <Text style={styles.textStyle}>DELETE ACCOUNT</Text>
                </Pressable>
              </View>)
            }

          </View>
        </View>
      </Modal>

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
        {/* Favourite Orders */}
        <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate("Favorites")}>
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
        <TouchableOpacity style={styles.touch} onPress={openModal} >
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
        {/* Chat with Us */}
        <TouchableOpacity style={styles.touch}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <AntDesign
              name="wechat"
              size={20}
              color={myTheme.fade}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Chat with us
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
        <TouchableOpacity onPress={() => setDisplayModal(true)} style={styles.touch}>
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
        {/* Delete account */}
        <TouchableOpacity onPress={() => setDisplayModals(true)} style={styles.touch}>
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
              Delete Account
            </Text>
          </View>

          <AntDesign name="arrowright" size={20} color={myTheme.fade} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imgBkg: {
    padding: 25,
    alignItems: "center",
    borderRadius: 50,
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
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: responsiveWidth(85),
  },
  viewss: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: myTheme.primary,
  },
  buttonClose: {
    backgroundColor: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 8,
    textAlign: "center",
    fontSize: 16
  },
  modalSubText: {
    marginBottom: 17,
    textAlign: "center",
    fontSize: 13
  },
});
