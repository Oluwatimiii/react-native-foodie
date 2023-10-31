import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, useMemo, useState } from "react";
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback } from "react";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { myTheme } from "../../utils/Theme";
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../../../store/UserSlice";

const BottomSheet = forwardRef((props, ref) => {
    const location = useSelector((state) => state.user.userLocation);
    const snapPoints = useMemo(() => ["35%"], []);
    const renderBackdrop = useCallback((props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);

    const { dismiss } = useBottomSheetModal()

    const dispatch = useDispatch();

    const [address, setAddress] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleEditButtonClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveButtonClick = () => {
        dispatch(setUserLocation(address));
        setIsEditing(false);
    };

    const confirmAddress = () => {
        dismiss()
    }


    return (
        <BottomSheetModal
            backgroundStyle={{ borderRadius: 0, backgroundColor: myTheme.darkFade }}
            overDragResistanceFactor={0}
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
        >
            <View style={styles.contentWrapper}>
                <View>
                    <Text style={styles.subHeader}>Your current address:</Text>
                    <View style={styles.input}>
                        {isEditing ? (
                            <View style={styles.inputs}>
                                <TextInput
                                    style={{
                                        flex: 0.94,
                                        fontSize: 14,
                                    }}
                                    placeholder="Please enter your address"
                                    defaultValue={location}
                                    onChangeText={(value) => setAddress(value)}
                                />
                            </View>
                        ) : (
                            <View style={[styles.item, { flex: 0.94 }]}>
                                <Entypo name="location" size={20} color={myTheme.primary} />
                                <Text style={{ flex: 1, fontWeight: "bold" }}>{location}</Text>
                            </View>
                        )}

                        <AntDesign
                            name="checkcircle"
                            size={18}
                            color={isEditing ? myTheme.fade : "green"}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <TouchableOpacity style={styles.btnStyle} onPress={isEditing ? handleSaveButtonClick : handleEditButtonClick}>
                        <Text style={styles.btnText}>{isEditing ? "Save Address" : "Edit address"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: "green" }]} onPress={confirmAddress}>
                        <Text style={styles.btnText}>Confirm Address</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});

export default BottomSheet;

const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: myTheme.primary,
        textAlign: "center",
        borderRadius: 3,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 16,
        marginVertical: responsiveHeight(3)
    },
    btnText: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 16,
        textAlign: "center"
    },
    contentWrapper: {
        flex: 1,
    },
    item: {
        flexDirection: "row",
        gap: 8,
        padding: 10,
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 0.7,
        borderColor: myTheme.fade
    },
    input: {
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    inputs: {
        minHeight: responsiveHeight(6),
        borderColor: "gray",
        borderWidth: 0.4,
        borderRadius: 5,
        paddingHorizontal: 8,
        flex: 0.94,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    subHeader: {
        fontWeight: "700",
        fontSize: 18,
        margin: 16
    }
});
