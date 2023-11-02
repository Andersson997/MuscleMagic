import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  img,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { fetchCurrentUser } from "../Components/FetchUserData";
import LoadingScreen from "../Components/LoadingComponent";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { MuscleMagicAuth, MuscleMagicDb } from "../Database/FireBaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

function ScheduleScreen({ navigation }) {
  const { user, workouts, loading, error } = fetchCurrentUser();
  const currentUser = MuscleMagicAuth.currentUser;
  const db = MuscleMagicDb;
  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return alert("Error fetching data " + error);
  }
  // if (workouts.length === 0) {
  //   return alert("no workouts found"); // Display a message when workouts array is empty
  // }
  async function deleteWorkout(workoutId) {
    try {
      const workoutsCollectionRef = collection(
        db,
        "users",
        currentUser.uid,
        "workouts"
      );
      const workoutRef = doc(workoutsCollectionRef, workoutId);
      await deleteDoc(workoutRef);
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  }
  function handleDeleteWorkout(workoutId) {
    deleteWorkout(workoutId);
  }
  const areYouSurePrompt = (workoutname, workoutId) =>
    Alert.alert(workoutname, "Are you sure you want to Delete?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => handleDeleteWorkout(workoutId) },
    ]);

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.background}
        colors={["#0F0264", "#0F3362", "#030D01"]}
      />
      <Text style={styles.headerTextColor}>Schedule</Text>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("CreateWorkout");
          }}
        >
          <Text
            style={{
              fontSize: 50,
              textAlign: "center",
              color: "white",
              paddingBottom: 7,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTextColor}>Workouts:</Text>
      <View
        style={{
          justifyContent: "center",
          marginTop: 20,
          borderRadius: 20,
          borderColor: "white",
          borderWidth: 1
        }}
      >
        {workouts.map((workout) => (
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              marginBottom: 7,
              width: "100%",
              paddingHorizontal: 30,
            }}
            key={workout.id}
          >
            <Text
              style={{ width: "50%", fontSize: 20, color: "#C5C5CD" }}
              onPress={() => {
                navigation.navigate("WorkoutDetails", { workout });
              }}
            >
              {workout.name}
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => areYouSurePrompt(workout.name, workout.id)}
              >
                <Text style={{ color: "red", fontSize: 20 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonContainer: {
    height: 100,
    width: 100,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  addButton: {
    height: 60,
    width: 60,
   
    borderRadius: 20,
    marginBottom: 20,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFill,
  },
  headerTextColor: {
    color: "#C5C5CD",
    fontSize: 20,
  },
});
