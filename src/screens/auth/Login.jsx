import {
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { myTheme } from "../../utils/Theme";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../store/UserSlice";
import { responsiveWidth } from "react-native-responsive-dimensions";

const Login = ({ navigation }) => {
  const [toogleBtn, setToogleBtn] = useState(true);

  const [displayModal, setDisplayModal] = useState(false)
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getErrors = (email, password) => {
    const errors = {};

    if (!email) {
      errors.email = "Enter your email";
    } else if (!email.includes("@") || !email.includes(".com")) {
      errors.email = "Kindly input a valid email.";
    }

    if (!password) {
      errors.password = "Enter your password";
    } else if (password.length < 8) {
      errors.password = "Enter password of 8 or more characters.";
    }

    return errors;
  };

  const handleSignIn = async () => {
    const errors = getErrors(email, password);
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      setErrors(showErrors && errors);
    } else {
      setLoading(true);
      setErrors({});
      setShowErrors(false);

      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(setUserData(user.email));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert(error.message);
        });
    }
  };

  const resetPassword = async () => {
    setLoadings(true)
    if (!email.includes("@") || !email.includes(".com") || !email) {
      setLoadings(false)
      setDisplayModal(false)
      Alert.alert("Input a valid email")
    } else {
      setLoadings(true)
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          setLoadings(false)
          setDisplayModal(false)
          Alert.alert("Password reset email sent!");
        })
        .catch((error) => {
          setLoadings(false)
          setDisplayModal(false)
          Alert.alert(error.message);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: myTheme.secondary }}>
      <StatusBar />
      {/* Sign up image */}
      {/* Delete address modal */}
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={displayModal}
        onRequestClose={() => setDisplayModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, { fontWeight: "bold", paddingHorizontal: responsiveWidth(13), }]}>
              A reset email will be sent to the email provided.
            </Text>
            <Text style={[styles.modalSubText]}>
              Kindly verify email before proceeding.
            </Text>

            {
              loadings ? (<View style={{ alignSelf: "center" }}>
                <ActivityIndicator color={myTheme.primary} />
              </View>) : (<View style={styles.viewss}>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setDisplayModal(false)}
                >
                  <Text style={styles.textStyle}>CANCEL</Text>
                </Pressable>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={resetPassword}
                >
                  <Text style={styles.textStyle}>PROCEED</Text>
                </TouchableOpacity>
              </View>)
            }

          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.logoImage}
            source={require("../../../assets/fast-food.png")}
          />
        </View>

        {/* Form Input */}
        <View style={styles.formBox}>
          <Text style={styles.formText1}>Welcome back!</Text>
          <Text style={styles.formText2}>Login to continue using the app.</Text>

          <View style={styles.formBox1}>
            <View>
              <Text style={styles.userNameText}>Email address</Text>
              <TextInput
                style={styles.userNameInput}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                autoCorrect={false}
                placeholder="Hellofoodie@gmail.com"
                placeholderTextColor={myTheme.fade}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "red",
                    marginTop: 4,
                  }}
                >
                  {errors.email}
                </Text>
              )}
            </View>
            <View>
              <Text style={styles.userNameText}>Password</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomColor: myTheme.fade,
                  borderBottomWidth: 1,
                }}
              >
                <TextInput
                  secureTextEntry={toogleBtn ? true : false}
                  style={{ paddingVertical: 7, width: "100%", flex: 0.9 }}
                  value={password}
                  onChangeText={(textPass) => setPassword(textPass)}
                  autoCorrect={false}
                  placeholder="Input your password"
                  placeholderTextColor={myTheme.fade}
                  keyboardType="ascii-capable"
                />
                <TouchableOpacity onPress={() => setToogleBtn(!toogleBtn)}>
                  <Ionicons
                    name={toogleBtn ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "red",
                    marginTop: 4,
                  }}
                >
                  {errors.password}
                </Text>
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <BouncyCheckbox
              size={17}
              fillColor={myTheme.primary}
              unfillColor="#FFFFFF"
              text="Remember me"
              iconStyle={{
                borderColor: `${myTheme.primary}`,
                marginRight: -10,
              }}
              innerIconStyle={{ borderWidth: 2, borderRadius: 0 }}
              onPress={() => { }}
            />

            <TouchableOpacity onPress={() => setDisplayModal(true)}>
              <Text style={{ color: myTheme.primary }}>Forget Password?</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            //LOADING SPINNER
            <ActivityIndicator size="large" color={myTheme.primary} />
          ) : (
            // SIGN UP BUTTON
            <TouchableOpacity onPress={handleSignIn} style={styles.signUpBox}>
              <Text style={styles.signUpText}>Login</Text>
            </TouchableOpacity>
          )}

          <View style={styles.signInBox}>
            <Text style={{ fontSize: 15, color: myTheme.fade }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text
                style={{
                  color: myTheme.primary,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingVertical: 20 }}>
            <View
              style={{
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  height: 1,
                  width: "80%",
                  backgroundColor: myTheme.tertiary,
                  position: "absolute",
                }}
              />
              <Text
                style={{
                  padding: 10,
                  backgroundColor: myTheme.secondary,
                  fontSize: 20,
                }}
              >
                Or
              </Text>
            </View>

            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 55,
                gap: 20,
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: myTheme.primary,
              }}
            >
              <AntDesign name="google" size={24} color={myTheme.primary} />
              <Text style={{ fontSize: 17, color: myTheme.primary }}>
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkBoxText: {
    flex: 1,
    flexWrap: "wrap",
  },
  container: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  formBox: {
    marginTop: 30,
  },
  formBox1: {
    paddingTop: 30,
    paddingBottom: 35,
  },
  formText1: {
    fontSize: 40,
    color: myTheme.tertiary,
    fontWeight: "bold",
    marginBottom: 1,
  },
  formText2: {
    fontSize: 18,
    color: myTheme.fade,
    fontWeight: "300",
  },
  imgContainer: {
    backgroundColor: myTheme.primary,
    padding: 8,
    borderRadius: 5,
    height: 60,
    width: 60,
  },
  logoImage: {
    height: "100%",
    width: "100%",
  },
  signInBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    gap: 6,
  },
  signUpBox: {
    backgroundColor: myTheme.primary,
    borderRadius: 15,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
  },
  signUpText: {
    color: myTheme.secondary,
    fontSize: 18,
  },
  userNameText: {
    fontSize: 17,
    color: myTheme.tertiary,
    fontWeight: "400",
    marginTop: 20,
  },
  userNameInput: {
    borderBottomColor: myTheme.fade,
    borderBottomWidth: 1,
    paddingVertical: 7,
    width: "100%",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: myTheme.primary,
  },
  buttonClose: {
    backgroundColor: "green",
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
  viewss: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
  },
});

export default Login;
