import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  img,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { MuscleMagicAuth, MuscleMagicDb } from "../Database/FireBaseConfig";

function ScheduleScreen ({navigation}) {

  return (
  
    <View style={styles.container}>
       <Text>Schedule</Text>
       <View style={styles.addButtonContainer}>
       <TouchableOpacity style={styles.addButton}onPress={() => {
              navigation.navigate("CreateWorkout");
            }}><Text style={{fontSize: 40, textAlign: "center", color: "white"}}   >+</Text></TouchableOpacity>
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
    alignItems: "flex-end"
    
  },
  addButton: {
    height: 60,
    width: 60,
    backgroundColor: "black",
    borderRadius: 20,
    marginBottom: 20,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    
  }
});
