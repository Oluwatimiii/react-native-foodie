import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import LottieView from "lottie-react-native";
import { myTheme } from "../../../utils/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import ProductCarousel from "../../../components/DashComponents/ProductCarousel";

const { width, height } = Dimensions.get("window");

const Favorites = ({ navigation }) => {

  // Fetching favorites details
  const favoriteStores = useSelector((state) => state.user.favoriteStores);
  console.log("favtabs", favoriteStores)

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: myTheme.secondary,
      paddingHorizontal: 18,
      paddingBottom: 20

    }}>
      <View
        style={{
          width: "100%",
          paddingTop: 10
        }}>
        <ScrollView style={styles.views} showsVerticalScrollIndicator={false}>
          {/* About box */}
          <View>
            <View style={styles.titleBtn}>
              <Text style={styles.titleBtnText}>Favourite Stores</Text>
            </View>

            {/* Favorited  */}
            <View>
              {
                favoriteStores.map(store => {
                  return (
                    <View key={store?.id}>
                      <ProductCarousel
                        viewAll={false}
                        datas={store}
                        horizon={false}
                      />
                    </View>
                  )
                })
              }
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  views: {

  },
  titleBtn: {
    backgroundColor: myTheme.primary,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  titleBtnText: {
    color: myTheme.secondary,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold"
  },

});
