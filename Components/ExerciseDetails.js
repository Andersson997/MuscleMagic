import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";


function ExerciseInput({ exercise, day, onUpdate }) {
  const { id, name, repetitions, sets, rest } = exercise;

  const handleFieldChange = (field, text) => {
    onUpdate({ id, name, repetitions, sets, rest, [field]: text });
  };

  return (
    <View style={styles.contentStyle} key={id}>
      <Text style={styles.headerText}>Exercise</Text>
      <TextInput
        style={styles.contentText}
        onChangeText={(text) => handleFieldChange("name", text)}
        value={name}
      />
      <Text style={styles.headerText}>Repetitions</Text>
      <TextInput
        style={styles.contentText}
        onChangeText={(text) => handleFieldChange("repetitions", text)}
        value={repetitions.toString()}
      />
      <Text style={styles.headerText}>Sets</Text>
      <TextInput
        style={styles.contentText}
        onChangeText={(text) => handleFieldChange("sets", text)}
        value={sets.toString()}
      />
      <Text style={styles.headerText}>Rest</Text>
      <TextInput
        style={styles.contentText}
        onChangeText={(text) => handleFieldChange("rest", text)}
        value={rest}
      />
    </View>
  );
}

export default ExerciseInput;

const styles = StyleSheet.create({
    contentStyle: {
        backgroundColor: "#1E1E1E",
        width: "60%",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        marginTop: 20,
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
})