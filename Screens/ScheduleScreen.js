import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  img,
  Image,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

function ScheduleScreen () {

  return (
  
    <View style={styles.container}>
       <Text>Schedule</Text>
    </View>
  );
  }

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
