import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MuscleMagicAuth, MuscleMagicDb } from "../Database/FireBaseConfig";
import LoadingScreen from "../Components/LoadingComponent";
import { fetchCurrentUser } from "../Components/FetchUserData";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";
import {LinearGradient} from 'expo-linear-gradient';
function ProfileScreen({ navigation }) {
  const { user, workouts, loading, error } = fetchCurrentUser();
  const currentUser = MuscleMagicAuth.currentUser
  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Text>Error fetching user data: {error}</Text>; // Handle error scenario
  }
  const updatedWorkoutPlus = {
    country: user.country,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImageUrl: user.profileImageUrl,
    workoutCounter: user.workoutCounter + 1,
  };

  const updatedWorkoutMinus = {
    country: user.country,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImageUrl: user.profileImageUrl,
    workoutCounter: user.workoutCounter - 1,
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const userRef = doc(collection(MuscleMagicDb, "users"), currentUser.uid);
      await updateDoc(userRef, updatedData);
      console.log("Success");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  

  return (
    <LinearGradient style={styles.background} colors={["#0F0264", "#0F3362", "#030D01"]}>
      <View style={styles.container}>
        
        <Image style={styles.userImg} source={{ uri: user.profileImageUrl }} />
        <Text style={styles.userName}>{user.firstName}</Text>
        <Text style={styles.aboutUser}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a elit nisl.</Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate("EditProfile")}>
            <Text style={styles.userBtnTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => MuscleMagicAuth.signOut()}>
            <Text style={styles.userBtnTxt}>LogOut</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoWrapper}>
          <TouchableOpacity style={styles.plusButton} onPress={() => updateUserProfile(updatedWorkoutMinus)}>
            <Text style={{ fontSize: 50 }}>-</Text>
          </TouchableOpacity>
          <Text style={styles.userInfoTitle}>{user.workoutCounter}</Text>
          <TouchableOpacity style={styles.minusButton} onPress={() => updateUserProfile(updatedWorkoutPlus)}>
            <Text style={{ fontSize: 50 }}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userInfoSubTitle}>Workouts</Text>
      </View>
    </LinearGradient>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    padding: 20,
    marginTop: 70,
    alignItems: "center"
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#C5C5CD"
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#C5C5CD",
    textAlign: "center",
    marginBottom: 10,
    
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: 45,
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    width: 100,
    marginHorizontal: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  userBtnTxt: {
    color: "#2e64e5",
    fontSize: 16,
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    flexDirection: "row",
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 5,
    marginHorizontal: 50,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 20,
    color: "#C5C5CD",
    textAlign: "center",
  },
  background :{
    ...StyleSheet.absoluteFill
  }
});
