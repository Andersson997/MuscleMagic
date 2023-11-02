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
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { MuscleMagicAuth, MuscleMagicDb } from "../Database/FireBaseConfig";
import ExerciseForm from "../Components/ExerciseForm";
import { Dropdown } from "react-native-element-dropdown";
import { LinearGradient } from "expo-linear-gradient";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";

function CreateWorkoutScreen({ navigation }) {
  const user = MuscleMagicAuth.currentUser;
  const db = MuscleMagicDb;
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["50%"];

  const data = [
    { label: "Monday", value: "1" },
    { label: "Tuesday", value: "2" },
    { label: "Wednesday", value: "3" },
    { label: "Thursday", value: "4" },
    { label: "Friday", value: "5" },
    { label: "Saturday", value: "6" },
    { label: "Sunday", value: "7" },
  ];
  const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }
  function handleCloseModal() {
    bottomSheetModalRef.current?.close();
  }
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  );
  const [workoutData, setWorkoutData] = useState({
    name: "",
    description: "",
    exercisesMonday: [],
    exercisesTuesday: [],
    exercisesWednesday: [],
    exercisesThursday: [],
    exercisesFriday: [],
    exercisesSaturday: [],
    exercisesSunday: [],
  });

  const addExerciseMonday = (exerciseData) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercisesMonday: [...prevData.exercisesMonday, exerciseData],
    }));
  };
  const addExerciseTuesday = (exerciseData) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercisesTuesday: [...prevData.exercisesTuesday, exerciseData],
    }));
  };
  const addExerciseWednesday = (exerciseData) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercisesWednesday: [...prevData.exercisesWednesday, exerciseData],
    }));
  };
  const addExerciseThursday = (exerciseData) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercisesThursday: [...prevData.exercisesThursday, exerciseData],
    }));
  };
  const addExerciseFriday = (exerciseData) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercisesFriday: [...prevData.exercisesFriday, exerciseData],
    }));
  };
  const addExerciseSaturday = (exerciseData) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercisesSaturday: [...prevData.exercisesSaturday, exerciseData],
    }));
  };
  const addExerciseSunday = (exerciseData) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercisesSunday: [...prevData.exercisesSunday, exerciseData],
    }));
  };

  const userRef = doc(db, "users", user.uid);

  const workoutsCollectionRef = collection(userRef, "workouts");
  const saveWorkout = () => {
    setDoc(doc(workoutsCollectionRef), workoutData)
      .then(() => {
        navigation.navigate("TabSchedule");
      })
      .catch((error) => {
        console.error("Error adding workout plan:", error);
      });
  };

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "undefined"}
      >
        <LinearGradient
          style={styles.background}
          colors={["#0F0264", "#0F3362", "#030D01"]}
        />
        <ScrollView style={styles.scrollview}>
          <View style={styles.container}>
            <View style={styles.formInputContainer}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#C5C5CD"
                style={styles.textInput}
                value={workoutData.name}
                autoCapitalize="none"
                onChangeText={(text) =>
                  setWorkoutData((prevData) => ({ ...prevData, name: text }))
                }
              />
              <TextInput
                placeholder="Description"
                placeholderTextColor="#C5C5CD"
                style={styles.textInput}
                value={workoutData.description}
                autoCapitalize="none"
                onChangeText={(text) =>
                  setWorkoutData((prevData) => ({
                    ...prevData,
                    description: text,
                  }))
                }
              />
            </View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Choose day"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
              renderItem={renderItem}
            />
            <ExerciseForm
              onAddExercise={
                value === "1"
                  ? addExerciseMonday
                  : value === "2"
                  ? addExerciseTuesday
                  : value === "3"
                  ? addExerciseWednesday
                  : value === "4"
                  ? addExerciseThursday
                  : value === "5"
                  ? addExerciseFriday
                  : value === "6"
                  ? addExerciseSaturday
                  : value === "7"
                  ? addExerciseSunday
                  : null
              }
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handlePresentModal}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  textAlign: "center",
                  marginTop: 8,
                  
                }}
              >
                Added Exercises
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveWorkout}>
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
        >
          <View
            style={{
              justifyContent: "center",
              marginTop: 20,
              borderRadius: 20,
              borderColor: "white",
              borderWidth: 1,
            }}
          >
            {workoutData.exercisesMonday.map((exercise) => (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  marginBottom: 7,
                  width: "100%",
                  paddingHorizontal: 30,
                }}
                key={exercise.id}
              >
                <Text style={{ width: "50%", fontSize: 20, color: "#C5C5CD" }}>
                  {exercise.name}
                </Text>
                <View>
                </View>
              </View>
            ))}
                  <TouchableOpacity onPress={handleCloseModal}>
                    <Text style={{ color: "red", fontSize: 20 }}>Cancel</Text>
                  </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
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
    color: "#C5C5CD",
    borderColor: "#C5C5CD",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
  },
  saveButton: {
    height: 40,
    width: 150,
    backgroundColor: "#030266",
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10
  },
  scrollview: {
    marginTop: 150,
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: 150,
    backgroundColor: "#030266",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#030266",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: "white",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  background: {
    ...StyleSheet.absoluteFill,
  },
});
