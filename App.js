import { Dimensions, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ScheduleScreen from "./Screens/ScheduleScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { MuscleMagicAuth } from "./Database/FireBaseConfig";
import Svg, { Image } from "react-native-svg";
import StartScreen from "./Screens/StartScreen";
import { AntDesign } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarStyle: { backgroundColor: "#000000" }, tabBarActiveTintColor: 'white', }}
    >
  <Tab.Screen
  name="Schedule"
  component={ScheduleScreen}
  options={{
    title: "Schedule",
    tabBarIcon: () => (
      <AntDesign name="profile" size={28} color="white" />
    ),
    headerShown: false,
  }}
/>

<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: "Home",
    tabBarIcon: () => (
      <AntDesign name="home" size={28} color="white" />
    ),
    headerShown: false,
  }}
/>

<Tab.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    title: "Profile",
    tabBarIcon: () => (
      <AntDesign name="user" size={28} color="white" />
    ),
    headerShown: false,
  }}
/>
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(MuscleMagicAuth, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          {user ? (
            <Tab.Screen name="LoginScreen" component={MyTabs} />
          ) : (
            <Stack.Screen name="Start" component={StartScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "black",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {},
});
