import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { myTheme } from "../../utils/Theme";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { setUserData } from "../../../store/UserSlice";
import { useDispatch } from "react-redux";

const SignUp = ({ navigation }) => {
  const [toogleBtn, setToogleBtn] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [checkBox, setCheckBox] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

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

  const handleSignUp = async () => {
    setLoading(true);
    const errors = getErrors(email, password);
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      setLoading(false);
      setErrors(showErrors && errors);
      console.log(errors);
    } else {
      setErrors({});
      setShowErrors(false);

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userEmail = userCredential?._tokenResponse.email;
          dispatch(setUserData(userEmail));
          const userUid = auth.currentUser.uid;

          setDoc(doc(db, "users", `${userUid}`), {
            email: userEmail,
            phone: phone,
          });
          Alert.alert("Signed up");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            console.log("That email address is already in use!");
          }

          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
          }
          console.error(error);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: myTheme.secondary }}>
      <StatusBar />
      {/* Sign up image */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.logoImage}
            source={require("../../../assets/fast-food.png")}
          />
        </View>

        {/* Form Input */}
        <View style={styles.formBox}>
          <Text style={styles.formText1}>Create an account.</Text>
          <Text style={styles.formText2}>Kindly provide your details</Text>

          <View style={styles.formBox1}>
            <View>
              <Text style={styles.userNameText}>Phone number</Text>
              <TextInput
                style={styles.userNameInput}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholder="Input phone no.."
                placeholderTextColor={myTheme.fade}
                keyboardType="name-phone-pad"
              />
            </View>
            <View>
              <Text style={styles.userNameText}>Email address</Text>
              <TextInput
                style={styles.userNameInput}
                placeholder="Hellofoodie@gmail.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
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
                  placeholder="Input your password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
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

          {/* CheckBox Segment */}
          <View style={styles.checkBox}>
            <BouncyCheckbox
              size={20}
              fillColor={myTheme.primary}
              unfillColor="#FFFFFF"
              isChecked={checkBox}
              iconStyle={{ borderColor: `${myTheme.primary}` }}
              innerIconStyle={{ borderWidth: 2 }}
              onPress={() => {
                setCheckBox(!checkBox);
              }}
            />
            <Text style={styles.checkBoxText}>
              <Text>By continuing you agree to our </Text>
              <Text style={{ color: myTheme.primary }}>
                Terms of Services and Privacy Policy.
              </Text>
            </Text>
          </View>

          {loading ? (
            //LOADING SPINNER
            <ActivityIndicator size="large" color={myTheme.primary} />
          ) : (
            // SIGN UP BUTTON
            <TouchableOpacity
              disabled={!checkBox}
              style={styles.signUpBox(checkBox)}
              onPress={handleSignUp}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          )}

          {/* SIGN IN SEGMENT */}
          <View style={styles.signInBox}>
            <Text style={{ fontSize: 15, color: myTheme.fade }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{
                  color: myTheme.primary,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Sign In
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
    paddingBottom: 60,
  },
  formText1: {
    fontSize: 40,
    color: myTheme.tertiary,
    fontWeight: "bold",
    marginBottom: 3,
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
  signUpBox: (checkBoxState) => ({
    backgroundColor: checkBoxState ? myTheme.primary : myTheme.fade,
    borderRadius: 15,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
  }),
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
});

export default SignUp;
