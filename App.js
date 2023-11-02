import { Dimensions, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ScheduleScreen from "./Screens/ScheduleScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { MuscleMagicAuth } from "./Database/FireBaseConfig";
import Svg, { Image } from "react-native-svg";
import StartScreen from "./Screens/StartScreen";
import { AntDesign } from "@expo/vector-icons";
import ExerciseSearchScreen from "./Screens/ExerciseSearchScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EditProfileScreen from "./Screens/EditProfileScreen";
import CreateWorkoutScreen from "./Screens/CreateWorkoutScreen";
import WorkoutDetailsScreen from "./Screens/WorkoutDetailsScreen";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="TabProfile"
      component={ProfileScreen}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: "Edit Profile",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerTransparent: true,
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const ScheduleStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="TabSchedule"
      component={ScheduleScreen}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="CreateWorkout"
      component={CreateWorkoutScreen}
      options={{
        headerTitle: "Create Workout",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerTransparent: true,
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
          elevation: 0,
        },
      }}
    />
     <Stack.Screen
      name="WorkoutDetails"
      component={WorkoutDetailsScreen}
      options={{
        headerTitle: " ",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerTransparent: true,
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Schedule"
        component={ScheduleStack}
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
          tabBarIcon: () => <AntDesign name="home" size={28} color="white" />,
          headerShown: false,
          tabBarVisible: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: "Profile",
          tabBarIcon: () => <AntDesign name="user" size={28} color="white" />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ExerciseSearch"
        component={ExerciseSearchScreen}
        options={{
          title: "ExerciseSearch",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="dumbbell" size={28} color="white" />
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
            <Stack.Screen name="LoginScreen" component={MyTabs} />
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
 
});
