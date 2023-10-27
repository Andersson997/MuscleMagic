import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  img,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React, { useRef, useState, useEffect } from "react";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { MuscleMagicAuth, MuscleMagicDb } from "../Database/FireBaseConfig";
import ExerciseForm from "../Components/ExerciseForm";
function CreateWorkoutScreen() {
  const user = MuscleMagicAuth.currentUser;
  const db = MuscleMagicDb;
  const [workoutData, setWorkoutData] = useState({
    name: "",
    description: "",
    exercises: [],
  });

  const addExercise = (exerciseData) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercises: [...prevData.exercises, exerciseData],
    }));
  };

  const userRef = doc(db, "users", user.uid);

  const workoutsCollectionRef = collection(userRef, "workouts");
  const saveWorkout = () => {
    setDoc(doc(workoutsCollectionRef), workoutData)
      .then(() => {
        console.log("Workout plan added successfully!");
      })
      .catch((error) => {
        console.error("Error adding workout plan:", error);
      });
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "undefined"}
  >
      <ScrollView style={styles.scrollview}>
    <View style={styles.container}>
      <View style={styles.formInputContainer}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="black"
          style={styles.textInput}
          value={workoutData.name}
          autoCapitalize="none"
          onChangeText={(text) =>
            setWorkoutData((prevData) => ({ ...prevData, name: text }))
          }
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor="black"
          style={styles.textInput}
          value={workoutData.description}
          autoCapitalize="none"
          onChangeText={(text) =>
            setWorkoutData((prevData) => ({ ...prevData, description: text }))
          }
        />
      </View>
      <ExerciseForm onAddExercise={addExercise} />
      <TouchableOpacity style={styles.saveButton} onPress={saveWorkout}><Text style={{fontSize: 16, color: "white", textAlign: "center", marginTop: 8 }}>Save</Text></TouchableOpacity>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CreateWorkoutScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
  },
  saveButton: {
    height: 40,
    width: 150,
    backgroundColor: "black",
    borderRadius: 20
  },
  scrollview: {
      marginTop: 150
  }
});
