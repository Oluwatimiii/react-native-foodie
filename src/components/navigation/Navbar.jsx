import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { myTheme } from "../../utils/Theme";
import Dashboard from "../../screens/home/Dashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../../screens/home/Search";
import Cart from "../../screens/home/Cart";
import Support from "../../screens/home/Support";
import Profile from "../../screens/home/Profile";

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: myTheme.primary },
        tabBarInactiveTintColor: myTheme.fade,
        tabBarActiveTintColor: myTheme.secondary
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="search" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: "white" },
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome name="shopping-cart" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Support"
        component={Support}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <AntDesign name="customerservice" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="account-circle" size={size} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};


export default Navbar;
