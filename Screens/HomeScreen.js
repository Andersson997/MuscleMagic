import { Button, ImageBackground, StyleSheet, Text, View} from "react-native";
import React, { useNavigation } from "@react-navigation/native";
import { MuscleMagicAuth } from "../Database/FireBaseConfig";
import ExerciseSearchScreen from "./ExerciseSearchScreen";
function HomeScreen() {
  

  
  return (
    <View style={styles.container}>
      <Text>Home!</Text>
      <Button onPress={() => MuscleMagicAuth.signOut()} title="Logout"/>
      
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
