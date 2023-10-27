import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ExerciseForm = ({ onAddExercise }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [rest, setRest] = useState('');

  const addExercise = () => {
    const exerciseData = {
      name: exerciseName,
      sets: parseInt(sets),
      repetitions: parseInt(repetitions),
      rest
    };

    // Call the onAddExercise prop to pass the exercise data to the parent component
    onAddExercise(exerciseData);

    // Clear the form fields after adding the exercise
    setExerciseName('');
    setSets('');
    setRepetitions('');
    setRest('');
  };

  return (
    <View>
      <TextInput
        placeholder="Exercise Name"
        placeholderTextColor="black"
        value={exerciseName}
        onChangeText={setExerciseName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Sets"
        placeholderTextColor="black"
        keyboardType="numeric"
        value={sets}
        onChangeText={setSets}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Repetitions"
        placeholderTextColor="black"
        keyboardType="numeric"
        value={repetitions}
        onChangeText={setRepetitions}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Rest (e.g., 60 seconds)"
        placeholderTextColor="black"
        value={rest}
        onChangeText={setRest}
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={addExercise}><Text style={{fontSize: 16, color: "white", textAlign: "center", marginTop: 8 }}>Add Exercise</Text></TouchableOpacity>
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
      borderWidth: 1,
      borderColor: "black",
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 25,
      paddingLeft: 10,
    },
    addButton: {
      height: 40,
      width: 150,
      backgroundColor: "black",
      borderRadius: 20,
      marginLeft: 44,
      marginBottom: 5,
    },
  });