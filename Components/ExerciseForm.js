import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";


const ExerciseForm = ({ onAddExercise }) => {
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [rest, setRest] = useState("");
  const [id, setId] = useState("");
  const addExercise = () => {

    if (typeof onAddExercise != "function") {
      alert("You didnt choose a day");
    } else {
      const exerciseData = {
        id: "exercise_" + Math.random().toString(36).substr(2, 9),
        name: exerciseName,
        sets: parseInt(sets),
        repetitions: parseInt(repetitions),
        rest: rest,
      };
      onAddExercise(exerciseData);
      setExerciseName("");
      setSets("");
      setRepetitions("");
      setRest("");
      alert("Exercise added");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Exercise Name"
        placeholderTextColor="#C5C5CD"
        value={exerciseName}
        onChangeText={setExerciseName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Sets"
        placeholderTextColor="#C5C5CD"
        keyboardType="numeric"
        value={sets}
        onChangeText={setSets}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Repetitions"
        placeholderTextColor="#C5C5CD"
        keyboardType="numeric"
        value={repetitions}
        onChangeText={setRepetitions}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Rest (e.g., 60 seconds)"
        placeholderTextColor="#C5C5CD"
        value={rest}
        onChangeText={setRest}
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={addExercise}>
        <Text
          style={{
            fontSize: 16,
            color: "white",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          Add Exercise
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExerciseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  textInput: {
    height: 50,
    width: 200,
    color: "#C5C5CD",
    borderWidth: 1,
    borderColor: "#C5C5CD",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
  },
  addButton: {
    height: 40,
    width: 150,
    backgroundColor: "#030266",
    borderRadius: 20,
    marginLeft: 44,
    marginBottom: 5,
  },
});
