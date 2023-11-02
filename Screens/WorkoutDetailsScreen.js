import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { fetchCurrentUser } from "../Components/FetchUserData";
import LoadingScreen from "../Components/LoadingComponent";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { MuscleMagicAuth, MuscleMagicDb } from "../Database/FireBaseConfig";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";
import ExerciseInput from "../Components/ExerciseDetails";

function WorkoutDetailsScreen({ route }) {
  const { workout } = route.params;
  const currentUser = MuscleMagicAuth.currentUser;
  const db = MuscleMagicDb;

  // const [exercises1, setExercises1] = useState(workout.exercisesMonday || []);
  // const [exercises2, setExercises2] = useState(workout.exercisesTuesday || []);
  // const [exercises3, setExercises3] = useState(
  //   workout.exercisesWednesday || []
  // );
  // const [exercises4, setExercises4] = useState(workout.exercisesThursday || []);
  // const [exercises5, setExercises5] = useState(workout.exercisesFriday || []);
  // const [exercises6, setExercises6] = useState(workout.exercisesSaturday || []);
  // const [exercises7, setExercises7] = useState(workout.exercisesSunday || []);

  const [exercises, setExercises] = useState({
    Monday: workout.exercisesMonday || [],
    Tuesday: workout.exercisesTuesday || [],
    Wednesday: workout.exercisesWednesday || [],
    Thursday: workout.exercisesThursday || [],
    Friday: workout.exercisesFriday || [],
    Saturday: workout.exercisesSaturday || [],
    Sunday: workout.exercisesSunday || [],
  });

  const updatedData = {
    description: workout.description,
    exercisesFriday: exercises.Friday,
    exercisesMonday: exercises.Monday,
    exercisesSaturday: exercises.Saturday,
    exercisesSunday: exercises.Sunday,
    exercisesThursday: exercises.Thursday,
    exercisesTuesday: exercises.Tuesday,
    exercisesWednesday: exercises.Wednesday,
    name: workout.name,
  };
  const updateUserProfile = async (updatedData) => {
    try {
      console.log(updatedData)
      const workoutsRef = collection(db, "users", currentUser.uid, "workouts");
      const workoutRef = doc(workoutsRef, workout.id);
      await updateDoc(workoutRef, updatedData);
      console.log("User profile updated successfully!");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  function handleExerciseFieldChange(day, exerciseId, field, text) {
    const updatedExercises = exercises[day].map((ex) =>
      ex.id === exerciseId ? { ...ex, [field]: text } : ex
    );
    setExercises({ ...exercises, [day]: updatedExercises });
  }

  return (
    <LinearGradient
      style={styles.background}
      colors={["#0F0264", "#0F3362", "#030D01"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "undefined"}
      >
        <View style={styles.container}>
        <View style={styles.headerStyle}>
            <Text style={styles.bannerText}>Workout: {workout.name}</Text>
            <Text style={styles.bannerText}>
              Description: {workout.description}
            </Text>
          </View>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.contentContainer}>
              {Object.entries(exercises).map(([day, exerciseList]) =>
                exerciseList.length > 0 && (
                  <React.Fragment key={day}>
                    <Text style={styles.headerText}>{day}</Text>
                    {exerciseList.map((exercise) => (
                      <ExerciseInput
                        key={exercise.id}
                        exercise={exercise}
                        day={day}
                        onUpdate={(updatedExercise) => {
                          const updatedExercises = exercises[day].map((ex) =>
                            ex.id === updatedExercise.id ? updatedExercise : ex
                          );
                          setExercises({ ...exercises, [day]: updatedExercises });
                        }}
                      />
                    ))}
                  </React.Fragment>
                )
              )}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  updateUserProfile(updatedData);
                }}
              >
                <Text style={{ color: "#C5C5CD" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

export default WorkoutDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  bannerText: {
    color: "#C5C5CD",
    fontSize: 19,
    textAlign: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#C5C5CD",
    marginBottom: 5,
  },
  contentText: {
    fontSize: 19,
    color: "#C5C5CD",
    marginBottom: 5,
  },
  scrollContainer: {
    width: "100%",
  },
  contentContainer: {
    alignItems: "center",
  },
  headerStyle: {
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  contentStyle: {
    backgroundColor: "#1E1E1E",
    width: "60%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  background: {
    ...StyleSheet.absoluteFill,
  },
  saveButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#030266",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
});
